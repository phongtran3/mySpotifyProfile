import React, { useEffect, useState } from "react";
import IconClock from "../icons/clock";
import TrackItem from "./TrackItem";

import { getTopTracksLong, getTopTracksMedium, getTopTracksShort } from "../spotify";
import StyledLoader from "../styles/Loader";
import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import Main from "../styles/Main";
import media from "../styles/media";
const { colors, fontSizes, spacing } = theme;

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
const TrackContainer = styled.div`
  margin-top: 50px;
`;
const TrackContainerHeader = styled.div`
  display: grid;
  grid-template-columns:
    [index] 25px
    [first] minmax(120px, 4fr)
    [var1] minmax(120px, 2fr)
    [last] minmax(120px, 1fr);
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
  }
`;
export default function TopTracks() {
  const [topTracks, setTopTracks] = useState();
  const [timeRange, setTimeRange] = useState("long");

  const apiCalls = {
    long: getTopTracksLong(),
    medium: getTopTracksMedium(),
    short: getTopTracksShort(),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTopTracksLong();
        console.log(data);
        setTopTracks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const changeRange = async (range) => {
    try {
      const { data } = await apiCalls[range];
      setTopTracks(data);
      setTimeRange(range);
    } catch (err) {
      console.error(err);
    }
  };

  const setTimeRangeData = (range) => changeRange(range);

  return (
    <Main>
      <Header>
        <h2>Top Tracks</h2>
        <TimeRanges>
          <TimeRangeButton $isActive={timeRange === "long"} onClick={() => setTimeRangeData("long")}>
            <span>All Time</span>
          </TimeRangeButton>
          <TimeRangeButton $isActive={timeRange === "medium"} onClick={() => setTimeRangeData("medium")}>
            <span>Last 6 Months</span>
          </TimeRangeButton>
          <TimeRangeButton $isActive={timeRange === "short"} onClick={() => setTimeRangeData("short")}>
            <span>Last 4 Weeks</span>
          </TimeRangeButton>
        </TimeRanges>
      </Header>

      <TrackContainer>
        <TrackContainerHeader>
          <Index>#</Index>
          <Title>Title</Title>
          <AlbumName>Album</AlbumName>
          <Duration>
            <IconClock></IconClock>
          </Duration>
        </TrackContainerHeader>
        <div style={{ marginTop: "20px" }}>{topTracks ? topTracks.items.map((track, i) => <TrackItem track={track} index={i} key={i} />) : <StyledLoader></StyledLoader>}</div>
      </TrackContainer>
    </Main>
  );
}
