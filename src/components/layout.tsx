import * as React from 'react';
import styled, { css } from 'styled-components';
import GlobalStyle from '../styles/global';
import RentCalculator from './RentCalculator';
import { HEADER_HEIGHT, Header } from './Header';
import calculator from '../images/calculator.svg';
import xmark from '../images/xmark.svg';
import { Regions } from '../formula/types-and-constants';
import { IntroSection } from '../components/IntroSection';
import { Footer } from './Footer';
import { RegionSwitch } from './RegionSwitch';

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

const StyledMenuButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 3;
  background-color: white;
  border: none;
  padding: 5px;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  box-shadow: 1px 1px 5px var(--blue);

  ${hideWhenHorizontal};
`;

const MobileMenuOverlay = styled.div<{ showMobileMenu: boolean }>`
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
    width: 70vw;
  }
  h4 {
    font-size: 1.2rem;
  }
  p {
    font-size: 1rem;
  }
`;



const Layout: React.FC<any> = ({
  children,
  handleRegionSwitch,
  showCalculator,
  handleShowCalculator,
}) => {
  const [showRegionDialog, setShowRegionDialog] = React.useState(true);
  const [region, setRegion] = React.useState<Regions>('wallonia');

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
      <Header showRegionDialog={showRegionDialog} />
      <>
        {showRegionDialog ? null : (
          <StyledMenuButton onClick={handleShowCalculator}>
            {showCalculator ? (
              <img style={{ width: '25px' }} src={xmark} alt="Closed" />
            ) : (
              <img style={{ width: '25px' }} src={calculator} alt="Calculateur" />
            )}
          </StyledMenuButton>
        )}
        <MobileMenuOverlay showMobileMenu={showCalculator && !showRegionDialog}>
          <RentCalculator region={region} />
        </MobileMenuOverlay>
        <StyledLayout>
          <StyledMain showRegionDialog={showRegionDialog}>
            <IntroSection />
            {showRegionDialog ? (
              <RegionSwitch
                handleRegionSwitch={handleRegionSwitch}
                setRegion={setRegion}
                setShowRegionDialog={setShowRegionDialog}
              />
            ) : (
              <>
                {children}
                <Footer />
              </>
            )}
          </StyledMain>
          {!showRegionDialog ? (
            <SidePanel>
              <RentCalculator region={region} />
            </SidePanel>
          ) : null}
        </StyledLayout>
      </>
    </>
  );
};

export default Layout;

