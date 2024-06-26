import React, { useState } from 'react';
import styled from 'styled-components';
import { Regions } from '../formula/types-and-constants';
import * as Switch from '@radix-ui/react-switch';
import './ToggleButton.css';

interface ToggleButtonProps {
  setActiveRegion: (region: Regions) => void;
  activeRegion: Extract<Regions, 'brussels' | 'wallonia'>;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 30px;
  background-color: var(--red);
  box-shadow: inset 1px 1px 1px black;
`;

export const ButtonText = styled.button<{ color: string }>`
  text-align: left;
  /* z-index: 1000; */
  border: none;
  box-shadow: none;
  color: ${({ color }) => color};
  background-color: transparent;
  font-size: 1rem;
  margin: 0 0.8rem;
`;

const ToggleButton: React.FC<ToggleButtonProps> = ({ setActiveRegion, activeRegion }) => {
  const handleToggle = (region: Regions) => {
    setActiveRegion(region);
  };

  return (
    <Wrapper>
      <ButtonText color="var(--blue)" onClick={() => handleToggle('brussels')}>
        BRUXELLES
      </ButtonText>

      <Switch.Root
        checked={activeRegion === 'wallonia'}
        className="SwitchRoot"
        onCheckedChange={(e) => handleToggle(e ? 'wallonia' : 'brussels')}
      >
        <Switch.Thumb className="SwitchThumb" />
      </Switch.Root>

      <ButtonText color="var(--dark-red)" onClick={() => handleToggle('wallonia')}>
        WALLONIE
      </ButtonText>
    </Wrapper>
  );
};

export default ToggleButton;
