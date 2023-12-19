import React from "react";
import { Link } from "react-router-dom";
import { formatDuration } from "../utils";

import IconInfo from "../icons/info";
import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import media from "../styles/media";
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
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  svg {
    width: 25px;
  }
`;

const TrackLeft = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
`;

const TrackRight = styled.span``;
const TrackArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  margin-right: ${spacing.base};
  width: 150px;
  min-width: 150px;
  height: 150px;
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
  ${media.tablet`
    width: 100px;
    min-width: 100px;
    height: 100px;
    `}
`;

const TrackName = styled(Link)`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  font-weight: 700;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;

const TrackMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  height: 100%;
  grid-gap: 10px;
`;

const AlbumLinks = styled(Link)`
  border-bottom: 1px solid transparent;
  transition: border-bottom 0.3s;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;

const TrackAlbum = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
  margin-top: ${spacing.sm};
`;

const TrackDuration = styled.span`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
`;

const TrackContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: ${spacing.md};
`;

export default function TrackItemPreview({ track }) {
  return (
    <li>
      <TrackContainer>
        <div>
          <TrackArtwork to={`${track.external_urls.spotify}`} target="_blank" rel="noopener noreferrer">
            {track.album.images.length && <img src={track.album.images[1].url} alt="Album Artwork" />}
            <Mask>
              <IconInfo />
            </Mask>
          </TrackArtwork>
        </div>
        <TrackMeta>
          <TrackLeft>
            {track.name && (
              <TrackName to={`${track.external_urls.spotify}`} target="_blank" rel="noopener noreferrer">
                {track.name}
              </TrackName>
            )}
            {track.artists && track.album && (
              <TrackAlbum>
                {track.artists &&
                  track.artists.map(({ name }, i) => (
                    <AlbumLinks to={`${track.artists[i].external_urls.spotify}`} key={i} target="_blank" rel="noopener noreferrer">
                      {name}
                      {track.artists.length > 0 && i === track.artists.length - 1 ? "" : ","}&nbsp;
                    </AlbumLinks>
                  ))}
                &nbsp;&middot;&nbsp;&nbsp;
                <AlbumLinks to={`${track.album.external_urls.spotify}`} target="_blank" rel="noopener noreferrer">
                  {track.album.name}
                </AlbumLinks>
              </TrackAlbum>
            )}
          </TrackLeft>
          <TrackRight>{track.duration_ms && <TrackDuration>{formatDuration(track.duration_ms)}</TrackDuration>}</TrackRight>
        </TrackMeta>
      </TrackContainer>
    </li>
  );
}
