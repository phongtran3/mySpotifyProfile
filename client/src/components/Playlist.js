import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlaylist, getPlaylistTracks } from "../spotify";

import StyledLoader from "../styles/Loader";
import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import media from "../styles/media";
import Main from "../styles/Main";
const { colors, fontSizes, spacing } = theme;

export default function Playlist() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracks = await getPlaylistTracks(playlistId);
        setPlaylist(tracks);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [playlistId]);

  return (
    <Main>
      <h2>Playlist</h2>
    </Main>
  );
}
