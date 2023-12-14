// create a sticky header

import * as React from 'react';
import styled from 'styled-components';
import Logo from '../logo/logo.png';

const StyledHeader = styled.div`
  padding: 0.7rem;
  display: flex;
  position: sticky;
  top: 0px;
  background-color: white;
  color: var(--blue);
`;

const RedSpan = styled.span`
  color: var(--red);
`;

export const Header = () => {
  return (
    <StyledHeader>
      <div style={{ width: '210px' }}>
        <h4>
          TOUCHE <RedSpan>PAS</RedSpan> À MON LOYER
        </h4>
      </div>
      <img alt="Logo" src={Logo} style={{ width: '65px', height: '65px' }} />
    </StyledHeader>
  );
};
