// SPOTIFY WEB API AUTHORIZATION CODE FLOW
// https://developer.spotify.com/documentation/general/guides/authorization-guide/
// https://github.com/spotify/web-api-auth-examples
// Some of the code have been taken from https://github.com/bchiang7/spotify-profile/blob/main/server/index.js. Credit to orginal owner

const path = require("path");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");
const axios = require("axios");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT || 3002;
let REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:3001/callback";
let FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000";

if (process.env.NODE_ENV !== "production") {
  REDIRECT_URI = "http://localhost:3001/callback";
  FRONTEND_URI = "http://localhost:3000";
}

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app
  .use(express.static(path.resolve(__dirname, "../client/build")))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json())
  .use(
    history({
      verbose: true,
      rewrites: [
        { from: /\/login/, to: "/login" },
        { from: /\/callback/, to: "/callback" },
        { from: /\/refresh_token/, to: "/refresh_token" },
      ],
    })
  )
  .use(express.static(path.resolve(__dirname, "../client/build")));

const stateKey = "spotifyAuthState";

const generateRandomString = (length) => {
  let randomString = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomString;
};

app.get("/login", (req, res) => {
  console.log("Login");
  const scope =
    "user-read-email user-read-private user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public";
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state,
    })}`
  );
});

app.get("/callback", async (req, res) => {
  console.log("Callback");
  //application requests refresh and access tokens after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) res.redirect(`/#${querystring.stringify({ error: "state_mismatch" })}`);
  else {
    res.clearCookie(stateKey);
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
          },
        }
      );
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      // Redirect to the frontend URI with tokens
      res.redirect(
        `${FRONTEND_URI}/#${querystring.stringify({
          access_token,
          refresh_token,
        })}`
      );
    } catch (err) {
      res.redirect(`/#${querystring.stringify({ error: "invalid_token" })}`);
    }
  }
});

app.get("/refresh_token", async (req, res) => {
  console.log("Refresh");
  const refreshToken = req.query.refresh_token;

  if (refreshToken == null) {
    return res.status(400).json({ error: "Invalid refresh_token" });
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
        },
      }
    );

    const accessToken = response.data.access_token;
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", function (req, res) {
  res.render(path.resolve(__dirname, "../client/build/index.html"));
  //res.send({ message: "Hello World!" });
});

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
