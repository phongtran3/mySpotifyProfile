import React, { useEffect, useState } from "react";
import { getArtist, getArtistAblums, getArtistTopTracks } from "../spotify";
import { useParams } from "react-router-dom";

import StyledLoader from "../styles/Loader";
import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import media from "../styles/media";
import Main from "../styles/Main";
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  ${mixins.flexCenter};
  flex-direction: column;
  position: relative;
`;

const Avatar = styled.div`
  width: 250px;
  height: 250px;
  img {
    border-radius: 100%;
    height: 100%;
    width: 100%;
  }
`;

const NoAvatar = styled.div`
  border: 2px solid currentColor;
  border-radius: 100%;
  padding: ${spacing.md};
`;

const ArtistName = styled.a`
  &:hover,
  &:focus {
    color: ${colors.green};
  }
`;

const Name = styled.h1`
  font-size: 60px;
  font-weight: 700;
  margin: 20px 0 0;
  ${media.tablet`
      font-size: 50px;
    `};
  ${media.phablet`
      font-size: 10vw;
    `};
`;

export default function Artist() {
  const { artistId } = useParams();

  const [artist, setArtist] = useState();
  const [artistAlbums, setArtistAlbums] = useState();
  const [artistTopTracks, setArtistTopTracks] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: artist } = await getArtist(artistId);
        const { data: artistAlbums } = await getArtistAblums(artistId);
        const { data: artistTopTracks } = await getArtistTopTracks(artistId);
        console.log(artist);
        console.log(artistAlbums.items);
        console.log(artistTopTracks.tracks);

        const albumAndEP = artistAlbums.items.filter((album) => album.album_group === "album" || album.total_tracks >= 3);

        console.log(albumAndEP);
        setArtist(artist);
        setArtistAlbums(albumAndEP);
        setArtistTopTracks(artistTopTracks.tracks);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [artistId]);

  return (
    <>
      {artist ? (
        <Main>
          <h2>Artist</h2>
        </Main>
      ) : (
        <StyledLoader />
      )}
    </>
  );
}
