import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlaylist, getPlaylistTracks } from "../spotify";
import { formatDuration } from "../utils";

import StyledLoader from "../styles/Loader";
import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import media from "../styles/media";
import Main from "../styles/Main";
const { colors, fontSizes, spacing } = theme;

const Header = styled.div`
  display: flex;
`;

const PlaylistName = styled.h3`
  font-weight: 700;
`;

const PlaylistOwner = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
`;

const PlaylistCover = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 232px;
  margin-right: ${spacing.base};
  img {
    width: 100%;
  }
  ${media.tablet`
    display: none;
  `};
`;

const PlaylistMeta = styled.div`
  display: flex;
  flex-flow: column;
`;

export default function Playlist() {
  const { playlistId } = useParams();
  const [playlistTracks, setPlaylistTracks] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
  });

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
        const { data } = await getPlaylist(playlistId);

        const sortedTracks = tracks
          .slice()
          .sort((a, b) => {
            const nameA = removeSpecialCharacters(getArtistName(a.track || {}));
            const nameB = removeSpecialCharacters(getArtistName(b.track || {}));
            if (nameA < nameB) {
              return -1; // Name A comes before Name B
            }
            if (nameA > nameB) {
              return 1; // Name A comes after Name B
            }
            return 0; // Names are equal
          })
          .reduce(
            (accumulator, track) => {
              const trackDuration = track.track?.duration_ms || 0;
              const totalDurationMs = accumulator.totalDurationMs + trackDuration;

              return {
                totalDurationMs,
                sortedTracks: [...accumulator.sortedTracks, track],
              };
            },
            { totalDurationMs: 0, sortedTracks: [] }
          );

        const { totalDurationMs } = sortedTracks;
        const totalHours = Math.floor(totalDurationMs / (1000 * 60 * 60));
        const totalMinutes = Math.floor((totalDurationMs % (1000 * 60 * 60)) / (1000 * 60));

        console.log(totalDurationMs);
        console.log(sortedTracks);
        console.log(data);

        setDuration({
          hours: totalHours,
          minutes: totalMinutes,
        });
        setPlaylist(data);
        setPlaylistTracks(sortedTracks.sortedTracks);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [playlistId]);

  return (
    <>
      {playlist ? (
        <Main>
          <h2>Playlist</h2>
          <Header>
            {playlist.images.length && (
              <PlaylistCover>
                <img src={playlist.images[0].url} alt="Album Art" />
              </PlaylistCover>
            )}
            <PlaylistMeta>
              <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <PlaylistName>{playlist.name}</PlaylistName>
              </a>
              <PlaylistOwner>
                {playlist.owner.display_name} &nbsp;&middot;&nbsp; {playlist.tracks.total} Songs &nbsp;&middot;&nbsp; about {duration.hours} hr {duration.minutes} min
              </PlaylistOwner>
            </PlaylistMeta>
          </Header>
          {playlistTracks ? (
            <>
              {playlistTracks &&
                playlistTracks.map(({ track }, i) => (
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
      ) : (
        <StyledLoader />
      )}
    </>
  );
}
