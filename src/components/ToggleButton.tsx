import React, { useState } from 'react';
import styled from 'styled-components';
import { Regions } from '../formula/types-and-constants';
import * as Switch from '@radix-ui/react-switch';
import './ToggleButton.css';

interface ToggleButtonProps {
  onClick: (region: Regions)  => void; 
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
  height:30px;
  border: none;
  border-radius: 30px;
  background-color:var(--red);
  box-shadow:inset 1px 1px 1px black;
`;

export const ButtonText = styled.button<{ active: boolean }>`
  text-align: left;
  z-index: 1000;
  border:none;
  box-shadow:none;
  color: ${(props) => (props.active ? "var(--red)" : 'var(--blue)')};
  background-color: white;
  font-size:20px;
`;

export const Circle = styled.button<{ active: boolean }>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: none;
  text-align: right;
  z-index: 1000;
  box-shadow: ${(props) => (props.active ? '2px 1px 1px black' : 'none')};
  background-color: ${(props) => (props.active ? 'white' : 'transparent')};
`;

const ToggleButton: React.FC<ToggleButtonProps> = ({ onClick }) => {
  const [activeRegion, setActiveRegion] = useState<Regions>('brussels');

  const handleToggle = (region: Regions) => {
    setActiveRegion(region);
    onClick(region);
  };

  return (
    <Wrapper>
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
      </div>
    </Wrapper>
  );
};

export default ToggleButton;
