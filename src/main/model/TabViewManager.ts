// import { ipcMain } from "electron";
// import { CREATE_TAB_VIEW, DESTOY_TAB_VIEW, SELECT_TAB_VIEW } from "../../common/messages/Tabs";
import { Rectangle } from "electron";
import { TOP_BAR_HEIGHT } from "../../common/constants";
import {
  CreateTabViewOptions,
  DestroyTabVeiwOptions,
} from "../../common/types";
// import { TabInfo } from "../../renderer/types";
import { TabView } from "./TabView";
export class TabViewManager {
  // is the array still needed?
  private tabViews: TabView[];
  private tabViewIdMap: Map<string, TabView>; // makes sure getting by tabId is O(1)
  private selectedTabView!: TabView;
  // should i just have a reference to the object itself????
  constructor() {
    this.tabViews = [];
    // this.selectedTabVeiwId = 0;
    this.tabViewIdMap = new Map<string, TabView>();
    // ipcMain.on(CREATE_TAB_VIEW, (_, options: CreateTabViewOptions) => {
    //     this.createTabView(options);
    // });

    // ipcMain.on(SELECT_TAB_VIEW, (_, tabId: string) => {
    //     // might have other options
    //     this.selectTabView(tabId);
    // });

    // ipcMain.on(DESTOY_TAB_VIEW, (_, tabId: string) => {
    //     // might have other options
    //     this.destroyTabView(tabId);
    // });
  }

  public getSelectedTabView() {
    return this.selectedTabView;
  }

  private getTabViewFromTabId(tabId: string) {
    if (this.tabViewIdMap.has(tabId)) {
      return this.tabViewIdMap.get(tabId) as TabView;
    }
    throw new Error(`No TabView with id ${tabId}`);
  }

  private getIndexFromTabId(tabId: string) {
    return this.tabViews.findIndex((tabView) => tabView.getId() === tabId);
  }

  public fixCurrentTabViewBounds({ width, height }: Rectangle) {
    // const selectedTabView = this.getSelectedTabView();
    const currentBrowserView = this.selectedTabView.getBrowserView();
    currentBrowserView.setBounds({
      x: 0,
      y: TOP_BAR_HEIGHT,
      width,
      height: height - TOP_BAR_HEIGHT,
    });
  }

  public createTabView(options: CreateTabViewOptions) {
    // TODO
    // console.log(options);
    const { tabInfo, isSelected } = options;
    console.log(`creating new tab view ${tabInfo.id}`);
    const newTabView = new TabView(tabInfo);
    this.tabViewIdMap.set(tabInfo.id, newTabView);
    this.tabViews.push(newTabView);
    if (isSelected) {
      // if the the created tab is selected when created, change the windows browser view
      console.log(`selecting new tab view ${tabInfo.id}`);
      //   this.selectTabView = this.tabViews.length - 1;
      this.selectedTabView = newTabView;
      return this.selectedTabView;
    }
    // if the tab was just created "in the background", basically do nothing
    return null;
  }

  public selectTabView(tabId: string) {
    // console.log(tabId);
    console.log(`selecting tab view ${tabId}`);
    this.selectedTabView = this.getTabViewFromTabId(tabId);
    // console.log(newSelectedTabView);
    // this.selectedTabVeiwId = this.getIndexFromTabId(tabId);
    return this.selectedTabView;
  }

  public destroyTabView(options: DestroyTabVeiwOptions) {
    console.log(options);
    // TODO
    // let shouldQuit = false;
    // const tabView = this.getTabViewFromTabId();
    const { deletedTabId, newSelectedTabId } = options;
    // when a tab is deleted, the tabview item should be deleted
    // in the event that the selectedTab itself is deleted, the nearest tab should become the new selected tabveiw

    console.log(`deleting tab view ${deletedTabId}`);
    const deletedTabViewIndex = this.getIndexFromTabId(deletedTabId);
    // use the undocumented destroy method for now
    // https://github.com/electron/electron/issues/10096
    this.tabViews[deletedTabViewIndex].destroy();
    this.tabViewIdMap.delete(deletedTabId);
    this.tabViews.splice(deletedTabViewIndex, 1);

    if (newSelectedTabId) {
      return this.selectTabView(newSelectedTabId);
      // this.selectedTabVeiwIndex = this.tabViews.findIndex(tabView => tabView.getId() === deletedTabId);
      // return this.getSelectedTabView();
    } else {
      return null;
    }

    // return shouldQuit;
  }
}
