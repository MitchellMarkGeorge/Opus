export interface Tab {
    id: string,
    url: string,
    isLoading: boolean,
    title?: string,
    faviconUrl?: string,
    isSelected: boolean
}

export interface TabState {
    tabs: Tab[]
    createTab: () => void
    closeTab: () => void
    selectTab: () => void
}

// export interface SearchValue {
//     searchValue: string,
//     setSearchValue: (searchValue) => void
// }