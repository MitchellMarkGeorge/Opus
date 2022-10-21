import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import styled from "styled-components";
import { TOP_BAR_HEIGHT } from "../../../common/constants";
import { TAB_UPDATE } from "../../../common/messages/Tabs";
import { TabInfoUpdate } from "../../../common/types";
import { createTabView } from "../../services/ipc";
import { useTopBarState } from "../../store";
import SearchBar from "../SearchBar";
import TabBar from "../TabBar";

const TopBarContainer = styled.div`
  width: 100%;
  height: ${TOP_BAR_HEIGHT}px;
  max-height: ${TOP_BAR_HEIGHT}px;
`;

function TopBar() {
  const tabs = useTopBarState((state) => state.tabs);
  const updateTab = useTopBarState((state) => state.updateTab);
  useEffect(() => {
    // on mount, create the tab view for the inital tab
    createTabView({ isSelected: true, tabInfo: tabs[0]});

    ipcRenderer.on(TAB_UPDATE, (_, tabId: string, updates: TabInfoUpdate) => {
      updateTab(tabId, updates);
    });

    return () => {
      ipcRenderer.removeAllListeners(TAB_UPDATE);
    }
  }, [])
  return (
    <TopBarContainer>
      <TabBar />
      <SearchBar />
    </TopBarContainer>
  );
}

export default TopBar;
