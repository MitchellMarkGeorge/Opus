import React from "react";
import styled from "styled-components";
import { TAB_BAR_HEIGHT } from "../../../common/constants";
import Tab from "./components/Tab";
import { TrafficLightButton } from "./components/TrafficLightButton";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { TabInfo } from "../../types";

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
    height: 24px;
    width: 24px;
    // think about this
    color: ${(props) => props.theme.colors.primaryWhite};
    border-radius: 50%;

    transition: background-color 1s, color 1s;
    
    &:hover {
        background-color: ${(props) => props.theme.colors.secondaryInterfaceColor};
        /* color: ${(props) => props.theme.colors.primaryInterfaceColor}; */
    }
    /* /* padding-left: 5px; */
    margin-left: 5px; 
`

const genTabs = (n?: number) => {
  if (!n) {
    n = Math.floor(Math.random() * 10) + 1;
  }
  const tabs = new Array<TabInfo>(n);

  for (let i = 0; i < n; i++) {
    tabs[i] = {
      id: i.toString(),
      title: "New Tab".repeat(i),
      url: "https://hello.com",
      isLoading: false,
    };
  }

  return tabs;
};

export default function TabBar() {
  return (
    <TabBarContainer>
      <WindowButtons>
        <TrafficLightButton buttonColor="#D14343" />
        <TrafficLightButton buttonColor="#FFB020" />
        <TrafficLightButton buttonColor="#52BD95" />
      </WindowButtons>
      <TabList>
        {genTabs(20).map((info, i) => (
          <Tab isSelected={i === 0} data={info} key={info.id} />
        ))}
        {/* <Tab
          isSelected
          // might have to simplify the props passed in here
          data={{
            title: "This is so cool mane",
            id: "0",
            isLoading: false,
            url: "https://hello.com",
          }}
        />
        <Tab
          isSelected={false}
          // might have to simplify the props passed in here
          data={{
            title: "This is so cool mane",
            id: "0",
            isLoading: false,
            url: "https://hello.com",
          }}
        /> */}
      </TabList>
      <CreateTabContainer>
        <AiOutlinePlus size="24px"/>
      </CreateTabContainer>
    </TabBarContainer>
  );
}
