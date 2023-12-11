import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout, getCurrentUserInfo } from "../spotify";
import TrackItem from "./TrackItem";

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
    border-bottom: 5px solid transparent;
    &:focus,
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

const LogOutButton = styled.a`
  background-color: transparent;
  color: ${colors.white};
  border: 2px solid ${colors.white};
  border-radius: 30px;
  margin-top: 30px;
  padding: 12px 30px;
  font-size: ${fontSizes.md};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.white};
    color: ${colors.black};
  }
  ${media.thone`
    font-size: ${fontSizes.xs};
  `};
`;

const PreviewSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  width: 100%;
  margin-top: 100px;
  ${media.tablet`
    display: block;
    margin-top: 70px;
  `}
`;

const UserList = styled.div`
  ${media.tablet`
    &:last-of-type {
      margin-top: 50px;
    }
  `};
`;

const UserListHeading = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 40px;
  h3 {
    display: inline-block;
    margin: 0;
  }
`;

const MoreButton = styled(Link)`
  display: inline-block;
  color: ${colors.white};
  font-weight: 700;
  font-size: ${fontSizes.sm};
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid ${colors.white};
  border-radius: 50px;
  padding: 11px 24px;
  cursor: pointer;
  transition: ${theme.transition};
  &:hover,
  &:focus {
    color: ${colors.black};
    background: ${colors.white};
    outline: 0;
  }
  text-align: center;
  white-space: nowrap;
  ${media.phablet`
    padding: 11px 20px;
    font-sizes: ${fontSizes.xs};
  `};
`;

const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 20px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  svg {
    width: 25px;
  }
`;

const ArtistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px 10px;
  margin-top: 50px;
  justify-items: start;
  ${media.desktop`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `}
  ${media.thone`
    grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
  `}
`;

const Artist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
`;

const ArtistArtWork = styled(Link)`
  display: inline-block;
  position: relative;
  img {
    width: 100%;
    min-width: 100%;
    height: 100%;
  }
`;

const ArtistName = styled(Link)`
  margin: ${spacing.base} 0;
  border-bottom: 1px solid transparent;
  font-weight: 700;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
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
                <NumLabel>Follwers</NumLabel>
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
            <LogOutButton onClick={logout}>Log Out</LogOutButton>
          </Header>

          <PreviewSection>
            <UserList>
              <UserListHeading>
                <h3>Top Artists of All Time</h3>
                <MoreButton to="/artists">See More</MoreButton>
              </UserListHeading>
              <ArtistContainer>
                {topArtists ? (
                  <>
                    {topArtists.items.slice(0, 12).map((artist, i) => (
                      <Artist key={i}>
                        <ArtistArtWork to={`${artist.external_urls.spotify}`} target="_blank" rel="noopener noreferrer">
                          {artist.images.length && <img src={artist.images[2].url} alt="Artist" />}
                          <Mask>
                            <IconInfo />
                          </Mask>
                        </ArtistArtWork>
                        <ArtistName to={`${artist.external_urls.spotify}`} target="_blank" rel="noopener noreferrer">
                          {artist.name}
                        </ArtistName>
                      </Artist>
                    ))}
                  </>
                ) : (
                  <StyledLoader />
                )}
              </ArtistContainer>
            </UserList>

            <UserList>
              <UserListHeading>
                <h3>Top Tracks of All Time</h3>
                <MoreButton to="/tracks">See More</MoreButton>
              </UserListHeading>
              <ul>{topTracks ? topTracks.items.slice(0, 10).map((track, i) => <TrackItem track={track} key={i} />) : <StyledLoader />}</ul>
            </UserList>
          </PreviewSection>
        </Main>
      ) : (
        <StyledLoader />
      )}
    </>
  );
}
