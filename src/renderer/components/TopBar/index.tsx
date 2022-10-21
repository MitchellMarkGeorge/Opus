import React from "react";
import styled from "styled-components";
import { TOP_BAR_HEIGHT } from "../../../common/constants";
import SearchBar from "../SearchBar";
import TabBar from "../TabBar";

const TopBarContainer = styled.div`
  width: 100%;
  height: ${TOP_BAR_HEIGHT}px;
  max-height: ${TOP_BAR_HEIGHT}px;
`;

function TopBar() {
  return (
    <TopBarContainer>
      <TabBar />
      <SearchBar />
    </TopBarContainer>
  );
}

export default TopBar;
