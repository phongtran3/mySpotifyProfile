import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IconInfo from "../icons/info";
import StyledLoader from "../styles/Loader";
import { getTopArtistsLong, getTopArtistsMedium, getTopArtistsShort } from "../spotify";

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

const ArtistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-top: 50px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
`;

const Artist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ArtistArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 250px;
  height: 250px;
  ${media.tablet`
    width: 150px;
    height: 150px;
  `};
  ${media.phablet`
    width: 120px;
    height: 120px;
  `};
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    ${media.tablet`
      width: 150px;
      height: 150px;
    `};
    ${media.phablet`
      width: 120px;
      height: 120px;
    `};
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

export default function TopArtists() {
  const [topArtists, setTopArtists] = useState();
  const [timeRange, setTimeRange] = useState("long");

  const apiCalls = {
    long: (params) => getTopArtistsLong(params),
    medium: (params) => getTopArtistsMedium(params),
    short: (params) => getTopArtistsShort(params),
  };

  useEffect(() => {
    const fetchData = async () => {
      let arr = [];
      try {
        const { data: dataSet1 } = await getTopArtistsLong({ limit: 50, offset: 0 });
        const { data: dataSet2 } = await getTopArtistsLong({ limit: 50, offset: 49 });
        dataSet2.items.shift(); //offset 49 returns the 49th element included in first call
        arr = [...dataSet1.items, ...dataSet2.items];
        setTopArtists(arr);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const changeRange = async (range) => {
    try {
      let arr = [];
      const { data: dataSet1 } = await apiCalls[range]({ limit: 50, offset: 0 });
      const { data: dataSet2 } = await apiCalls[range]({ limit: 50, offset: 49 });
      arr = [...dataSet1.items, ...dataSet2.items];
      setTopArtists(arr);
      setTimeRange(range);
    } catch (err) {
      console.error(err);
    }
  };

  const setTimeRangeData = (range) => changeRange(range);
  return (
    <Main>
      <Header>
        <h2>Top Artists</h2>
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
      <ArtistsContainer>
        {topArtists ? (
          topArtists.map(({ id, external_urls, images, name }, i) => (
            <Artist key={i}>
              <ArtistArtwork to={`/artist/${id}`}>
                {images.length && <img src={images[0].url} alt="Artist" />}
                <Mask>
                  <IconInfo />
                </Mask>
              </ArtistArtwork>
              <ArtistName to={external_urls.spotify} target="_blank" rel="noopener noreferrer">
                {name}
              </ArtistName>
            </Artist>
          ))
        ) : (
          <StyledLoader />
        )}
      </ArtistsContainer>
    </Main>
  );
}
