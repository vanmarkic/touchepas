import styled from 'styled-components';
import { whenVerticalAspectRatio } from '../styles/global';

export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-evenly;
  align-items: center;

  ${whenVerticalAspectRatio(`
     justify-content:flex-start;
     gap:8%;
      height: calc(100vh - 80px);
  
    `)};
`;

export const StyledSection2 = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: start;
  align-items: center;
  height: fit-content;
`;

export const SectionTitle = styled.h4`
  text-align: left;
  margin: 60px 0px 20px 0px;
`;

export const TwoColumns = styled.div`
  /* width: 100%;
  font-size: 18px;
  padding: 10px 0px; */
`;

export const Paragraph = styled.div`
  margin-bottom: 2rem;
  text-align: left !important;
`;

export const Image = styled.div`
  width: 100%;
  background-image: url('../images/logements.jpg');
  padding: 10px;
`;

export const StyledH2 = styled.h2`
  flex: 1;
  font-size: 1.1rem;
  font-weight: 200;
  padding-top: 20px;
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    font-size: 18px;
    text-align: center;
  }
`;
