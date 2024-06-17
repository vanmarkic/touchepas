import * as React from 'react';
import styled from 'styled-components';
import { StyledSection } from '../components/bodyLayout';
import { StyledButtonBlue, HideWhenHorizontal } from '../components/layout';
import { NewsletterForm } from './NewsletterForm';
import { Description } from './IntroSection';

const ButtonsGroup = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 3rem 0rem;
  flex-wrap: wrap;
`;

export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

export const NavButtons: React.FC<any> = ({ handleShowCalculator, children }) => (
  <div>
    <Description>
      Chaque année, votre propriétaire peut réviser votre loyer à la hausse en indexant celui-ci.
      C'est son droit mais il ne peut pas le faire à n'importe quelles conditions. Le site « Touche
      pas à mon loyer » vous aide à vérifier facilement si le nouveau loyer demandé par votre
      propriétaire est conforme à la règlementation et vous informe sur vos droits en tant que
      locataire.
    </Description>
    <StyledSection>
      <ButtonsGroup>
        <HideWhenHorizontal>
          <StyledButtonBlue onClick={handleShowCalculator}>
            Calculateur d'indexation
          </StyledButtonBlue>
        </HideWhenHorizontal>
        <StyledButtonBlue onClick={() => scrollToSection('informations')}>
          Mes droits
        </StyledButtonBlue>
        <StyledButtonBlue onClick={() => scrollToSection('news')}>Actualités</StyledButtonBlue>
      </ButtonsGroup>

      <HideWhenHorizontal>
        <NewsletterForm>Tenez-moi au courant de l'actualité !</NewsletterForm>
        {children}
      </HideWhenHorizontal>
    </StyledSection>
  </div>
);
