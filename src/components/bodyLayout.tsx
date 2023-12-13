import styled from 'styled-components';

export const StyledCategory = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2svw;
  padding-right: 2svw;
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

export const TextBlock = styled.div`
 

  row-gap: 5px;
  column-count: 2px;
  width: 100%;
  column-gap: 5px;
 
  scroll-snap-align: center;
  /* min-width: 100%; */
  
  columns: 2; 
  font-size: 18px;
  text-align: justify;
  padding: 10px;
  @media (max-aspect-ratio: 1/1) {
    flex-direction: column;
    /* min-height: 100%; */
    /* min-width: auto; */
    padding: 40px 10px;
    min-height: calc(100svh - 60px);
    align-items: center;
    justify-content: center;
    text-align: justify;
  }
`;

export const Image = styled.div`
  height: 80vh;
  width: 100%;
  background-image: url('../images/logements.jpg');
  padding: 10px;
`;
