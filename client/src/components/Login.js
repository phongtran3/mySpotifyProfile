import React from "react";
import { Container } from "react-bootstrap";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=5e5b4e3563784901b6193a920d89dbb4&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-email%20user-read-private%20user-read-recently-played%20user-top-read%20user-follow-read%20user-follow-modify%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-public";

export default function Login() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh", gap: "1rem" }}>
      <h1>Spotify Profile</h1>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  );
}
