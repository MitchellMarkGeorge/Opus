import { TabInfo } from "../../renderer/types";
import { TabView } from "./TabView";
export class TabViewManager {
    private tabViews: TabView[];
    private selectedTabId: number;
    constructor() {
        this.tabViews = [];
        this.selectedTabId = 0;
    }

    private get selectedTabView() {
        // think about this
        return this.tabViews[this.selectedTabId];
    }

    public getSelectedTabView() {
        return this.tabViews[this.selectedTabId];
    }

    public fixBounds() {
        return;
    }

    public createTabView(tabInfo: TabInfo) {
        console.log(tabInfo);
        return;
    }

    public destroyTabView(tabInfo: TabInfo) {
        console.log(tabInfo);
        return;
    }
}