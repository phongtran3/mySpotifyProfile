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
    height: 100%;
    width: 100%;
  }
`;

const NoAvatar = styled.div`
  border: 2px solid currentColor;
  border-radius: 100%;
  padding: ${spacing.md};
`;

const UserName = styled.a`
  &:hover,
  &:focus {
    color: ${colors.green};
  }
`;

const Name = styled.h1`
  font-size: 60px;
  font-weight: 700;
  margin: 20px 0 0;
  ${media.tablet`
      font-size: 50px;
    `};
  ${media.phablet`
      font-size: 10vw;
    `};
`;

const Stat = styled.div`
  text-align: center;
`;

const UserStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: ${spacing.base};
  ${Stat}:last-child {
    &:hover {
      color: ${colors.white};
      background-color: ${colors.darkGrey};
      border-bottom: 5px solid ${colors.green};
    }
  }
`;

const Number = styled.div`
  color: ${colors.green};
  font-weight: 700;
  font-size: ${fontSizes.xxl};
  ${media.thone`
    font-size: ${fontSizes.lg};
  `};
`;

const NumLabel = styled.p`
  color: ${colors.lightestGrey};
  font-size: ${fontSizes.md};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: ${spacing.sm} 0;
  ${media.thone`
    font-size: ${fontSizes.xs};
  `};
`;

const LogOutButton = styled.a``;

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

  const totalPlaylists = playlists ? playlists.total : 0;
  return (
    <>
      {user ? (
        <Main>
          <Header>
            <Avatar>
              {user.images.length > 0 ? (
                <img src={user.images[1].url} alt="avatar" />
              ) : (
                <NoAvatar>
                  <IconUser />
                </NoAvatar>
              )}
            </Avatar>
            <UserName href={user.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <Name>{user.display_name}</Name>
            </UserName>
            <UserStats>
              <Stat>
                <Number>{user.followers.total}</Number>
                <NumLabel>Following</NumLabel>
              </Stat>
              {followedArtists && (
                <Stat>
                  <Number>{followedArtists.artists.items.length}</Number>
                  <NumLabel>Following</NumLabel>
                </Stat>
              )}
              {totalPlaylists && (
                <Stat>
                  <Link to="playlists">
                    <Number>{totalPlaylists}</Number>
                    <NumLabel>Playlists</NumLabel>
                  </Link>
                </Stat>
              )}
            </UserStats>
          </Header>
        </Main>
      ) : (
        <StyledLoader />
      )}
    </>
  );
}
