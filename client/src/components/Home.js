import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import UserProfile from "./UserProfile";
import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";
import RecentlyPlayed from "./RecentlyPlayed";
import Playlists from "./Playlists";
import Playlist from "./Playlist";
import NavBar from "./NavBar";
import Artist from "./Artist";

import styled from "styled-components";
import media from "../styles/media";

const SiteWrapper = styled.div`
  padding-left: 100px;
  ${media.tablet`
  padding-left: 0;
  padding-bottom: 50px`}
`;

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

export default function Home() {
  return (
    <SiteWrapper>
      <NavBar />
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="artists" element={<TopArtists />} />
          <Route path="tracks" element={<TopTracks />} />
          <Route path="recent" element={<RecentlyPlayed />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="playlists/:playlistId" element={<Playlist />} />
          <Route path="artist/:artistId" element={<Artist />} />
        </Routes>
      </ScrollToTop>
    </SiteWrapper>
  );
}
