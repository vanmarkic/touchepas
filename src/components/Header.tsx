import * as React from 'react';
import styled from 'styled-components';
import { whenVerticalAspectRatio } from '../styles/global';
import { StaticImage } from 'gatsby-plugin-image';
import { heroSectionID } from '../pages';
import { NewsletterForm } from './NewsletterForm';
import { HideWhenVertical } from './layout';

export const HEADER_HEIGHT = '80px';

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  position: relative;
`;

const StyledHeader = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  column-gap: 0.5rem;
  top: 0px;
  background-color: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(5px);
  height: 80px;
  color: var(--blue);
  height: 80px;
  h4 {
    ${whenVerticalAspectRatio(`
      font-size: 1.2rem;
    `)};
  }
  img {
    max-height: 3rem;
  }
`;

const RedSpan = styled.span`
  color: var(--dark-red);
`;

const scrollToHeroSection = () => {
  const section = document.getElementById(heroSectionID);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

export const Header = () => {
  return (
    <StyledHeader>
      <FlexDiv onClick={scrollToHeroSection}>
        <TitleWithLogo />
      </FlexDiv>
      <HideWhenVertical>
        <NewsletterForm />
      </HideWhenVertical>
    </StyledHeader>
  );
};

export const TitleWithLogo = () => (
  <>
    <h4>
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
  </>
);
