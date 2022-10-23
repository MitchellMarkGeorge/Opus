import {
  BrowserWindow,
  clipboard,
  ContextMenuParams,
  Menu,
  MenuItemConstructorOptions,
} from "electron";
import { CREATE_TAB_IN_BACKGROUND } from "../../common/messages/Tabs";
import { TabView } from "../model/TabView";

const seperator: MenuItemConstructorOptions = { type: "separator" };

export const getTabViewContextMenu = (
  currentWindow: BrowserWindow,
  contextMenuParams: ContextMenuParams,
  tabView: TabView,
) => {
  const linkMenuItems: MenuItemConstructorOptions[] = [
    {
      label: "Open link in new tab",
      click: () => {
        currentWindow.webContents.send(
          CREATE_TAB_IN_BACKGROUND,
          contextMenuParams.linkURL,
        );
      },
    },
    {
      label: "Copy link",
      click: () => {
        clipboard.writeText(contextMenuParams.linkURL);
      },
    },
    seperator,
  ];

  const imageMenuItems: MenuItemConstructorOptions[] = [
    {
      label: "Open image in new tab",
      click: () => {
        currentWindow.webContents.send(
          CREATE_TAB_IN_BACKGROUND,
          contextMenuParams.srcURL,
        );
      },
    },
    {
      label: "Copy image",
      click: () => {
        currentWindow.webContents.copyImageAt(
          contextMenuParams.x,
          contextMenuParams.y,
        );
      },
    },
    seperator,
  ];
  const editableMenuItems: MenuItemConstructorOptions[] = [
    { role: "undo" },
    { role: "redo" },
    { role: "cut" },
    { role: "copy" },
    { role: "paste" },
    { role: "selectAll" },
    seperator,
  ];

  const normalTemplate: MenuItemConstructorOptions[] = [
    { label: "Go Back", click: () => tabView.goBackwards() },
    { label: "Go Forward", click: () => tabView.goForward() },
    { label: "Reload", click: () => tabView.reloadTab() },
    seperator,
    {
      label: "Inspect",
      click: () => {
        const webContents = tabView.getBrowserView().webContents;
        webContents.inspectElement(contextMenuParams.x, contextMenuParams.y);
        if (webContents.isDevToolsOpened()) {
          webContents.devToolsWebContents?.focus();
        }
      },
    },
  ];

  let template: MenuItemConstructorOptions[] = [];

  if (contextMenuParams.linkURL) {
    template = template.concat(linkMenuItems);
  }

  if (contextMenuParams.hasImageContents) {
    template = template.concat(imageMenuItems);
  }

  if (contextMenuParams.isEditable) {
    template = template.concat(editableMenuItems);
  }

  if (!contextMenuParams.isEditable && !contextMenuParams.selectionText) {
    template = template.concat([{ role: "copy" }, seperator]);
  }

  template = template.concat(normalTemplate);

  return Menu.buildFromTemplate(template);
};
