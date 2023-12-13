import axios from "axios";
import { getHashParams } from "../utils";

const EXPIRATION_TIME = 3600 * 1000; // 1 hour in milliseconds

const setLocalAccessToken = (token) => {
  window.localStorage.setItem("spotifyTokenTimeStamp", Date.now());
  window.localStorage.setItem("spotifyAccessToken", token);
};
const setLocalRefreshToken = (token) => window.localStorage.setItem("spotifyRefreshToken", token);

const getTokenTimestamp = () => window.localStorage.getItem("spotifyTokenTimeStamp");
const getLocalAccessToken = () => window.localStorage.getItem("spotifyAccessToken");
const getLocalRefreshToken = () => window.localStorage.getItem("spotifyRefreshToken");

const refreshAccessToken = async () => {
  try {
    console.log("Refreshing...");
    const refresh_token = getLocalRefreshToken();
    console.log(refresh_token);
    if (refresh_token != null) {
      const { data } = await axios.get(`http://localhost:3001/refresh_token?refresh_token=${encodeURIComponent(refresh_token)}`);
      const { accessToken } = data;
      console.log(accessToken);
      setLocalAccessToken(accessToken);
      window.location.reload();
      console.log("Returning...");
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  console.log("Getting...");
  const { error, access_token, refresh_token } = getHashParams();
  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn("Access token has expired, refreshing...");
    refreshAccessToken();
  }
  const localAccessToken = getLocalAccessToken();

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if ((!localAccessToken || localAccessToken === "undefined") && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem("spotifyTokenTimeStamp");
  window.localStorage.removeItem("spotifyAccessToken");
  window.localStorage.removeItem("spotifyRefreshToken");
  window.location = "/";
};

//SPOTIFY API CALLS
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

/*
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
 */
export const getCurrentUser = () => axios.get("https://api.spotify.com/v1/me", { headers });

/*
 * Get User's Followed Artists.
 * https://developer.spotify.com/documentation/web-api/reference/get-followed
 */
export const getFollowing = () => axios.get("https://api.spotify.com/v1/me/following?type=artist", { headers });

/*
 * Get Current User's Recently Played Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-recently-played
 */
export const getRecentlyPlayed = () => axios.get("https://api.spotify.com/v1/me/player/recently-played", { headers });

/*
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
 */
export const getPlaylists = () => axios.get("https://api.spotify.com/v1/me/playlists", { headers });

/*
 * Get a User's Top Artists
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks/
 * TBD PAGINATION
 */
export const getTopArtistsShort = ({ limit, offset }) => {
  const stringLimit = String(limit || 50);
  const stringOffset = String(offset || 0);

  return axios.get(`https://api.spotify.com/v1/me/top/artists?limit=${stringLimit}&offset=${stringOffset}&time_range=short_term`, { headers });
};
export const getTopArtistsMedium = ({ limit, offset }) => {
  const stringLimit = String(limit || 50);
  const stringOffset = String(offset || 0);

  return axios.get(`https://api.spotify.com/v1/me/top/artists?limit=${stringLimit}&offset=${stringOffset}&time_range=medium_term`, { headers });
};
export const getTopArtistsLong = ({ limit, offset }) => {
  const stringLimit = String(limit || 50);
  const stringOffset = String(offset || 0);

  return axios.get(`https://api.spotify.com/v1/me/top/artists?limit=${stringLimit}&offset=${stringOffset}&time_range=long_term`, { headers });
};

/*
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 * TBD PAGINATION
 */
export const getTopTracksShort = ({ limit, offset }) => {
  const stringLimit = String(limit || 50);
  const stringOffset = String(offset || 0);

  return axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=${stringLimit}&offset=${stringOffset}&time_range=short_term`, { headers });
};

export const getTopTracksMedium = ({ limit, offset }) => {
  const stringLimit = String(limit || 50);
  const stringOffset = String(offset || 0);

  return axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=${stringLimit}&offset=${stringOffset}&time_range=medium_term`, { headers });
};

export const getTopTracksLong = ({ limit, offset }) => {
  const stringLimit = String(limit || 50);
  const stringOffset = String(offset || 0);

  return axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=${stringLimit}&offset=${stringOffset}&time_range=long_term`, { headers });
};

/*
 * Get an Artist
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artist
 */
export const getArtist = (artistId) => axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { headers });

/**
 * Get Artist's top tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
 */
export const getArtistTopTracks = (artistId) => axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, { headers });

/** TBD
 * Get Artist's Ablums. Get Spotify catalog information about an artist's albums.
 * Just albums. No single, appear_on, or compilation
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
 */
export const getArtistAblums = (artistId) => axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`, { headers });

/** TBD
 *  Get Artist's selected albumn. Get Spotify catalog information for a single album.
 *  https://developer.spotify.com/documentation/web-api/reference/get-an-album
 */

export const getArtistAlbum = (albumId) => axios.get(`https://api.spotify.com/v1/albums/${albumId}`, { headers });

/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/get-playlist
 */
export const getPlaylist = (playlistId) => axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });

/**
 * Get a Playlist's Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks/
 */
export const getPlaylistTracks = (playlistId) => axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { headers });

// Get current User profile page information
export const getCurrentUserInfo = () =>
  axios.all([getCurrentUser(), getFollowing(), getPlaylists(), getTopArtistsLong(), getTopTracksLong(50, 0)]).then(
    axios.spread((user, followedArtists, playlists, topArtists, topTracks) => ({
      user: user.data,
      followedArtists: followedArtists.data,
      playlists: playlists.data,
      topArtists: topArtists.data,
      topTracks: topTracks.data,
    }))
  );
