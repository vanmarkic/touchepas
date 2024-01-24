import React , {useState }from 'react';
import styled from 'styled-components';
import { Regions } from '../formula/types-and-constants';

interface ToggleButtonProps {
  onClick: (region: Regions)  => void; 
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const Button = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
  height:25px;
  border: none;
  border-radius: 25px;
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
  font-size:18px;
`;

export const Circle = styled.button<{ active: boolean }>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border:none;
  text-align: right;
  z-index: 1000;
  box-shadow: ${(props) => (props.active ? "2px 1px 1px black" : 'none')};
  background-color: ${(props) => (props.active ? 'white' : 'transparent')};
`;



const ToggleButton: React.FC<ToggleButtonProps> = ({ onClick,  }) => {

  const [activeRegion, setActiveRegion] = useState("brussels");

  const handleToggle = (region: Regions)  => {
    setActiveRegion(region);
    onClick(region);
  };

  return (
    <Wrapper>
      <ButtonText
        active={activeRegion === "brussels"}
        onClick={() => handleToggle("brussels")}
      >
        BRUXELLES
      </ButtonText>
      <Button active={activeRegion === "wallonia"}>
      <Circle active={activeRegion === "brussels"}/>
        <Circle active={activeRegion === "wallonia"}/>
      </Button>
     
      <ButtonText
        active={activeRegion === "wallonia"}
        onClick={() => handleToggle("wallonia")}
      >
        WALLONIE
      </ButtonText>
    </Wrapper>
  );
};

export default ToggleButton;
