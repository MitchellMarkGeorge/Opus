export interface TabInfo {
    id: string,
    url?: string,
    status: TabStatus,
    title?: string,
    faviconUrl?: string,
    // isSelected: boolean
}

type TabStatus = "loading" | "complete" | "error" | "unknown"
export interface TopBarState {
    tabs: TabInfo[]
    selectedTabIndex: number
    // can create a tab by either clicking on th enew tab button or opening a link in a new tab
    createTab: (options: {selected: boolean, url?: string}) => void
    closeTab: (index: number) => void
    selectTab: (index: number) => void
}

// export interface SearchValue {
//     searchValue: string,
//     setSearchValue: (searchValue) => void
// }