import React, { useState, useEffect } from "react";

import Login from "./components/Login";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";
import RecentlyPlayed from "./components/RecentlyPlayed";
import Playlists from "./components/Playlists";

import { token } from "./spotify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;

export default function App() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <AppContainer>
      <BrowserRouter>
        <GlobalStyle />
        {accessToken ? <Home /> : <Login />}
        {/* {accessToken && <NavBar />} */}

        {/* <Routes>
          <Route index path="/" element={accessToken ? <Home /> : <Login />} />
          <Route path="artists" element={<TopArtists />} />
          <Route path="tracks" element={<TopTracks />} />
          <Route path="recent" element={<RecentlyPlayed />} />
          <Route path="playlists" element={<Playlists />} />
        </Routes> */}
      </BrowserRouter>
    </AppContainer>
  );
}
