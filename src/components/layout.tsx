import * as React from 'react';
import styled, { css } from 'styled-components';
import GlobalStyle, { whenVerticalAspectRatio } from '../styles/global';
import { useLocation } from '@reach/router';
import RentCalculator from './RentCalculator';
import { HEADER_HEIGHT, Header } from './Header';
import { StaticImage } from 'gatsby-plugin-image';
import calculator from '../images/calculator.svg';
import xmark from '../images/xmark.svg';
import { Regions } from '../formula/types-and-constants';
import { IntroSection } from '../pages/index';

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

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
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

const Footer = styled.footer`
  width: 100%;
  display: flex;
  padding: 2rem;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 60px;
`;

const RegionDialog = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  width: 100vw;
  background-color: white;
  z-index: 5;
`;
const StyledH2 = styled.h2`
  flex: 1;
  font-size: 1.1rem;
  font-weight: 200;
  padding-top: 20px;
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    font-size: 18px;
    text-align:center;
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
      <Header />
      {showRegionDialog ? (
        <RegionDialog>
           <IntroSection/>
          <StyledH2>Où se situe le bien que je loue ?</StyledH2>
          <StyledButtonBlue
            onClick={() => {
              setRegion('wallonia');
              handleRegionSwitch('wallonia');
              setShowRegionDialog(false);
            }}
          >
            <span>Wallonie</span>
          </StyledButtonBlue>
          <StyledButtonBlue
            onClick={() => {
              setRegion('brussels');
              handleRegionSwitch('brussels');
              setShowRegionDialog(false);
            }}
          >
            <span>Bruxelles</span>
          </StyledButtonBlue>
         
        </RegionDialog>
      ) : (
        <>
          <StyledMenuButton onClick={handleShowCalculator}>
            {showCalculator ? (
              <img style={{ width: '25px' }} src={xmark} alt="Closed" />
            ) : (
              <img style={{ width: '25px' }} src={calculator} alt="Calculateur" />
            )}
          </StyledMenuButton>
          <MobileMenuOverlay showMobileMenu={showCalculator}>
            <RentCalculator region={region} />
          </MobileMenuOverlay>
          <StyledLayout>
            <StyledMain>
              {children}
              <Footer>
                <StaticImage
                  placeholder="none"
                  height={40}
                  alt="rwdh logo"
                  src="../logo/partners/rwdh.svg"
                />
                <StaticImage
                  placeholder="none"
                  height={40}
                  alt="csc logo"
                  src="../logo/partners/csc.png"
                />
                <StaticImage
                  placeholder="none"
                  height={40}
                  alt="csc logo"
                  src="../logo/partners/moc.png"
                />
                <StaticImage
                  placeholder="none"
                  height={40}
                  alt="csc logo"
                  src="../logo/partners/rapel.png"
                />
                <StaticImage
                  placeholder="none"
                  height={40}
                  alt="csc logo"
                  src="../logo/partners/solidaris.png"
                />
              </Footer>
            </StyledMain>
            <SidePanel>
              <RentCalculator region={region} />
            </SidePanel>
          </StyledLayout>
        </>
      )}
    </>
  );
};

export default Layout;
