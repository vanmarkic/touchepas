import React from 'react';
import { Regions } from '../formula/types-and-constants';
import styled from 'styled-components';
import ToggleButton from './ToggleButton';
import { StyleButton } from './NewsletterForm';
import { StyledH2 } from './bodyLayout';

const StyledRegionDialog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4vh;
  background-color: white;
  z-index: 5;
  bottom: 2;
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

      <ToggleButton onClick={handleToggle} />

      <StyleButton onClick={() => setShowRegionDialog(false)}>
        <h1>Go</h1>
      </StyleButton>
    </StyledRegionDialog>
  );
};
