import { nanoid } from "nanoid";
import create from "zustand";
import { TabInfoUpdate } from "../../common/types";
import { createTabView, destroyTabView, selectTabView } from "../services/ipc";
import { TabInfo, TopBarState } from "../types";

const DEFAULT_NEW_TAB: TabInfo = {
  id: nanoid(),
  // title: "New Tab",
  status: "loading",
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
    set({ selectedTabId });
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
      if (selectedTabId === deletedTabId) {
        const newSelectedIndex = index === 0 ? index : index - 1;
        const newSelectedTabId = tabs[newSelectedIndex].id;
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
    const { tabs } = get();
    const tabsClone = [...tabs];
    const index = tabsClone.findIndex(tab => tab.id === tabId);
    if (index !== -1) {
        Object.assign(tabsClone[index], updates);
        console.log(tabsClone[index]);
        set({ tabs: tabsClone});
    }
  }
}));
