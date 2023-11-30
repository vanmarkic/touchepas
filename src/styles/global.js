import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

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

  .image {
    /* min-width: 200px; */
    /* flex: 0 0 calc(50%-10px); */
    @media (min-aspect-ratio: 1/1) {
      /* flex: 0 0 calc(50%-10px); */
      max-width: 50% ;
    } 


  }
`;

export default GlobalStyle;
