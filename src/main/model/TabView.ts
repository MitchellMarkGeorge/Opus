import { BrowserView, BrowserWindow } from "electron";
import { TAB_UPDATE } from "../../common/messages/Tabs";
import { TabInfoUpdate } from "../../common/types";
import { TabInfo } from "../../renderer/types";
import { getNewTabURL } from "../util";

export class TabView {
    private id: string;
    // url is set in the loadPage(url);
    private url!: string;
    private hasLoadingError: boolean;
    private browserView: BrowserView;
    constructor({ id, url }: TabInfo) {
        this.id = id;
        // think about this
        // this.url = url || getNewTabURL(); // if no url, new tab page 
        // this.url = url || "https://google.com"; // if no url, new tab page 

        this.hasLoadingError = false; 

        // encasulate as much functionality from this opbject (and webContents) into the TabView class itself
        this.browserView = new BrowserView({ webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            // think about these
            // nodeIntegrationInSubFrames: false,
            // nodeIntegrationInWorker: false,
            sandbox: true,
            scrollBounce: true,
            webSecurity: true

        }});

        // what type of events am I meant to hendle

        this.browserView.webContents.on("did-finish-load", () => {
            // if an error occured, it shouldn't try an resend it a gain
            if (!this.hasLoadingError) {
                this.sendUpdateToTopBar("did-finish-load", { status: "complete" });
            }
        });

        this.browserView.webContents.on("did-fail-load", () => {
            this.hasLoadingError = true;
            this.sendUpdateToTopBar("did-fail-load", { status: "error", title: undefined });
            // show error page?
        });

        this.browserView.webContents.on("did-stop-loading", () => {
            if (this.hasLoadingError) {
                this.hasLoadingError = false;
                // reset error staus 
            }
            // should title be undefined???
            this.sendUpdateToTopBar("did-stop-loading", { status: "complete" });
        });

        this.browserView.webContents.on("did-navigate", (_, url) => {
            this.url = url;
            this.sendUpdateToTopBar("did-navigate", { url });
        })

        // do i need will-navigate, did-redirect-navigation??? 
        this.browserView.webContents.on("did-navigate-in-page", (_, url, isMainframe) => {
            if (isMainframe) {
                this.url = url;
                this.sendUpdateToTopBar("did-navigate-in-page", { url });
            }
        })

        this.browserView.webContents.on("did-start-loading", () => {
            if (this.hasLoadingError) {
                this.hasLoadingError = false;
                // reset error staus 
            }
            this.sendUpdateToTopBar("did-start-loading", { status: "loading" });
            // show error page?
        });
        this.browserView.webContents.on("page-title-updated", (_, title) => {
            // will set status to complete for now
            this.sendUpdateToTopBar("page-title-updated", { status: "complete", title });
            // show error page?
        });
        // this.browserView.webContents.on("page-favicon-updated", (_, [faviconUrl]) => {
        //     this.sendUpdateToTopBar(id, { status: "loading", faviconUrl });
        //     // show error page?
        // });
        // need to think about naviagation events
        this.browserView.setBackgroundColor("#313638");
        this.loadURL(url || getNewTabURL());
        // this.loadURL(url || "https://google.com");
    }

    public getId() {
        return this.id;
    }

    public loadURL(url: string) {
        if (url !== this.url) {
            this.url = url;
        }
        // console.log(this.url);
        this.browserView.webContents.loadURL(this.url);
    }

    public goBackwards() {
        if (this.browserView.webContents.canGoBack()) {
            this.browserView.webContents.goBack();
        }
    }

    public goForward() {
        if (this.browserView.webContents.canGoForward()) {
            this.browserView.webContents.goForward();
        }
    }

    public reloadTab() {
        if (!this.browserView.webContents.isLoading()) {
        // if it is not already loading, reload the tab
            this.browserView.webContents.reload();
        }
    }

    public isLoading() {
        return this.browserView.webContents.isLoading();
    }

    private sendUpdateToTopBar(eventName: string, data: TabInfoUpdate) {
        console.log(eventName);
        const [window] = BrowserWindow.getAllWindows();
        window.webContents.send(TAB_UPDATE, this.id, data);
    }

    public getBrowserView() {
        return this.browserView;
    }
}