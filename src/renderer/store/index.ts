import { nanoid } from "nanoid";
import path from "path";
import create from "zustand";
import { TabInfoUpdate } from "../../common/types";
import { createTabView, destroyTabView, selectTabView } from "../services/ipc";
import { TabInfo, TopBarState } from "../types";

const DEFAULT_NEW_TAB: TabInfo = {
  id: nanoid(),
  // title: "New Tab",
  status: "loading",
};

const isOpusPage = (url: string) => {
  const extension = path.extname(url);
  const fileName = path.basename(url);
  return fileName.startsWith("OPUS_") && extension === ".html";
};

export const useTopBarState = create<TopBarState>((set, get) => ({
  tabs: [DEFAULT_NEW_TAB] as TabInfo[],
  selectedTabId: DEFAULT_NEW_TAB.id,
  selectTab: (index: number) => {
    const { tabs } = get();
    const selectedTabId = tabs[index].id;

    console.log(`selecting tab ${selectedTabId}`);
    // should the ipc stuff be done first???
    // ipcRenderer.send(SELECT_TAB_VIEW, tabs[index]);
    const selectedTab = tabs[index];
    set({
      selectedTabId,
      // need to figure this out for opus urls
      searchValue: selectedTab.url || "",
      // selectedTab.url && isOpusPage(selectedTab.url)
      //   ? ""
      //   : selectedTab.url || "", // if there is a seaech value, it shouldnt be cleared (for now)
    });
    selectTabView(tabs[index].id);
  },
  createTab: (options: { selected: boolean; url?: string }) => {
    const { tabs } = get();
    const newTab: TabInfo = {
      id: nanoid(),
      status: "loading",
      url: options.url,
    };
    console.log(`creating a tab ${newTab.id}`);
    // think about this
    if (options.selected) {
      console.log(`selecting tab ${newTab.id}`);
      set({ tabs: [...tabs, newTab], selectedTabId: newTab.id });
    } else {
      set({ tabs: [...tabs, newTab] });
    }
    createTabView({ tabInfo: newTab, isSelected: options.selected });
  },
  closeTab: (index: number) => {
    const { tabs, selectedTabId } = get();
    if (index >= 0 && index < tabs.length) {
      // for now, should jusnd message to quit app (chould clean up browser views tho)
      // handles directly in the ui
      //   if (tabs.length === 1) return;
      const tabsClone = [...tabs];
      const [{ id: deletedTabId }] = tabsClone.splice(index, 1);
      // if you are closing the selected tab
      if (selectedTabId === deletedTabId) {
        const newSelectedIndex = index === 0 ? index : index - 1;
        const newSelectedTabId = tabsClone[newSelectedIndex].id;
        console.log(`closing tab ${deletedTabId}`);
        console.log(`selecting tab ${newSelectedTabId}`);
        set({ tabs: tabsClone, selectedTabId: newSelectedTabId });
        destroyTabView({ deletedTabId, newSelectedTabId });
      } else {
        console.log(`closing tab ${deletedTabId}`);
        set({ tabs: tabsClone });
        destroyTabView({ deletedTabId });
      }
    }
  },
  updateTab: (tabId: string, updates: TabInfoUpdate) => {
    const { tabs, selectedTabId } = get();
    const tabsClone = [...tabs];
    const index = tabsClone.findIndex((tab) => tab.id === tabId);
    if (index !== -1) {
      Object.assign(tabsClone[index], updates);
      const updatedTab = tabsClone[index];
      console.log(updates);
      console.log(updatedTab);

      if (tabId === selectedTabId) {
        // only update the search input value if the updated tab is the selected tab
        console.log(updatedTab.url);
        set({
          tabs: tabsClone,
          searchValue: updatedTab.url || "",
        });
      } else {
        set({ tabs: tabsClone });
      }
      //   if (tabId === selectedTabId && updates.url) {
      //     if (isOpusPage(updates.url)) {
      //       // for opus pages like new tab and error, the search input should be cleared
      //         set({ tabs: tabsClone, searchValue: "" });
      //     } else {
      //       // if it is the current tab that is updated and the url updates as well, update the search input value
      //         set({ tabs: tabsClone, searchValue: updates.url });
      //     }
      //   } else {
      //     set({ tabs: tabsClone, searchValue: updates.url || "" }); // updates.url could be undefined
      //   }
    }
  },

  searchValue: "",
  setSearchValue: (value: string) => set({ searchValue: value }),
  //   setSearchInputFocus: (isFocused: boolean) => {
  //     set({ focusSearchInput: isFocused });
  //   },
}));
