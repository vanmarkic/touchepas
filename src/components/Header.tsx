// create a sticky header

import * as React from 'react';
import styled from 'styled-components';
import { whenVerticalAspectRatio } from '../styles/global';
import { StaticImage } from 'gatsby-plugin-image';
import { heroSectionID } from '../pages';

export const HEADER_HEIGHT = '80px';

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledHeader = styled.div`
  padding: 1rem;
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  column-gap: 0.5rem;
  top: 0px;
  background-color: rgba(255, 255, 255, 0.7)!important; 
  backdrop-filter: blur(5px); 
  height:80px;
  color: var(--blue);
  height: fit-content;
  h4 {
    ${whenVerticalAspectRatio(`
      font-size: 1.2rem;
    `)};
  }
  img {
    max-height: 3rem;
  }
`;

const StyledH6 = styled.h6`
  padding-right: 5px;
  display: flex;
  width: fit-content;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  color: var(--blue);
  height: fit-content;
  font-size: 0.9rem;

  ${whenVerticalAspectRatio(`
     display:none
    `)};
`;
const RedSpan = styled.span`
  color: var(--dark-red);
`;

const Img = styled.img``;

const scrollToHeroSection = () => {
  const section = document.getElementById(heroSectionID);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

export const Header = () => {
  return (
    
      <StyledHeader>
        <FlexDiv>
          <h4 onClick={scrollToHeroSection}>
            TOUCHE <RedSpan> PAS </RedSpan> <br />À MON LOYER
          </h4>
          <StaticImage
            alt="logo"
            placeholder="blurred"
            layout="constrained"
            width={35}
            src={'../logo/logo.png'}
            loading="eager"
          />
        </FlexDiv>
        <FlexDiv>
          <StyledH6>Inscrivez-vous à la newsletter</StyledH6>
          <StaticImage
            alt="letter"
            layout="constrained"
            width={35}
            src={'../images/envelope.svg'}
            loading="eager"
          />
        </FlexDiv>
      </StyledHeader>
    
  );
};
