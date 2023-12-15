import React, { useEffect, useState } from "react";

import { getPlaylists } from "../spotify";
import { Link } from "react-router-dom";

import IconInfo from "../icons/info";
import StyledLoader from "../styles/Loader";
import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import media from "../styles/media";
import Main from "../styles/Main";

const { colors, fontSizes, spacing } = theme;

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

const PlaylistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: ${spacing.md};
  width: 100%;
  margin-top: 50px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
`;

const PlaylistWrapper = styled.div`
  background: ${colors.darkGrey};
  padding: 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  width: 100%;
  &:hover,
  &:focus {
    background: ${colors.grey};
    ${Mask} {
      opacity: 1;
    }
  }
  ${media.phablet`
    padding: 8px;
  `};
`;

const Playlist = styled.div`
  height: 100%;
`;
const PlaylistImage = styled.img`
  vertical-align: middle;
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
`;
const PlaylistCover = styled(Link)`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
  width: 100%;
  margin-bottom: ${spacing.base};
  padding-bottom: 100%;
`;

const PlaylistName = styled(Link)`
  font-weight: 700;
  display: inline;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;

const TotalTracks = styled.div`
  text-transform: uppercase;
  margin: 5px 0;
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  letter-spacing: 1px;
`;

export default function Playlists() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getPlaylists();
        setPlaylists(data.items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Main>
      <h2>Your Playlists</h2>
      <PlaylistsContainer>
        {playlists ? (
          playlists.map(({ id, images, name, tracks }, i) => (
            <PlaylistWrapper key={i}>
              <Playlist>
                <PlaylistCover to={id}>
                  {images.length && <PlaylistImage src={images[0].url} alt="Album Art" />}
                  <Mask>
                    <IconInfo />
                  </Mask>
                </PlaylistCover>
                <div>
                  <PlaylistName to={id}>{name}</PlaylistName>
                  <TotalTracks>{tracks.total} Tracks</TotalTracks>
                </div>
              </Playlist>
            </PlaylistWrapper>
          ))
        ) : (
          <StyledLoader />
        )}
      </PlaylistsContainer>
    </Main>
  );
}
