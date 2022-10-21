import { ipcRenderer } from "electron"
import { CREATE_TAB_VIEW, DESTOY_TAB_VIEW, SELECT_TAB_VIEW } from "../../common/messages/Tabs"
import { CreateTabViewOptions, DestroyTabVeiwOptions } from "../../common/types"

export const createTabView = (options: CreateTabViewOptions) => {
    ipcRenderer.send(CREATE_TAB_VIEW, options);
}

export const selectTabView = (tabId: string) => {
    // think about params
    ipcRenderer.send(SELECT_TAB_VIEW, tabId);
}

export const destroyTabView = (options: DestroyTabVeiwOptions) => {
    // think about params
    ipcRenderer.send(DESTOY_TAB_VIEW, options);
}