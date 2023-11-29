import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { token } from "./spotify";

export default function App() {
  const [accessToken, setAccessToken] = useState("");

  // useEffect(() => {
  //   setAccessToken(token);
  // }, []);

  return accessToken ? <Profile /> : <Login />;
}
