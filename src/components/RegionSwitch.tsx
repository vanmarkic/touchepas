import React from 'react';
import { Regions } from '../formula/types-and-constants';
import styled from 'styled-components';
import ToggleButton from './ToggleButton';
import { StyleButton } from './NewsletterForm';

const StyledRegionDialog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  background-color: white;
  z-index: 5;
  bottom: 2;
`;

const StyledH2 = styled.h2`
  flex: 1;
  font-size: 1.1rem;
  font-weight: 200;
  padding-top: 20px;
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    font-size: 18px;
    text-align: center;
  }
`;
export const RegionSwitch: React.FC<{
  setRegion: (region: Regions) => void;
  handleRegionSwitch: (region: Regions) => void;
  setShowRegionDialog: (state: boolean) => void;
}> = ({ setRegion, handleRegionSwitch, setShowRegionDialog }) => {

  const handleToggle = (region: Regions) => {
    setRegion(region);
    handleRegionSwitch(region);
  };

  
  return (
    <StyledRegionDialog>
      <StyledH2>Où se situe le bien que je loue ?</StyledH2>

      <ToggleButton onClick={handleToggle}/>

      <StyleButton onClick={() => setShowRegionDialog(false)}>
        Go
      </StyleButton>

    </StyledRegionDialog>
  );
};
