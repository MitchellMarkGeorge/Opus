import { BrowserView } from "electron";
import { TabInfo } from "../../renderer/types";

export class TabView {
    private id: string;
    private url: string;
    private browserView: BrowserView;
    constructor({ id, url}: TabInfo) {
        this.id = id;
        this.url = url;
        this.browserView = new BrowserView();
        this.browserView.setBackgroundColor("#fff")
    }

    public getBrowserView() {
        return this.browserView;
    }
}