import React, { useEffect, useState } from "react";
import { getArtist, getArtistAblums, getArtistTopTracks } from "../spotify";
import { Link, useParams } from "react-router-dom";
import { formatWithCommas } from "../utils";
import TrackItemPreview from "./TrackItemPreview";
import StyledLoader from "../styles/Loader";
import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import media from "../styles/media";
import Main from "../styles/Main";
import IconUser from "../icons/user";
import IconInfo from "../icons/info";
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

const Name = styled.h2`
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

const Stat = styled.div`
  text-align: center;
`;

const ArtistStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  margin-top: ${spacing.base};
`;

const Number = styled.div`
  text-transform: capitalize;
  color: ${colors.lightGreen};
  font-weight: 700;
  font-size: ${fontSizes.lg};
  ${media.thone`
    font-size: ${fontSizes.md};
  `};
`;

const NumLabel = styled.p`
  color: ${colors.lightestGrey};
  font-size: ${fontSizes.md};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: ${spacing.sm} 0;
  ${media.thone`
    font-size: ${fontSizes.xs};
  `};
`;

const Genre = styled.span`
  font-size: ${fontSizes.md};
`;

const ArtistList = styled.div`
  ${media.tablet`
    &:last-of-type {
      margin-top: 50px;
    }
  `};
`;

const ArtistListHeading = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 40px;
  h3 {
    display: inline-block;
    margin: 0;
  }
`;
const ArtistContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  width: 100%;
  margin-top: 100px;
  ${media.tablet`
    display: block;
    margin-top: 70px;
  `}
`;

const AlbumContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  grid-gap: 20px 15px;
  margin-top: 50px;
  justify-items: start;
  ${media.desktop`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `}
  ${media.thone`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `}
`;

const Album = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
`;

const AlbumArtWork = styled(Link)`
  display: inline-block;
  position: relative;
  img {
    width: 100%;
    min-width: 100%;
    height: 100%;
  }
`;

const AlbumName = styled(Link)`
  margin: ${spacing.base} 0;
  border-bottom: 1px solid transparent;
  font-weight: 700;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;

const TracksContainer = styled.div``;

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

        const albumAndEP = artistAlbums.items.filter((album) => album.album_group === "album" || album.total_tracks > 3);

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
          <Header>
            <Avatar>
              {artist.images.length > 0 ? (
                <img src={artist.images[1].url} alt="avatar" />
              ) : (
                <NoAvatar>
                  <IconUser />
                </NoAvatar>
              )}
            </Avatar>
            <ArtistName href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <Name>{artist.name}</Name>
            </ArtistName>
            <ArtistStats>
              <Stat>
                <Number>{formatWithCommas(artist.followers.total)}</Number>
                <NumLabel>Follwers</NumLabel>
              </Stat>
              <Stat>
                <Number>{artist.popularity}%</Number>
                <NumLabel>Popularity</NumLabel>
              </Stat>
            </ArtistStats>
            <div>
              {artist.genres && (
                <Stat>
                  <Number>
                    {artist.genres.map((genre, index) => (
                      <Genre key={genre}>
                        {genre}
                        {index < artist.genres.length - 1 && <> &middot; </>}
                      </Genre>
                    ))}
                  </Number>
                  <NumLabel>Genres</NumLabel>
                </Stat>
              )}
            </div>
          </Header>
          <ArtistContainer>
            <ArtistList>
              <ArtistListHeading>
                <h3>Albums and EPs</h3>
              </ArtistListHeading>
              <AlbumContainer>
                {artistAlbums ? (
                  <>
                    {artistAlbums.map((album, i) => (
                      <Album key={i}>
                        <AlbumArtWork to={`${album.external_urls.spotify}`} target="_blank" rel="noopener noreferrer">
                          {album.images.length && <img src={album.images[1].url} alt="Artist" />}
                          <Mask>
                            <IconInfo />
                          </Mask>
                        </AlbumArtWork>
                        <AlbumName to={`${album.external_urls.spotify}`} target="_blank" rel="noopener noreferrer">
                          {album.name}
                        </AlbumName>
                      </Album>
                    ))}
                  </>
                ) : (
                  <StyledLoader />
                )}
              </AlbumContainer>
            </ArtistList>

            <ArtistList>
              <ArtistListHeading>
                <h3>Popular Tracks</h3>
              </ArtistListHeading>
              <ul>{artistTopTracks ? artistTopTracks.map((track, i) => <TrackItemPreview track={track} key={i} />) : <StyledLoader />}</ul>
            </ArtistList>
          </ArtistContainer>
        </Main>
      ) : (
        <StyledLoader />
      )}
    </>
  );
}
