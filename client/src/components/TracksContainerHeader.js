import React from "react";

import media from "../styles/media";
import styled from "styled-components";
import theme from "../styles/theme";
import IconClock from "../icons/clock";
const { colors, spacing } = theme;

const TrackContainerHeader = styled.div`
  display: grid;
  grid-template-columns:
    [index] 25px
    [first] minmax(120px, 4fr)
    [var1] minmax(120px, 2fr)
    [last] minmax(120px, 1fr);
  ${media.tablet`
    grid-template-columns:
    [index] 10px [first] 1fr [last] max-content;
  `}
  grid-gap: ${spacing.base};
  border-bottom: 1px solid ${colors.lightGrey};
  height: 30px;
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
    ${media.tablet`
      margin-right: 0;
    `}
  }
`;

export default function TracksContainerHeader() {
  return (
    <TrackContainerHeader>
      <Index>#</Index>
      <Title>Title</Title>
      <AlbumName>Album</AlbumName>
      <Duration>
        <IconClock></IconClock>
      </Duration>
    </TrackContainerHeader>
  );
}
