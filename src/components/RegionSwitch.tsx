import React from 'react';
import { Regions } from '../formula/types-and-constants';
import styled from 'styled-components';
import ToggleButton from './ToggleButton';
import { StyleButton } from './NewsletterForm';
import { StyledH2 } from './bodyLayout';
import { Description } from './IntroSection';

export const RegionSwitch: React.FC<{
  handleRegionSwitch: (region: Regions) => void;
  setShowRegionDialog: (state: boolean) => void;
}> = ({ handleRegionSwitch, setShowRegionDialog }) => {
  const handleToggle = (region: Regions) => {
    handleRegionSwitch(region);
  };

  return (
    <>
   
      <p style={{ fontSize: 'small' }}>Où se situe le bien que je loue ?</p>

      <ToggleButton onClick={handleToggle} />

      <StyleButton style={{ marginTop: '2rem' }} onClick={() => setShowRegionDialog(false)}>
        <h1>Go</h1>
      </StyleButton>
    </>
  );
};
