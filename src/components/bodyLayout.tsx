import styled from 'styled-components';
import { whenVerticalAspectRatio } from '../styles/global';

export const StyledSection = styled.div`
  display: flex;
  row-gap: 5px;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 0px 10px 40px 10px;
  @media (max-aspect-ratio: 1/1) {
    flex-direction: column;
    /* min-height: 100svh; */
    align-items: center;
    justify-content: center;
  }
`;

export const TwoColumns = styled.div`
  width: 100%;
  column-gap: 2rem;
  columns: 2;
  font-size: 18px;
  padding: 10px;
  ${whenVerticalAspectRatio('columns: 1;')};
`;

export const Paragraph = styled.div`
  margin-bottom: 2rem;
`;

export const Image = styled.div`
  width: 100%;
  background-image: url('../images/logements.jpg');
  padding: 10px ;
`;
