import React from "react";
import { logout } from "../spotify";

export default function Playlists() {
  return (
    <>
      <button onClick={logout}>Logout</button>
      <div>Playlists</div>
    </>
  );
}
