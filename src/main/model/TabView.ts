// import { BrowserView } from "electron";
import { TabInfo } from "../../renderer/types";

export class TabView {
    private id: string;
    private url?: string;
    // private browserView: BrowserView;
    constructor({ id, url }: TabInfo) {
        this.id = id;
        this.url = url; // if no url, new tab page 
        // this.browserView = new BrowserView();
        // this.browserView.setBackgroundColor("#fff")
    }

    public getId() {
        return this.id;
    }

    public getBrowserView() {
        return;
        // return this.browserView;
    }
}