import React, { useEffect, useState } from "react";
import { getTopTracksLong, getTopTracksMedium, getTopTracksShort } from "../spotify";
import StyledLoader from "../styles/Loader";
import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import Main from "../styles/Main";
import media from "../styles/media";

const { colors, fontSizes } = theme;
export default function TopTracks() {
  return <div>TopTracks</div>;
}
