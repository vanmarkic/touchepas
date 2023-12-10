import * as React from 'react';
import styled, { css } from 'styled-components';
import GlobalStyle, { whenVertivalAspectRatio } from '../styles/global';
import { Head } from '../pages';
import { useLocation } from '@reach/router';
import RentCalculator from './RentCalculator';
// import { Reset } from 'styled-reset';
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
  @media (max-aspect-ratio: 1/1) {
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
  row-gap: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  padding: 48px;
  align-self: flex-end;
  margin-bottom: 30px;
  ${whenVertivalAspectRatio('display: none;')};
`;

const StyledMenuButton = styled.button`
  position: fixed;
  bottom: 6px;
  right: 10px;
  color: #191919;
  size: 40px;
  border: 3px solid #191919 !important;
  border-radius: 5px !important;
  background-color: white !important;
  width: 100px;
  z-index: 1000;
  font-weight: bold;
  font-size: 16px;
  font-family: 'Lexend Bold' !important;
  cursor: pointer;
  ${hideWhenHorizontal}
`;
const CategoryHeader = styled.h4`
  position: fixed;
  top: 7px;
  left: 10px;
  color: #191919;
  font-size: 24px;
  z-index: 1001;
  ${hideWhenHorizontal}
`;

const MobileMenuOverlay = styled.div`
  position: absolute;
  z-index: 1500;
  background-color: white;
  height: 100svh;
  padding: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-width: 100%;
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
      {/* <Reset /> */}
      <GlobalStyle />
      {/* <StyledMenuButton onClick={() => setShowMobileMenu(true)}> MENU </StyledMenuButton> */}
      <CategoryHeader> {currentRoom[currentRoom.length - 2].toUpperCase()} </CategoryHeader>
      {showMobileMenu ? (
        <MobileMenuOverlay onClick={() => setShowMobileMenu(false)}>
          <StyledMenuButton onClick={() => setShowMobileMenu(false)}>CLOSE</StyledMenuButton>
        </MobileMenuOverlay>
      ) : null}
      <Header />
      <StyledLayout>
        {children}
        <SidePanel>
          <RentCalculator />
        </SidePanel>
      </StyledLayout>
    </>
  );
};

export default Layout;
