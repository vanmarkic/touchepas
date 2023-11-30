import { createGlobalStyle } from "styled-components";

export const px2vw = (size, width = 1440) => `${(size / width) * 100}vw`;

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
      --doc-height: 100%;
      font-size: ${px2vw(24)};

      @media (min-width: 768px) {
        font-size: ${px2vw(30)};
      }

      @media (min-width: 1024px) {
        font-size: ${px2vw(36)};
      }
    }
  html,
  body {
    font-family: "Architects Daughter";
    padding: 0;
    margin: 0;
    height: 100vh; /* fallback for Js load */
    height: var(--doc-height);
    overscroll-behavior: none; 
  }

  }
`;

export default GlobalStyle;
