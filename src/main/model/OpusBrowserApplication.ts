import { app, BrowserWindow, ipcMain } from "electron";
import {
  CREATE_TAB_VIEW,
  SELECT_TAB_VIEW,
  DESTOY_TAB_VIEW,
  CHANGE_TAB_URL,
  RELOAD_TAB,
  BACK_HISTORY,
  FORWARD_HISTORY,
} from "../../common/messages/Tabs";
import {
  CLOSE_WINDOW,
  MAXIMIZE_WINDOW,
  MINIMIZE_WINDOW,
} from "../../common/messages/TrafficLightButtons";
import {
  CreateTabViewOptions,
  DestroyTabVeiwOptions,
} from "../../common/types";
import { getTabBarURL, isDev } from "../util";
import { TabView } from "./TabView";
import { TabViewManager } from "./TabViewManager";

export class OpusBrowserApplication {
  private mainWindow: BrowserWindow;
  private tabViewManager: TabViewManager;
  constructor() {
    this.mainWindow = new BrowserWindow({
      title: "Opus Web Browser",
      width: 1200,
      height: 750,
      minWidth: 500,
      minHeight: 325,
      maximizable: true,
      // wont be hadling this for now
      fullscreenable: false,
      show: false,
      center: true,
      backgroundColor: "#1e1e1e",
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    this.tabViewManager = new TabViewManager();

    this.mainWindow.loadURL(getTabBarURL());
    if (isDev()) {
      this.mainWindow.webContents.openDevTools({ mode: "detach" });
    }

    this.mainWindow.once("ready-to-show", () => {
      this.mainWindow.show();
    });

    this.mainWindow.on("resize", this.resizeHandler);
    this.mainWindow.on("maximize", this.resizeHandler);
    this.mainWindow.on("unmaximize", this.resizeHandler);

    ipcMain.on(CLOSE_WINDOW, () => {
      console.log("close");
      // should do some clean up
      // ipcMain.removeAllListeners()
      app.quit();
    });

    ipcMain.on(MINIMIZE_WINDOW, () => {
      console.log("minimize");
      this.mainWindow.minimize();
    });

    ipcMain.on(MAXIMIZE_WINDOW, () => {
      console.log("maximize");
      if (this.mainWindow.isMaximized()) {
        this.mainWindow.unmaximize();
      } else {
        this.mainWindow.maximize();
      }
    });

    ipcMain.on(CREATE_TAB_VIEW, (_, options: CreateTabViewOptions) => {
      const newSelectedTabView = this.tabViewManager.createTabView(options);
      if (newSelectedTabView) {
        // if the newly created tabview is selected when created, then switch to it
        this.setCurrentBrowserViewFromTabView(newSelectedTabView);
      }
    });

    ipcMain.on(SELECT_TAB_VIEW, (_, tabId: string) => {
      console.log("selecting from listener");
      // might have other options
      // should change the selectedIndex and return the new selected tabView
      const newSelectedTabView = this.tabViewManager.selectTabView(tabId);
      this.setCurrentBrowserViewFromTabView(newSelectedTabView);
    });

    ipcMain.on(DESTOY_TAB_VIEW, (_, options: DestroyTabVeiwOptions) => {
      // might have other options
      // should return the new selected
      const newSelectedTabView = this.tabViewManager.destroyTabView(options);
      // only set the current browser view if a new selectd tab veiw is provided
      // else, leave the current tab view
      if (newSelectedTabView) {
        this.setCurrentBrowserViewFromTabView(newSelectedTabView);
      }
    });

    ipcMain.on(CHANGE_TAB_URL, (_, url: string) => {
      console.log("updated tab url");
      const selectedTabView = this.tabViewManager.getSelectedTabView();
      selectedTabView.loadURL(url);
    });

    ipcMain.on(RELOAD_TAB, () => {
      const selectedTabView = this.tabViewManager.getSelectedTabView();
      selectedTabView.reloadTab();
    });

    ipcMain.on(BACK_HISTORY, () => {
      // have selectedTabView as a a member fo the class?
      const selectedTabView = this.tabViewManager.getSelectedTabView();
    //   console.log(selectedTabView);
      selectedTabView.goBackwards();
    });

    ipcMain.on(FORWARD_HISTORY, () => {
      const selectedTabView = this.tabViewManager.getSelectedTabView();
      selectedTabView.goForward();
    });
  }

  private setCurrentBrowserViewFromTabView(tabView: TabView) {
    // console.log(tabView);

    this.mainWindow.setBrowserView(tabView.getBrowserView());
    this.resizeHandler();
    // tabView.getBrowserView().setBackgroundColor("#fff");
    // tabView.load();
    // const bounds = this.mainWindow.getBounds();
    // this.tabViewManager.fixCurrentTabViewBounds(bounds);
  }

  private resizeHandler = () => {
    const bounds = this.mainWindow.getBounds();
    this.tabViewManager.fixCurrentTabViewBounds(bounds);
  };

  public getMainWindow() {
    return this.mainWindow;
  }
}
