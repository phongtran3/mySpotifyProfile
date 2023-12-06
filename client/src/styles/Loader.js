//https://cssloaders.github.io/
import styled, { keyframes } from "styled-components";
import mixins from "./mixins";

const Container = styled.div`
  ${mixins.flexCenter};
  width: 100%;
  height: 90vh;
`;

const rikSpikeRoll = keyframes`
  0% { background-size: 10px 3px; }
  16% { background-size: 10px 50px, 10px 3px, 10px 3px, 10px 3px, 10px 3px, 10px 3px; }
  33% { background-size: 10px 30px, 10px 50px, 10px 3px, 10px 3px, 10px 3px, 10px 3px; }
  50% { background-size: 10px 10px, 10px 30px, 10px 50px, 10px 3px, 10px 3px, 10px 3px; }
  66% { background-size: 10px 3px, 10px 10px, 10px 30px, 10px 50px, 10px 3px, 10px 3px; }
  83% { background-size: 10px 3px, 10px 3px, 10px 10px, 10px 30px, 10px 50px, 10px 3px; }
  100% { background-size: 10px 3px, 10px 3px, 10px 3px, 10px 10px, 10px 30px, 10px 50px; }
`;

const Loader = styled.div`
  position: relative;
  width: 85px;
  height: 50px;
  background-repeat: no-repeat;
  background-image: linear-gradient(#fff 50px, transparent 0), linear-gradient(#fff 50px, transparent 0), linear-gradient(#fff 50px, transparent 0),
    linear-gradient(#fff 50px, transparent 0), linear-gradient(#fff 50px, transparent 0), linear-gradient(#fff 50px, transparent 0);
  background-position: 0px center, 15px center, 30px center, 45px center, 60px center, 75px center, 90px center;
  animation: ${rikSpikeRoll} 0.65s linear infinite alternate;
`;

const StyledLoader = () => (
  <Container>
    <Loader />
  </Container>
);
export default StyledLoader;
