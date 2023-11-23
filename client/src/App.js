import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Profile from "./components/Profile";

const code = new URLSearchParams(window.location.search).get("code");

export default function App() {
  return code ? <Profile code={code} /> : <Login />;
}
