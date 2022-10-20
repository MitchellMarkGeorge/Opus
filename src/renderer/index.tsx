import React from "react";
import { createRoot } from "react-dom/client";
import TopBar from "./components/TopBar";
import { GlobalStyle } from "./style/GlobalStyle";
import { TOP_BAR_HEIGHT } from "../common/constants";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./style/theme";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

// move global style to TopBar component
root.render(
  <ThemeProvider theme={darkTheme}>
    <GlobalStyle topBarHeight={TOP_BAR_HEIGHT}/>
    <TopBar />
  </ThemeProvider>,
);
