import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconInfo from "../icons/info";
import StyledLoader from "../styles/Loader";
import { getTopArtistsLong, getTopArtistsMedium, getTopArtistsShort } from "../spotify";

import styled from "styled-components";
import theme from "../styles/theme";
import mixins from "../styles/mixins";
import media from "../styles/media";
import Main from "../styles/Main";
const { colors, fontSizes, spacing } = theme;

export default function TopArtists() {
  const [topArtists, setTopArtists] = useState();
  const [timeRange, setTimeRange] = useState();

  return <Main>Top Artists</Main>;
}
