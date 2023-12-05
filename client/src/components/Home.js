import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import UserProfile from "./UserProfile";
import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";
import RecentlyPlayed from "./RecentlyPlayed";
import Playlists from "./Playlists";
import NavBar from "./NavBar";

import styled from "styled-components";
import media from "../styles/media";

import { logout } from "../spotify";
// <Container fluid>{accessToken ? <Home /> : <Login />}</Container>
{
  /* <Link className="btn btn-success btn-lg" href={"/"}>
Home
</Link>
<button onClick={logout}>Logout</button> */
}

const SiteWrapper = styled.div`
  padding-left: 100px;
  ${media.tablet`
  padding-left: 0;
  padding-bottom: 50px`}
`;

const ScrollToTop = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  return children;
};

export default function Home() {
  return (
    <SiteWrapper>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ScrollToTop>
                <UserProfile />
              </ScrollToTop>
            </>
          }
        />
        <Route path="artists" element={<TopArtists />} />
        <Route path="tracks" element={<TopTracks />} />
        <Route path="recent" element={<RecentlyPlayed />} />
        <Route path="playlists" element={<Playlists />} />
      </Routes>
    </SiteWrapper>
  );
}
