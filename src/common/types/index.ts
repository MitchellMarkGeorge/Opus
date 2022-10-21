import { TabInfo } from "../../renderer/types";

export interface CreateTabViewOptions {
    tabInfo: TabInfo;
    isSelected: boolean
}

export interface DestroyTabVeiwOptions {
    deletedTabId: string
    newSelectedTabId?: string
}

// just the fields that can be update
export type TabInfoUpdate = Omit<Partial<TabInfo>, "url">;

