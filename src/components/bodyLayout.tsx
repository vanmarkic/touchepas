import styled from 'styled-components';
import { whenVerticalAspectRatio } from '../styles/global';


export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
  min-height: calc(100vh - 80px);
`;

export const StyledSection2 = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: start;
  align-items: center;
  min-height: fit-content
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
  text-align: left;
`;

export const Image = styled.div`
  width: 100%;
  background-image: url('../images/logements.jpg');
  padding: 10px;
`;
