import React, { useEffect, useState } from "react";
import { getTopTracksLong, getTopTracksMedium, getTopTracksShort } from "../spotify";
import StyledLoader from "../styles/Loader";

import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import Main from "../styles/Main";
import media from "../styles/media";
const { colors, fontSizes } = theme;

const Header = styled.header`
  ${mixins.flexBetween};
  ${media.tablet`
    display: block;
  `};
`;

const TimeRanges = styled.div`
  display: flex;
  ${media.tablet`
    justify-content: space-around;
    margin: 30px 0 0;
  `};
`;

const TimeRangeButton = styled.button`
  background-color: transparent;
  color: ${(props) => (props.$isActive ? colors.white : colors.lightGrey)};
  font-size: ${fontSizes.base};
  font-weight: 700;
  padding: 10px;
  ${media.phablet`
    font-size: ${fontSizes.sm};
  `};
  span {
    padding-bottom: 2px;
    border-bottom: 1px solid ${(props) => (props.$isActive ? colors.white : `transparent`)};
    line-height: 1.5;
    white-space: nowrap;

    &:focus,
    &:hover {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;

export default function TopTracks() {
  return <div>TopTracks</div>;
}
