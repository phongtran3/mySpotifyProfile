import { css } from "styled-components";
import theme from "./theme";
const { colors, fontSizes } = theme;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export default mixins;
