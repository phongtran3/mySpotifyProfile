import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout, getCurrentUserInfo } from "../spotify";

import IconUser from "../icons/user";
import IconInfo from "../icons/info";
import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import media from "../styles/media";
import Main from "../styles/Main";
import StyledLoader from "../styles/Loader";

const { colors, spacing, fontSizes } = theme;

const Header = styled.header`
  ${mixins.flexCenter};
  flex-direction: column;
  position: relative;
`;

const Avatar = styled.div`
  width: 250px;
  height: 250px;
  img {
    border-radius: 100%;
  }
`;

const UserName = styled.a`
  &:hover,
  &:focus {
    color: ${colors.lightGreen};
  }
`;

export default function UserProfile() {
  const [user, setUser] = useState();
  const [followedArtists, setFollowedArtists] = useState();
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user, followedArtists, playlists, topArtists, topTracks } = await getCurrentUserInfo();
        setUser(user);
        setFollowedArtists(followedArtists);
        setPlaylists(playlists);
        setTopArtists(topArtists);
        setTopTracks(topTracks);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>Profile</div>
      <button onClick={logout}>Logout</button>
    </>
  );
}
