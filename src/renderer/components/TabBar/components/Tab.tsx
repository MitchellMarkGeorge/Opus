import React from "react";
import styled, { useTheme } from "styled-components";
import { TabInfo } from "../../../types";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { GeneralIconContainer } from "./GeneralIconContainer";

interface Props {
  data: TabInfo;
  isSelected: boolean;
}

const TabPill = styled.div<{ isSelected: boolean }>`
  display: flex;
  max-width: 150px;
  width: 150px;
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
  transition: filter 1s;

  // animation???
  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    filter: brightness(1.4);
  }
`;

const TabTitle = styled.div`
  color: ${(props) => props.theme.colors.primaryWhite};
  font-weight: 590;
  font-size: 16px;
  text-overflow: ellipsis;
  align-items: center;
  overflow: hidden;
  height: 100%;
  width: 100%;
  white-space: nowrap;
`;

export default function Tab({ data, isSelected }: Props) {
  const theme = useTheme();
  return (
    <TabPill isSelected={isSelected}>
      <TabTitle>{data.title || "Loading..."}</TabTitle>
      <GeneralIconContainer size="16px">
        <AiOutlineClose color={theme.colors.primaryWhite} size="16px" />
      </GeneralIconContainer>
    </TabPill>
  );
}
