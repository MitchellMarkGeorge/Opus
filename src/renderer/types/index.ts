export interface TabInfo {
    id: string,
    url: string,
    isLoading: boolean,
    title?: string,
    faviconUrl?: string,
    // isSelected: boolean
}

export interface TabState {
    tabs: TabInfo[]
    // can create a tab by either clicking on th enew tab button or opening a link in a new tab
    createTab: (url?: string) => void
    closeTab: () => void
    selectTab: () => void
}

// export interface SearchValue {
//     searchValue: string,
//     setSearchValue: (searchValue) => void
// }