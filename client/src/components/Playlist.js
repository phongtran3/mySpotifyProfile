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

        const sortedTracks = tracks.slice().sort((a, b) => {
          const artistA = a.track.artists[0].name.toUpperCase(); // Ignore case for sorting
          const artistB = b.track.artists[0].name.toUpperCase();
          if (artistA < artistB) {
            return -1; // Artist A comes before Artist B
          }
          if (artistA > artistB) {
            return 1; // Artist A comes after Artist B
          }
          return 0; // Artists are equal
        });
        console.log(sortedTracks);
        setPlaylist(sortedTracks);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [playlistId]);

  return (
    <Main>
      <h2>Playlist</h2>
      {playlist ? (
        <>
          {playlist &&
            playlist.map(({ track }, i) => (
              <p key={i}>
                {i + 1} - {track.name}
              </p>
            ))}
        </>
      ) : (
        <StyledLoader />
      )}
    </Main>
  );
}
