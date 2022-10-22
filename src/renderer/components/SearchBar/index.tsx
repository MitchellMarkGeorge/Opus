import React from "react";
import styled, { useTheme } from "styled-components";
import { SEARCH_BAR_HEIGHT } from "../../../common/constants";
import { GeneralIconContainer } from "../TabBar/components/GeneralIconContainer";
import { AiOutlineArrowLeft } from "@react-icons/all-files/ai/AiOutlineArrowLeft";
import { AiOutlineArrowRight } from "@react-icons/all-files/ai/AiOutlineArrowRight";
import { AiOutlineReload } from "@react-icons/all-files/ai/AiOutlineReload";
import { IconContext } from "@react-icons/all-files";
import { ipcRenderer } from "electron";
import {
  BACK_HISTORY,
  FORWARD_HISTORY,
  RELOAD_TAB,
} from "../../../common/messages/Tabs";
import { useTopBarState } from "../../store";
import isURL from "validator/lib/isURL";
import { changeCurrentViewUrl } from "../../services/ipc";

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
  /* height: 2.5rem; */
  background-color: #fff;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 16px;
  /* height: 100%; */
  /* color: #cecece; */
  color: #ddd;
  background-color: ${(props) => props.theme.colors.primaryInterfaceColor};
`;

export default function SearchBar() {
  const { colors } = useTheme();
  const searchValue = useTopBarState((state) => state.searchValue);
  const setSearchValue = useTopBarState((state) => state.setSearchValue);

  const reloadTab = () => {
    ipcRenderer.send(RELOAD_TAB);
  };

  const goBackwards = () => {
    ipcRenderer.send(BACK_HISTORY);
  };

  const goForwards = () => {
    ipcRenderer.send(FORWARD_HISTORY);
  };

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (searchValue) {
        if (isURL(searchValue)) {
          if (
            !searchValue.startsWith("https://") &&
            !searchValue.startsWith("http://")
          ) {
            const newUrl = `http://${searchValue}`;
            setSearchValue(newUrl);
            changeCurrentViewUrl(newUrl);
          } else {
            changeCurrentViewUrl(searchValue);
          }
        } else {
          const googleUrl = `https://google.com/search?q=${encodeURIComponent(
            searchValue,
          )}`;
          setSearchValue(googleUrl);
          changeCurrentViewUrl(googleUrl);
        }
        (event.target as HTMLInputElement).blur();
      }
    }
  };
  const navigationIons = (
    <IconContext.Provider value={{ color: colors.primaryWhite, size: "24px" }}>
      <NavigationIcons>
        <GeneralIconContainer size="24px" onClick={goBackwards}>
          <AiOutlineArrowLeft />
        </GeneralIconContainer>
        <GeneralIconContainer size="24px" onClick={goForwards}>
          <AiOutlineArrowRight />
        </GeneralIconContainer>
        <GeneralIconContainer size="24px" onClick={reloadTab}>
          <AiOutlineReload />
        </GeneralIconContainer>
      </NavigationIcons>
    </IconContext.Provider>
  );
  return (
    <SearchBarContainer>
      {navigationIons}
      <SearchInput
        autoFocus
        placeholder="Search with Google or enter URL..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={onEnter}
      />
    </SearchBarContainer>
  );
}
