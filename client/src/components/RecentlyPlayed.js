import React, { useEffect, useState } from "react";
import TracksContainerHeader from "./TracksContainerHeader";
import TrackItem from "./TrackItem";

import { getRecentlyPlayed } from "../spotify";
import styled from "styled-components";
import Main from "../styles/Main";
import StyledLoader from "../styles/Loader";

const TracksContainer = styled.div`
  margin-top: 50px;
`;

export default function RecentlyPlayed() {
  const [recentlyPlayed, setRecentlyPlayed] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getRecentlyPlayed();
        setRecentlyPlayed(data.items);
        console.log(data.items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Main>
      <h2>Recently Played Tracks</h2>
      <TracksContainer>
        <TracksContainerHeader />
        <div style={{ marginTop: "20px" }}>{recentlyPlayed ? recentlyPlayed.map(({ track }, i) => <TrackItem track={track} index={i} key={i} />) : <StyledLoader />}</div>
      </TracksContainer>
    </Main>
  );
}
