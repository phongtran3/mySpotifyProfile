import React from "react";
import { logout } from "../spotify";

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
