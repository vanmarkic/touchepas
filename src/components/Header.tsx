// create a sticky header

import * as React from 'react';
import styled from 'styled-components';
import { whenVerticalAspectRatio } from '../styles/global';
import { StaticImage } from 'gatsby-plugin-image';
import { heroSectionID } from '../pages';

export const HEADER_HEIGHT = '70px';
const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledHeader = styled.div`
  padding: 0.7rem;
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  column-gap: 0.5rem;
  top: 0px;
  background-color: white;
  color: var(--blue);
  height: fit-content;
  h4 {
    ${whenVerticalAspectRatio(`
      font-size: 1rem;
    `)};
  }
  img {
    max-height: 3rem;
  }
  height: ${HEADER_HEIGHT};
`;

const StyledH6 = styled.h6`
  padding-right: 5px;
  display: flex;
  width: 113px;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  color: var(--blue);
  height: fit-content;
  font-size: 14px;
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
        <h4 style={{ cursor: 'pointer' }} onClick={scrollToHeroSection}>
          TOUCHE <RedSpan> PAS </RedSpan> À MON LOYER
        </h4>
        <StaticImage
          alt="logo"
          placeholder="blurred"
          layout="constrained"
          width={50}
          src={'../logo/logo.png'}
          loading="eager"
        />
      </FlexDiv>
      <FlexDiv>
        <StyledH6>Inscrivez-vous à la newsletter</StyledH6>
        <StaticImage
          alt="letter"
          layout="constrained"
          height={80}
          src={'../images/envelope.svg'}
          loading="eager"
        />
      </FlexDiv>
    </StyledHeader>
  );
};
