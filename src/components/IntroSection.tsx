import * as React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';``

export const Description = styled.p`
  margin-top: 1rem;
  font-size: 18px !important;
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
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    /* justify-content: center; */
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;
export const navButtonsID = 'navButtonsID';
const IntroSection: React.FC<any> = ({ children, showRegionDialog }) => {
  return (
    <div id={navButtonsID} style={{ display: 'flex', justifyContent: 'center', marginTop:"50px" }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
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
        <Description>
        Vérifiez  l’indexation de votre loyer et défendez vos droits en tant que locataire ! 
        </Description>
       
      </div>
    </div>
  );
};

export default React.memo(IntroSection);
