// create a sticky header

import * as React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  padding: 0.5rem;
  display: flex;
  position: sticky;
  top: 0px;
  height: 60px;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <h4>TOUCHE PAS À MON LOYER</h4>
    </StyledHeader>
  );
};
