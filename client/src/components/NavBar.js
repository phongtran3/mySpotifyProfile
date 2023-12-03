import React from "react";
import IconSpotify from "../icons/spotify";
import IconUser from "../icons/user";
import IconPlaylist from "../icons/playlist";
import IconMusic from "../icons/music";
import IconGithub from "../icons/github";

import IconHistory from "../icons/history";
export default function NavBar() {
  return (
    <>
      <div>
        <h1>NavBar</h1>
        <IconSpotify />
        <IconUser />
        <IconPlaylist />
        <IconMusic />
        <IconGithub />
        <IconHistory />
      </div>
    </>
  );
}
