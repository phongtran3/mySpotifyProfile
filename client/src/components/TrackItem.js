import React from "react";
import { Link } from "react-router-dom";
import IconInfo from "../icons/info";

import { formatDuration } from "../utils";

import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import media from "../styles/media";

const { colors, spacing } = theme;

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
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  svg {
    width: 25px;
  }
`;

const Item = styled.div`
  display: grid;
  grid-template-columns:
    [index] 25px
    [first] minmax(120px, 4fr)
    [var1] minmax(120px, 2fr)
    [last] minmax(120px, 1fr);
  grid-gap: 20px;
  margin-bottom: 30px;

  &:hover,
  &:focus {
    background-color: ${colors.darkGrey};
  }
`;

const Index = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  color: ${colors.lightGrey};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.lightGrey};
`;

const AlbumName = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.lightGrey};
  ${media.tablet`
    display: none;
  `}
`;

const Duration = styled.div`
  color: ${colors.lightGrey};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-column: last;
  svg {
    margin-right: 32px;
    width: 20px;
    height: 20px;
  }
`;

const TrackLeft = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
`;

const TrackArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  margin-right: ${spacing.base};
  width: 100px;
  min-width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
`;

const TrackName = styled(Link)`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  font-weight: 700;
  margin-bottom: 10px;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;

const AlbumLinks = styled(Link)`
  width: max-content;
  display: flex;
  border-bottom: 1px solid transparent;
  transition: border-bottom 0.3s;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;

const TrackDuration = styled.span`
  color: ${colors.lightGrey};
  margin-right: 32px;
`;
export default function TrackItem({ track, index }) {
  const { id, name, artists, album, duration_ms } = track;
  const { images } = album;
  const imagesLength = images ? images.length : 0;

  return (
    <div style={{ marginTop: "20px" }}>
      <Item>
        <Index>{index + 1}</Index>
        <Title>
          <TrackArtwork to={`${track.external_urls.spotify}`} target="_blank" rel="noopener noreferrer">
            {imagesLength && <img src={images[1].url} alt="Album Artwork" />}
            <Mask>
              <IconInfo />
            </Mask>
          </TrackArtwork>
          <TrackLeft>
            {name && (
              <TrackName to={`${track.external_urls.spotify}`} target="_blank" rel="noopener noreferrer">
                {name}
              </TrackName>
            )}
            {artists &&
              artists.map(({ name }, i) => (
                <AlbumLinks to={`${track.artists[i].external_urls.spotify}`} key={i} target="_blank" rel="noopener noreferrer">
                  {name}
                  {artists.length > 0 && i === artists.length - 1 ? "" : ","}&nbsp;
                </AlbumLinks>
              ))}
          </TrackLeft>
        </Title>
        <AlbumName>
          <AlbumLinks to={`${track.album.external_urls.spotify}`} target="_blank" rel="noopener noreferrer">
            {album.name}
          </AlbumLinks>
        </AlbumName>
        <Duration>{duration_ms && <TrackDuration>{formatDuration(duration_ms)}</TrackDuration>}</Duration>
      </Item>
    </div>
  );
}
