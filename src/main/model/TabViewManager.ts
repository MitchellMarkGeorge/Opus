// import { ipcMain } from "electron";
// import { CREATE_TAB_VIEW, DESTOY_TAB_VIEW, SELECT_TAB_VIEW } from "../../common/messages/Tabs";
import { CreateTabViewOptions, DestroyTabVeiwOptions } from "../../common/types";
// import { TabInfo } from "../../renderer/types";
import { TabView } from "./TabView";
export class TabViewManager {
  private tabViews: TabView[];
  private tabViewIdMap: Map<string, TabView>; // makes sure getting by tabId is O(1)
  private selectedTabVeiwIndex: number;
  constructor() {
    this.tabViews = [];
    this.selectedTabVeiwIndex = 0;
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

  private get selectedTabView() {
    // think about this
    return this.tabViews[this.selectedTabVeiwIndex];
  }

  public getSelectedTabView() {
    return this.tabViews[this.selectedTabVeiwIndex];
  }

  private getTabViewFromTabId(tabId: string) {
    if (this.tabViewIdMap.has(tabId)) {
      return this.tabViewIdMap.get(tabId) as TabView;
    }
    throw new Error(`No TabView with id ${tabId}`);
  }

  private getIndexFromTabId(tabId: string) {

    return this.tabViews.findIndex(tabView => tabView.getId() === tabId);
  }

  public fixCurrentTabViewBounds() {
    // TODO
    return;
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
      // so it points at the the tabview that should be selected
      this.selectedTabVeiwIndex = this.tabViews.length - 1;
      return { isSelected, newSelectedTabView: this.getSelectedTabView() };
    }
    return { isSelected, newSelectedTabView: null };
  }

  public selectTabView(tabId: string) {
    // console.log(tabId);
    console.log(`selecting tab view ${tabId}`);
    const newSelectedTabView = this.getTabViewFromTabId(tabId);
    // console.log(newSelectedTabView);
    this.selectedTabVeiwIndex = this.getIndexFromTabId(tabId);
    return newSelectedTabView;
  }

  public destroyTabView(options: DestroyTabVeiwOptions) {
    // TODO
    // let shouldQuit = false;
    // const tabView = this.getTabViewFromTabId();
    const { deletedTabId, newSelectedTabId } = options
    // when a tab is deleted, the tabview item should be deleted
    // in the event that the selectedTab itself is deleted, the nearest tab should become the new selected tabveiw

    console.log(`deleting tab view ${deletedTabId}`);
    const deletedTabViewIndex = this.getIndexFromTabId(deletedTabId);
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
