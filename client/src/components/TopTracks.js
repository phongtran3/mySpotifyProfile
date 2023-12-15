import React, { useEffect, useState } from "react";
import TrackItem from "./TrackItem";
import TracksContainerHeader from "./TracksContainerHeader";

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
const TrackContainer = styled.div`
  margin-top: 50px;
`;

export default function TopTracks() {
  const [topTracks, setTopTracks] = useState();
  const [timeRange, setTimeRange] = useState("long");

  const apiCalls = {
    long: (params) => getTopTracksLong(params),
    medium: (params) => getTopTracksMedium(params),
    short: (params) => getTopTracksShort(params),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let arr = [];
        const { data: dataSet1 } = await getTopTracksLong({ limit: 50, offset: 0 });
        const { data: dataSet2 } = await getTopTracksLong({ limit: 50, offset: 49 });
        dataSet2.items.shift(); //offset 49 returns the 49th element included in first call
        arr = [...dataSet1.items, ...dataSet2.items];
        setTopTracks(arr);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const changeRange = async (range) => {
    try {
      let arr = [];
      //const { data } = await apiCalls[range];
      const { data: dataSet1 } = await apiCalls[range]({ limit: 50, offset: 0 });
      const { data: dataSet2 } = await apiCalls[range]({ limit: 50, offset: 49 });
      dataSet2.items.shift(); //offset 49 returns the 49th element included in first call
      arr = [...dataSet1.items, ...dataSet2.items];
      setTopTracks(arr);
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
        <TracksContainerHeader />
        <div style={{ marginTop: "20px" }}>{topTracks ? topTracks.map((track, i) => <TrackItem track={track} index={i} key={i} />) : <StyledLoader />}</div>
      </TrackContainer>
    </Main>
  );
}
