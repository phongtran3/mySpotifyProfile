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

  const removeSpecialCharacters = (str) => str.replace(/[^a-zA-Z0-9]/g, "");
  const getArtistName = (track) => {
    if (track && track.artists && track.artists.length > 0 && track.artists[0].name) {
      return track.artists[0].name.toUpperCase();
    }
    return "ZZZ_DEFAULT_STRING"; // Use a default string for comparison
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracks = await getPlaylistTracks(playlistId);
        const sortedTracks = tracks.slice().sort((a, b) => {
          const nameA = removeSpecialCharacters(getArtistName(a.track || {}));
          const nameB = removeSpecialCharacters(getArtistName(b.track || {}));
          if (nameA < nameB) {
            return -1; // Name A comes before Name B
          }
          if (nameA > nameB) {
            return 1; // Name A comes after Name B
          }
          return 0; // Names are equal
        });
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
              <>
                {track && track.name && (
                  <p key={i}>
                    {i + 1} {track.name}
                  </p>
                )}
              </>
            ))}
        </>
      ) : (
        <StyledLoader />
      )}
    </Main>
  );
}
