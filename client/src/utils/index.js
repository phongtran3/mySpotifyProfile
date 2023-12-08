// Get the query params off the window's URL (https://github.com/bchiang7/spotify-profile/blob/main/client/src/utils/index.js#L21)

export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

export const formatDuration = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const formatWithCommas = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
