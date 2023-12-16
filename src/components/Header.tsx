// create a sticky header

import * as React from 'react';
import styled from 'styled-components';
import Logo from '../logo/logo.png';
import { whenVerticalAspectRatio } from '../styles/global';

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
`;

const RedSpan = styled.span`
  color: var(--red);
`;

const Img = styled.img``;

export const Header = () => {
  return (
    <StyledHeader>
      <h4>
        TOUCHE <RedSpan> PAS </RedSpan> À MON LOYER
      </h4>
      <img alt="Logo" src={Logo} />
    </StyledHeader>
  );
};
