import React from "react";
import styled, { useTheme } from "styled-components";
import { SEARCH_BAR_HEIGHT } from "../../../common/constants";
import { GeneralIconContainer } from "../TabBar/components/GeneralIconContainer";
import { AiOutlineArrowLeft } from "@react-icons/all-files/ai/AiOutlineArrowLeft";
import { AiOutlineArrowRight } from "@react-icons/all-files/ai/AiOutlineArrowRight";
import { AiOutlineReload } from "@react-icons/all-files/ai/AiOutlineReload";
import { IconContext } from "@react-icons/all-files";

const SearchBarContainer = styled.div`
  width: 100%;
  height: ${SEARCH_BAR_HEIGHT}px;
  max-height: ${SEARCH_BAR_HEIGHT}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${(props) => props.theme.colors.secondaryInterfaceColor};
`;

const NavigationIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  gap: 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 16px;
`;

export default function SearchBar() {
  const { colors } = useTheme();
  const navigationIons = (
    <IconContext.Provider value={{ color: colors.primaryWhite, size: "24px" }}>
      <NavigationIcons>
        <GeneralIconContainer size="24px">
          <AiOutlineArrowLeft />
        </GeneralIconContainer>
        <GeneralIconContainer size="24px">
          <AiOutlineArrowRight />
        </GeneralIconContainer>
        <GeneralIconContainer size="24px">
          <AiOutlineReload />
        </GeneralIconContainer>
      </NavigationIcons>
    </IconContext.Provider>
  );
  return (
    <SearchBarContainer>
      {navigationIons}
      <SearchInput placeholder="Search with Google or enter URL..."/>
    </SearchBarContainer>
  );
}
