class TabViewManager {
    private static instance: TabViewManager;
    private constructor() {}
    public static getInstance(): TabViewManager {
        if (!TabViewManager.instance) {
            TabViewManager.instance = new TabViewManager();
        }

        return TabViewManager.instance;
    }
}