import styled from "styled-components";

export const StyledCategory = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2svw;
  &.proximity {
    scroll-snap-type: y proximity;
  }
  overflow: scroll;
  height: 100svh;
  scroll-snap-type: y mandatory;
  width: 100%;
  @media (min-aspect-ratio: 1/1) {
    width: 70vw;
  }
`;
export const StyledView = styled.div`
  min-height: 100vh;
  display: flex;
  row-gap: 5px;
  column-gap: 5px;
  scroll-snap-align: center;
  /* min-width: 100%; */
  justify-content: center;
  align-items: center;
  @media (max-aspect-ratio: 1/1) {
    flex-direction: column;
    /* min-height: 100%; */
    /* min-width: auto; */
    padding: 40px 10px;
    min-height: 100svh;
    align-items: center;
    justify-content: center;
  }
`;
