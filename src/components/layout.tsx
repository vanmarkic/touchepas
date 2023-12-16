import * as React from 'react';
import styled, { css } from 'styled-components';
import GlobalStyle, { whenVerticalAspectRatio } from '../styles/global';
import { Head } from '../pages';
import { useLocation } from '@reach/router';
import RentCalculator from './RentCalculator';
import { Header } from './Header';

const StyledLayout = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: calc(100vh - 60px);
`;

export const hideWhenVertical = css`
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    display: none;
  }
`;

export const hideWhenHorizontal = css`
  @media (min-aspect-ratio: 1/1) {
    display: none;
  }
`;

const SidePanel = styled.nav`
  width: 30vw;
  max-height: 100svh;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 48px;
  align-self: flex-start;
  margin-bottom: 30px;
  ${whenVerticalAspectRatio('display: none;')};
`;

const StyledMenuButton = styled.button`
  position: fixed;
  bottom: 6px;
  right: 10px;
  color: var(--black);
  size: 40px;
  border: 2px solid var(--black) !important;
  background-color: var(--red);
  width: 120px;
  z-index: 1000;
  font-size: 16px;
  font-family: 'Lexend' !important;
  cursor: pointer;
  ${hideWhenHorizontal}
`;

const MobileMenuOverlay = styled.div`
  position: absolute;
  z-index: 1500;
  background-color: rgba(255, 255, 255, 0.9);
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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

const Layout: React.FC<any> = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const { pathname } = useLocation();

  const currentRoom = pathname.split('/');
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
      <Head />
      <GlobalStyle />

      <StyledMenuButton onClick={() => setShowMobileMenu(true)}> Calculateur </StyledMenuButton>
      {showMobileMenu ? (
        <MobileMenuOverlay>
          <RentCalculator />
          <StyledMenuButton onClick={() => setShowMobileMenu(false)}>Fermer</StyledMenuButton>
        </MobileMenuOverlay>
      ) : null}

      <Header />

      <StyledLayout>
        <StyledMain>{children}</StyledMain>
        <SidePanel>
          <RentCalculator />
        </SidePanel>
      </StyledLayout>
    </>
  );
};

export default Layout;
