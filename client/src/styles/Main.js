//https://github.com/bchiang7/spotify-profile/blob/main/client/src/styles/Main.js
import styled from "styled-components";
import media from "./media";

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: 1520px;
  min-height: 100vh;
  padding: 50px;
  ${media.desktop`
    padding: 50px 50px;
  `};
  ${media.tablet`
    padding: 50px 40px;
  `};
  ${media.phablet`
    padding: 30px 25px;
  `};
  h2 {
    ${media.tablet`
      text-align: center;
    `};
  }
`;

export default Main;
