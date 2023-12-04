import React from "react";
import styled from "styled-components";
import theme from "../styles/theme.js";
import Main from "../styles/Main.js";
import mixins from "../styles/mixins.js";

const { colors, fontSizes } = theme;
const LOGIN_URI = `http://localhost:3001/login`;

const LoginContainer = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  h1 {
    font-size: ${fontSizes.xxl};
  }
`;

const LoginButton = styled.a`
  display: inline-block;
  background-color: ${colors.green};
  color: ${colors.white};
  border-radius: 30px;
  padding: 15px 30px;
  margin: 20px 0 70px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.darkGreen};
  }
`;

export default function Login() {
  return (
    <LoginContainer>
      <h1 style={{ color: colors.white }}>MySpotifyProfile</h1>
      <h3 style={{ color: colors.lightGrey }}>A place to visualize your personalized Spotfiy data</h3>
      <LoginButton href={LOGIN_URI}>Login With Spotify</LoginButton>
    </LoginContainer>
  );
}
