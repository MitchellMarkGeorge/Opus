import React from "react";
import styled, { useTheme } from "styled-components";
import { TabInfo } from "../../../types";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { HiGlobe } from "@react-icons/all-files/hi/HiGlobe";
import { GeneralIconContainer } from "./GeneralIconContainer";
import { useScrollIntoView } from "../../../hooks";
import { RingLoader } from "react-spinners";

interface Props {
  data: TabInfo;
  isSelected: boolean;
  selectTab: () => void
  closeTab: () => void

}

const TabPill = styled.div<{ isSelected: boolean }>`
  display: flex;
  // this way, the tabs become smaller as the number of tabs increase
  min-width: 150px;
  // confirm this
  width: 300px;
  padding: 8px 12px;
  max-height: 40px;
  /* height: 40px; */
  border-radius: 10px;
  align-items: center;
  flex: 1;
  white-space: nowrap;
  min-width: 150px;
  gap: 5px;
  background-color: ${(props) => {
    const { colors } = props.theme;
    if (props.isSelected) {
      return colors.primaryPurple;
    }
    return colors.secondaryInterfaceColor;
  }};
  transition: filter 0.5s;

  // animation???
  &:hover {
    filter: brightness(1.15);
  }

  &:active {
    filter: brightness(1.25);
  }
`;

const TabTitle = styled.div`
  color: ${(props) => props.theme.colors.primaryWhite};
  font-weight: 590;
  font-size: 14px;
  text-overflow: ellipsis;
  align-items: center;
  overflow: hidden;
  height: 100%;
  width: 100%;
  white-space: nowrap;
`;

// const GlobeIconContainer = styled.

export default function Tab({ data, isSelected, selectTab, closeTab }: Props) {
  const { colors } = useTheme();
  const ref = useScrollIntoView(isSelected);
  const getTabTile = () => {
    // need to figure this out
    // if (data.title && data.status === "complete") return data.title;
    if (data.title) return data.title;
    if (data.status === "loading") return "Loading...";
    if (data.status === "error") return "Error"
    return "Unknown"; // for now
  }
  const getTabIcon = () => {
    if (data.status === "loading") {
      return <RingLoader color={colors.primaryWhite} size="16px"/>
    } else return (
      <GeneralIconContainer size="16px" onClick={closeTab}>
        <HiGlobe color={colors.primaryWhite} size="16px" />
      </GeneralIconContainer>
    )
  }
  return (
    <TabPill isSelected={isSelected} onClick={selectTab} ref={ref}>
      {/* <GeneralIconContainer size="16px" onClick={closeTab}>
        <HiGlobe color={colors.primaryWhite} size="16px" />
      </GeneralIconContainer> */}
      {getTabIcon()}
      <TabTitle>{getTabTile()}</TabTitle>
      <GeneralIconContainer size="16px" onClick={(event) => {
        event.stopPropagation();
        closeTab();
      }}>
        <AiOutlineClose color={colors.primaryWhite} size="16px" />
      </GeneralIconContainer>
    </TabPill>
  );
}
