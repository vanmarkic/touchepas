import * as React from 'react';
import styled, { css } from 'styled-components';
import GlobalStyle from '../styles/global';
import RentCalculator from './RentCalculator';
import { HEADER_HEIGHT, Header } from './Header';
import calculator from '../images/calculator.svg';
import xmark from '../images/xmark.svg';
import { Regions } from '../formula/types-and-constants';
import IntroSection from '../components/IntroSection';
import { Footer } from './Footer';
import { RegionSwitch } from './RegionSwitch';
import { whenVerticalAspectRatio } from '../styles/global';
import { NavButtons } from './HeroSection';

export const StyledButtonBlue = styled.button`
  align-items: center;
  background-color: var(--blue);
  border: var(--blue) 1px solid;
  border-radius: var(--radius);
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 13px;
  height: 45px;
  justify-content: center;
  line-height: 20px;
  width: 180px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  box-shadow: var(--shadow);
  font-weight: 400;
  padding: 0px 20px;
  letter-spacing: 1.5px;
  transition: all 0.1s ease-in-out 0s;
  &:active {
    background-color: white;
    outline: 0;
    color: var(--dark-red);
    border: solid 1px var(--blue);
  }

  &:hover {
    background-color: white;
    outline: 0;
    border: solid 1px var(--red);
    color: var(--dark-red);
  }
`;

const StyledLayout = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: calc(100vh - 80px);

  ${whenVerticalAspectRatio(`
      height: 100vh;
    `)}
`;

export const hideWhenVertical = css`
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    display: none;
  }
`;

export const hideWhenHorizontal = css`
  @media (min-aspect-ratio: 1/1) or (min-width: 768px) {
    display: none;
    width: fit-content;
  }
`;

export const HideWhenHorizontal = styled.div`
  ${hideWhenHorizontal}
`;

export const HideWhenVertical = styled.div`
  ${hideWhenVertical}
`;

const SidePanel = styled.nav`
  width: 45vw;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  align-self: flex-start;
  ${hideWhenVertical};
`;

const StyledMenuButton = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 3;
  background-color: white;
  border: none;
  padding: 5px;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  box-shadow: 1px 1px 5px var(--blue);
  justify-content: center;
  align-items: center;
  display: flex;
  ${hideWhenHorizontal};
`;

const CalculatorMobileWrapper = styled.div<{ showMobileMenu: boolean }>`
  position: absolute;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.9);
  height: calc(100svh - ${HEADER_HEIGHT});
  display: ${(props) => (props.showMobileMenu ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100%;
`;

const StyledMain = styled.main<{ showRegionDialog: boolean }>`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  max-height: ${({ showRegionDialog }) => (showRegionDialog ? '100vh' : 'auto')};
  padding-left: 2svw;
  padding-right: 2svw;
  overflow: scroll;
  /* scroll-snap-type: y mandatory; */
  width: 100%;

  @media (min-aspect-ratio: 1/1) {
    width: 55vw;
  }
  h4 {
    font-size: 1.2rem;
  }
  p {
    font-size: 1rem;
  }
  ${whenVerticalAspectRatio(`
margin-top: 2vh;
    `)}
`;

const Layout: React.FC<any> = ({
  children,
  handleRegionSwitch,
  showCalculator,
  handleShowCalculator,
  region,
}) => {
  const [showRegionDialog, setShowRegionDialog] = React.useState(true);

  React.useEffect(() => {
    const documentHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', documentHeight);
    documentHeight();
  }, []);

  return (
    <>
      <GlobalStyle />
      <HideWhenVertical>
        <Header showRegionDialog={showRegionDialog} handleRegionSwitch={handleRegionSwitch} />
      </HideWhenVertical>
      <>
        <MobileCalculator
          showRegionDialog={showRegionDialog}
          handleShowCalculator={handleShowCalculator}
          showCalculator={showCalculator}
          region={region}
        />

        <StyledLayout>
          <StyledMain showRegionDialog={showRegionDialog}>
            <IntroSection showRegionDialog={showRegionDialog} />

            {showRegionDialog ? (
              <StyledRegionDialog>
                <RegionSwitch
                  handleRegionSwitch={handleRegionSwitch}
                  setShowRegionDialog={setShowRegionDialog}
                />
              </StyledRegionDialog>
            ) : (
              <>
                <StyledRegionDialog>
                  <NavButtons handleShowCalculator={handleShowCalculator} />
                </StyledRegionDialog>
                {children}
              </>
            )}
          </StyledMain>
          {showRegionDialog ? null : (
            <SidePanel>
              <RentCalculator region={region} />
            </SidePanel>
          )}
        </StyledLayout>
      </>
    </>
  );
};

export default Layout;

const StyledRegionDialog = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;

  z-index: 5;
  bottom: 2;
`;
const MobileCalculator: React.FC<any> = ({
  showRegionDialog,
  handleShowCalculator,
  showCalculator,
  region,
}) => {
  return (
    <>
      {showRegionDialog ? null : (
        <StyledMenuButton onClick={handleShowCalculator}>
          {showCalculator ? (
            <img style={{ width: '25px' }} src={xmark} alt="Fermer" />
          ) : (
            <img style={{ width: '25px' }} src={calculator} alt="Calculateur" />
          )}
        </StyledMenuButton>
      )}
      <CalculatorMobileWrapper showMobileMenu={showCalculator && !showRegionDialog}>
        <RentCalculator region={region} />
      </CalculatorMobileWrapper>
    </>
  );
};
