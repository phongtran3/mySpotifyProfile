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
    const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (err) {
    console.error(err);
  }
};

export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();
  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  if (Date.now() - getTokenTimestamp() - EXPIRATION_TIME) {
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
