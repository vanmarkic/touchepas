// create a sticky header

import * as React from 'react';
import styled from 'styled-components';
import { whenVerticalAspectRatio } from '../styles/global';
import { StaticImage } from 'gatsby-plugin-image';
import { heroSectionID } from '../pages';

export const HEADER_HEIGHT = '70px';

const StyledHeader = styled.div`
  padding: 0.7rem;
  display: flex;
  position: sticky;
  align-items: center;
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
    </StyledHeader>
  );
};
