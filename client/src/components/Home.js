import React from "react";
import UserProfile from "./UserProfile";
import { logout } from "../spotify";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
// <Container fluid>{accessToken ? <Home /> : <Login />}</Container>

export default function Home() {
  return (
    <>
      <Link className="btn btn-success btn-lg" href={"/"}>
        Home
      </Link>
      <button onClick={logout}>Logout</button>
    </>
  );
}
