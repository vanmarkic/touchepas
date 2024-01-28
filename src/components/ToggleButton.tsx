import React, { useState } from 'react';
import styled from 'styled-components';
import { Regions } from '../formula/types-and-constants';
import * as Switch from '@radix-ui/react-switch';
import './ToggleButton.css';

interface ToggleButtonProps {
  onClick: (region: Regions) => void;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  column-gap: 10px;
`;

export const ButtonText = styled.button<{ active: boolean }>`
  text-align: left;
  z-index: 1000;
  border: none;
  box-shadow: none;
  color: ${(props) => (props.active ? 'var(--red)' : 'var(--blue)')};
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
`;

const ToggleButton: React.FC<ToggleButtonProps> = ({ onClick }) => {
  const [activeRegion, setActiveRegion] = useState<Regions>('brussels');

  const handleToggle = (region: Regions) => {
    setActiveRegion(region);
    onClick(region);
  };

  return (
    <Wrapper>
      <ButtonText active={activeRegion === 'brussels'} onClick={() => handleToggle('brussels')}>
        BRUXELLES
      </ButtonText>

      <Switch.Root
        checked={activeRegion === 'wallonia'}
        className="SwitchRoot"
        id="airplane-mode"
        onCheckedChange={(e) => handleToggle(e ? 'wallonia' : 'brussels')}
      >
        <Switch.Thumb className="SwitchThumb" />
      </Switch.Root>

      <ButtonText active={activeRegion === 'wallonia'} onClick={() => handleToggle('wallonia')}>
        WALLONIE
      </ButtonText>
    </Wrapper>
  );
};

export default ToggleButton;
