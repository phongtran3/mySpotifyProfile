import React from "react";
import { Link } from "react-router-dom";
import { formatDuration } from "../utils";

import IconInfo from "../icons/info";
import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import media from "../styles/media";
const { colors, fontSizes, spacing } = theme;

const TrackLeft = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
`;
const TrackRight = styled.span``;
const TrackArtwork = styled.div`
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
`;

const TrackName = styled.span`
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

const TrackAlbum = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
  margin-top: ${spacing.sm};
  span {
    border-bottom: 1px solid transparent;
    transition: border-bottom 0.3s;
    &:hover,
    &:focus {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;

const TrackDuration = styled.span`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
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
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  svg {
    width: 25px;
  }
`;

const TrackContainer = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: ${spacing.md};
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
`;

export default function TrackItem({ track }) {
  return (
    <li>
      <TrackContainer to={`${track.external_urls.spotify}`} target="_blank" rel="noopener noreferrer">
        <div>
          <TrackArtwork>
            {track.album.images.length && <img src={track.album.images[1].url} alt="Album Artwork" />}
            <Mask>
              <IconInfo />
            </Mask>
          </TrackArtwork>
        </div>
        <TrackMeta>
          <TrackLeft>
            {track.name && <TrackName>{track.name}</TrackName>}
            {track.artists && track.album && (
              <TrackAlbum>
                {track.artists &&
                  track.artists.map(({ name }, i) => (
                    <span key={i}>
                      {name}
                      {track.artists.length > 0 && i === track.artists.length - 1 ? "" : ","}&nbsp;
                    </span>
                  ))}
                &nbsp;&middot;&nbsp;&nbsp;
                <span>{track.album.name}</span>
              </TrackAlbum>
            )}
          </TrackLeft>
          <TrackRight>{track.duration_ms && <TrackDuration>{formatDuration(track.duration_ms)}</TrackDuration>}</TrackRight>
        </TrackMeta>
      </TrackContainer>
    </li>
  );
}
