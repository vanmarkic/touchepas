import * as React from 'react';
import styled, { css } from 'styled-components';
import GlobalStyle, { whenVerticalAspectRatio } from '../styles/global';
import { Head } from '../pages';
import { useLocation } from '@reach/router';
import RentCalculator from './RentCalculator';
import { HEADER_HEIGHT, Header } from './Header';
import { StaticImage } from 'gatsby-plugin-image';

export const StyledButtonBlue = styled.button`
  align-items: center;
  background-color: var(--blue);
  border: none;
  border-radius: var(--radius);
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 0.8rem;
  height: 58px;
  justify-content: center;
  line-height: 24px;
  width: 180px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  box-shadow: var(--shadow);
  text-transform: uppercase;
  font-weight: 700;
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
    border: solid 1px var(--blue);
    color: var(--dark-red);
  }
`;

const StyledLayout = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: calc(100vh - ${HEADER_HEIGHT});
`;

export const hideWhenVertical = css`
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    display: none;
  }
`;

export const hideWhenHorizontal = css`
  @media (min-aspect-ratio: 1/1) or (min-width: 768px) {
    display: none;
  }
`;

const SidePanel = styled.nav`
  width: 45vw;
  max-height: 100svh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 0px 48px 48px 48px;
  align-self: flex-start;
  margin-bottom: 30px;
  ${hideWhenVertical};
`;

const StyledMenuButton = styled(StyledButtonBlue)`
  position: fixed;
  bottom: 6px;
  right: 10px;
  size: 40px;
  z-index: 3;
  width: 150px;
  height: 2rem;
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
  display: flex;
  padding: 2rem;
`;

const Layout: React.FC<any> = ({ children, GoBackToTop }) => {
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
      <GlobalStyle />

      <Header GoBackToTop={GoBackToTop}/>

      <StyledMenuButton onClick={() => setShowMobileMenu((isShown) => !isShown)}>
        {showMobileMenu ? 'Fermer' : 'Calculateur'}
      </StyledMenuButton>
      <MobileMenuOverlay showMobileMenu={showMobileMenu}>
        <RentCalculator />
      </MobileMenuOverlay>

      <StyledLayout>
        <StyledMain>
          {children}
          <Footer>
            <StaticImage
              placeholder="none"
              width={100}
              alt="rwdh logo"
              src="../logo/partners/rwdh.svg"
            />
          </Footer>
        </StyledMain>
        <SidePanel>
          <RentCalculator />
        </SidePanel>
      </StyledLayout>
    </>
  );
};

export default Layout;
