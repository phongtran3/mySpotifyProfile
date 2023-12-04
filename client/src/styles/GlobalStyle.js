import { createGlobalStyle } from "styled-components";
import theme from "./theme";
const { colors, fontSizes, fonts } = theme;
const GlobalStyle = createGlobalStyle`

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
  }

  body {
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: ${fonts.primary};
    font-size: ${fontSizes.base};
    background-color: ${colors.black};
    color: ${colors.white};
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    transition: ${theme.transition};
    cursor: pointer;
  }

`;

export default GlobalStyle;
