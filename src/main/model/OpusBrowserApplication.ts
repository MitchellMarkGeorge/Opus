import { BrowserWindow } from "electron";
import { getTabBarURL, isDev } from "../util";
import { TabViewManager } from "./TabViewManager"; 

export class OpusBrowserApplication {
    private mainWindow: BrowserWindow;
    private tabViewManager: TabViewManager;
    constructor() {
        this.mainWindow = new BrowserWindow({
            title: "Opus Web Browser",
            width: 1000,
            height: 750,
            // minWidth: 400,
            // maxHeight: 300,
            maximizable: false,
            fullscreenable: false, 
            show: false,
            center: true,
            backgroundColor: "#313638",
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        });

        this.tabViewManager = new TabViewManager();

        this.mainWindow.loadURL(getTabBarURL());
        if (isDev()) {
            this.mainWindow.webContents.openDevTools({ mode: "detach" })
        }

        this.mainWindow.once("ready-to-show", () => {
            this.mainWindow.show();
        })
    }

    public getMainWindow() {
      return this.mainWindow;
    }
}