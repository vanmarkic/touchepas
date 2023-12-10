// create a sticky header

import * as React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  padding: 0.5rem;
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
      <h4>
        TOUCHE <RedSpan>PAS</RedSpan> À MON LOYER
      </h4>
    </StyledHeader>
  );
};
