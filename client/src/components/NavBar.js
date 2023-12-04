import React from "react";
import { Link, NavLink } from "react-router-dom";
import IconSpotify from "../icons/spotify";
import IconUser from "../icons/user";
import IconPlaylist from "../icons/playlist";
import IconMusic from "../icons/music";
import IconGithub from "../icons/github";
import IconHistory from "../icons/history";
import IconLinkedIn from "../icons/linkedin";
import IconHeadPhone from "../icons/headphone";

import styled from "styled-components";
import theme from "../styles/theme";
import media from "../styles/media";
import mixins from "../styles/mixins";
const { colors } = theme;

const NavBarContainer = styled.nav`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  ${mixins.flexBetween};
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  background-color: ${colors.navBlack};
  text-align: center;
  z-index: 99;
  ${media.tablet`
    top: auto;
    bottom: 0;
    right: 0;
    width: 100%;
    min-height: 70px;
    height: 70px;
    flex-direction: row;
  `};
  & > * {
    width: 100%;
    ${media.tablet`
      height: 100%;
    `};
  }
`;

const SocialDiv = styled.div`
  ${media.tablet`
    display: none;
  `};
`;

const Social = styled.div`
  color: ${colors.lightGrey};
  ${media.tablet`
    display: none;
  `};
  a {
    &:hover,
    &:focus,
    &.active {
      color: ${colors.darkGreen};
    }
    svg {
      width: 30px;
    }
  }
`;

const Logo = styled.div`
  color: ${colors.green};
  margin-top: 30px;
  width: 70px;
  height: 70px;
  transition: ${theme.transition};
  ${media.tablet`
    display: none;
  `};
  &:hover,
  &:focus {
    color: ${colors.darkGreen};
  }
  svg {
    width: 50px;
  }
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  ${media.tablet`
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
  `};
`;

const MenuItem = styled.li`
  color: ${colors.lightGrey};
  font-size: 11px;
  ${media.tablet`
    flex-grow: 1;
    flex-basis: 100%;
    height: 100%;
  `};
  a {
    display: block;
    padding: 15px 0;
    border-left: 5px solid transparent;
    width: 100%;
    height: 100%;
    ${media.tablet`
      ${mixins.flexCenter};
      flex-direction: column;
      padding: 0;
      border-left: 0;
      border-top: 3px solid transparent;
    `};
    &:hover,
    &:focus,
    &.active {
      color: ${colors.white};
      background-color: ${colors.black};
      border-left: 5px solid ${colors.offGreen};
      ${media.tablet`
        border-left: 0;
        border-top: 3px solid ${colors.offGreen};
      `};
    }
  }
  svg {
    width: 20px;
    height: 20px;
    margin-bottom: 7px;
  }
`;

export default function NavBar() {
  return (
    <NavBarContainer>
      <Logo>
        <Link to="/">
          <IconSpotify />
        </Link>
      </Logo>

      <Menu>
        <MenuItem>
          <NavLink to="/">
            <IconUser />
            <div>Profile</div>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="artists">
            <IconHeadPhone />
            <div>Top Artists</div>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="tracks">
            <IconMusic />
            <div>Top Tracks</div>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="recent">
            <IconHistory />
            <div>Recent</div>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="playlists">
            <IconPlaylist />
            <div>Playlists</div>
          </NavLink>
        </MenuItem>
      </Menu>

      <SocialDiv>
        <Social>
          <a href="https://github.com/phongtran3" target="_blank" rel="noopener noreferrer">
            <IconGithub />
          </a>
        </Social>
        <Social>
          <a href="https://www.linkedin.com/in/phong-tran230/" target="_blank" rel="noopener noreferrer">
            <IconLinkedIn />
          </a>
        </Social>
      </SocialDiv>
    </NavBarContainer>
  );
}
