import React from "react";
import styled from "styled-components";
import { TAB_BAR_HEIGHT } from "../../../common/constants";
import Tab from "./components/Tab";
import { TrafficLightButton } from "./components/TrafficLightButton";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
// import { TabInfo } from "../../types";
import { useTopBarState } from "../../store";
import { ipcRenderer } from "electron";
import { CLOSE_WINDOW, MAXIMIZE_WINDOW, MINIMIZE_WINDOW } from "../../../common/messages/TrafficLightButtons";
// import shallow from "zustand/shallow";

const TabBarContainer = styled.div`
  width: 100%;
  height: ${TAB_BAR_HEIGHT}px;
  max-height: ${TAB_BAR_HEIGHT}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${(props) => props.theme.colors.primaryInterfaceColor};
  transition: filter 1s;
  -webkit-app-region: drag;
  user-select: none;
`;

const WindowButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  gap: 10px;
`;

const TabList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding-top: 10px;
  padding-bottom: 10px;

  padding-left: 12px;
  padding-right: 12px;
  gap: 10px;
  /* flex: auto; */
  /* min-width: 0; */

  /* width: 100%; */
  /* height: 100%; */
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CreateTabContainer = styled.div`
  height: 32px;
  width: 32px;
  min-height: 32px;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  // think about this
  color: ${(props) => props.theme.colors.primaryWhite};
  border-radius: 50%;

  transition: background-color 0.5s, color 0.5s;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondaryInterfaceColor};
    /* color: ${(props) => props.theme.colors.primaryInterfaceColor}; */
  }

  &:active {
    filter: brightness(0.8);
  }
  /* /* padding-left: 5px; */
  margin-left: 5px;
`;

// const genTabs = (n?: number) => {
//   if (!n) {
//     n = Math.floor(Math.random() * 10) + 1;
//   }
//   const tabs = new Array<TabInfo>(n);

//   for (let i = 0; i < n; i++) {
//     tabs[i] = {
//       id: i.toString(),
//       title: "New Tab".repeat(i),
//       url: "https://hello.com",
//       isLoading: false,
//     };
//   }

//   return tabs;
// };

export default function TabBar() {
  // const tabs = useTopBarState(state => {state.}gcc)
  const { tabs, selectTab, selectedTabId, createTab, closeTab } =
    useTopBarState();

  const closeWindow = () => {
    ipcRenderer.send(CLOSE_WINDOW);
  }

  const minimizeWindow = () => {
    ipcRenderer.send(MINIMIZE_WINDOW);
  }
  
  const maximizeWindow = () => {
    ipcRenderer.send(MAXIMIZE_WINDOW);
  }
  return (
    <TabBarContainer>
      <WindowButtons>
        <TrafficLightButton buttonColor="#D14343" onClick={closeWindow}/>
        <TrafficLightButton buttonColor="#FFB020" onClick={minimizeWindow}/>
        <TrafficLightButton buttonColor="#52BD95" onClick={maximizeWindow}/>
      </WindowButtons>
      <TabList>
        {tabs.map((tabInfo, i) => (
          <Tab
            isSelected={tabInfo.id === selectedTabId}
            data={tabInfo}
            key={tabInfo.id}
            // should i move this into the Tab component?
            selectTab={() => {
              if (tabInfo.id !== selectedTabId) {
                console.log(tabInfo.id);
                selectTab(i);
              }
            }}
            closeTab={() => {
              if (tabs.length === 1) {
                closeWindow();
              } else {
                closeTab(i);
              }
            }}
          />
        ))}
        {/* {genTabs(20).map((info, i) => (
          <Tab isSelected={i === 0} data={info} key={info.id} />
        ))} */}
      </TabList>
      <CreateTabContainer
        onClick={() => {
          createTab({ selected: true });
        }}
      >
        <AiOutlinePlus size="24px" />
      </CreateTabContainer>
    </TabBarContainer>
  );
}
