import { createGlobalStyle } from "styled-components";

interface Props {
    topBarHeight: number
}
export const GlobalStyle = createGlobalStyle<Props>`
    * {
        box-sizing: border-box;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: ${props => `${props.topBarHeight}px`};
        max-height: ${props => `${props.topBarHeight}px`};
        // might try and include in sf pro font itself instead of using this
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif !important;
  letter-spacing: normal !important;
    }
`;