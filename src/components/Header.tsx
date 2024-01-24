import * as React from 'react';
import styled from 'styled-components';
import { whenVerticalAspectRatio } from '../styles/global';
import { StaticImage } from 'gatsby-plugin-image';
import { NewsletterForm } from './NewsletterForm';
import { HideWhenVertical } from './layout';
import ToggleButton from './ToggleButton';
import { navButtonsID } from './HeroSection';

export const HEADER_HEIGHT = '80px';

const FlexDiv = styled.div<{ showRegionDialog: boolean }>`
  display: flex;
  visibility: ${({ showRegionDialog }) => (showRegionDialog ? 'hidden' : 'visbile')};
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  position: relative;
`;

const ToggleButtonContainer = styled.div<{ showRegionDialog: boolean }>`
  visibility: ${({ showRegionDialog }) => (showRegionDialog ? 'hidden' : 'visbile')};
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    display: none;
  }
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
  const section = document.getElementById(navButtonsID);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

export const Header = ({ showRegionDialog }: { showRegionDialog: boolean }) => {
  const handleToggle = () => {};
  return (
    <StyledHeader>
      <FlexDiv showRegionDialog={showRegionDialog} onClick={scrollToHeroSection}>
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
      </FlexDiv>

      <ToggleButtonContainer showRegionDialog={showRegionDialog}>
        <ToggleButton onClick={handleToggle} />
      </ToggleButtonContainer>

      <HideWhenVertical>
        <NewsletterForm />
      </HideWhenVertical>
    </StyledHeader>
  );
};
