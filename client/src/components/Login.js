import React from "react";
import { Container } from "react-bootstrap";

const LOGIN_URI = `http://localhost:3001/login`;

export default function Login() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh", gap: "1rem" }}>
      <h1>Spotify Profile</h1>
      <a className="btn btn-success btn-lg" href={LOGIN_URI}>
        Login With Spotify
      </a>
    </Container>
  );
}
