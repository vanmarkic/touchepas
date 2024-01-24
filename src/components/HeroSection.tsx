import * as React from 'react';
import styled from 'styled-components';
import { StyledSection } from '../components/bodyLayout';
import { StyledButtonBlue, HideWhenHorizontal } from '../components/layout';
import { NewsletterForm } from './NewsletterForm';

const ButtonsGroup = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 0px;
  flex-wrap: wrap;
`;

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

export const navButtonsID = 'navButtonsID';

export const NavButtons: React.FC<any> = ({ handleShowCalculator }) => (
  <StyledSection id={navButtonsID}>
    <ButtonsGroup>
      <HideWhenHorizontal>
        <StyledButtonBlue onClick={handleShowCalculator}>Calculateur d'indexation</StyledButtonBlue>
      </HideWhenHorizontal>
      <StyledButtonBlue onClick={() => scrollToSection('informations')}>
        Infos utiles
      </StyledButtonBlue>
      <StyledButtonBlue onClick={() => scrollToSection('news')}>Actualités</StyledButtonBlue>
    </ButtonsGroup>

    <HideWhenHorizontal>
      <NewsletterForm />
    </HideWhenHorizontal>
  </StyledSection>
);
