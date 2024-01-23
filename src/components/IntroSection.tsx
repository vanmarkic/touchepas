import * as React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

const StyledH2 = styled.h2`
  flex: 1;
  font-size: 1.1rem;
  font-weight: 200;
  width: fit-content;
  padding-top: 20px;
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    font-size: 18px;
    text-align: center;
  }
`;
const BigTitle = styled.div`
  font-size: 4vw;
  font-weight: 700;
  color: var(--blue);
  width: fit-content;
  display: inline;
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    font-size: 8vw;
  }
  span {
    color: var(--dark-red);
  }
`;
const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  row-gap: 20px;
  /* width: 100%; */
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;
export const IntroSection: React.FC<any> = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div
      style={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <FlexDiv>
        <BigTitle>
          TOUCHE <span> PAS </span>À MON LOYER
        </BigTitle>
        <StaticImage
          alt="a building with apartments"
          placeholder="none"
          layout="constrained"
          src={'../logo/favicon/android-chrome-512x512.png'}
          loading="eager"
          className="logo"
        />
      </FlexDiv>
      <StyledH2>
        Touche pas à mon loyer est une plateforme de calcul d’indexation de loyer engagée dans la
        défense des droits des locataires.
      </StyledH2>
    </div>
  </div>
);