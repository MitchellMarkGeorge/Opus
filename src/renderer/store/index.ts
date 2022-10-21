import { nanoid } from "nanoid";
import create from "zustand";
import { createTabView, destroyTabView, selectTabView } from "../services/ipc";
import { TabInfo, TopBarState } from "../types";

const defaultNewTab: TabInfo = {
  id: nanoid(),
  // title: "New Tab",
  status: "loading",
};

export const useTopBarState = create<TopBarState>((set, get) => ({
  tabs: [defaultNewTab] as TabInfo[],
  selectedTabIndex: 0,
  selectTab: (index: number) => {
    const { tabs } = get();
    // should the ipc stuff be done first???
    // ipcRenderer.send(SELECT_TAB_VIEW, tabs[index]);
    set({ selectedTabIndex: index });
    selectTabView(tabs[index].id);
  },
  createTab: (options: { selected: boolean; url?: string }) => {
    const { tabs } = get();
    const newTab: TabInfo = {
      id: nanoid(),
      status: "loading",
      url: options.url,
    };
    const newTabIndex = tabs.length;
    // think about this
    if (options.selected) {
      set({ tabs: [...tabs, newTab], selectedTabIndex: newTabIndex });
    } else {
      set({ tabs: [...tabs, newTab] });
    }
    createTabView({ tabInfo: newTab, isSelected: options.selected });
  },
  closeTab: (index: number) => {
    const { tabs, selectedTabIndex } = get();
    if (index >= 0 && index < tabs.length) {
      // for now, should jusnd message to quit app (chould clean up browser views tho)
      if (tabs.length === 1) return;
      const tabsClone = [...tabs];
      const [{id: deletedTabId}] = tabsClone.splice(index, 1);
      if (selectedTabIndex === index) {
        const newSelectedIndex = index === 0 ? index : index - 1;
        set({ tabs: tabsClone, selectedTabIndex: newSelectedIndex });
        destroyTabView({ deletedTabId, newSelectedTabId: tabs[newSelectedIndex].id });
      } else {
        set({ tabs: tabsClone });
        destroyTabView({ deletedTabId });
      }

    }
  },
}));
