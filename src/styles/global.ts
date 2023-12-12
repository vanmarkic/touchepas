import { createGlobalStyle, css } from "styled-components";

export const px2vw = (size: number, width = 1440) => `${(size / width) * 100}vw`;


export const whenVertivalAspectRatio = (cssRules: string) => css`
  @media (max-aspect-ratio: 1/1) {
    ${cssRules}
  }
`;

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
      --doc-height: 100%;
      font-size: ${px2vw(10, 360)};

      @media (min-width: 768px) {
        font-size: ${px2vw(12, 768)};
      }

      @media (min-width: 1024px) {
        font-size: ${px2vw(14, 1024)};
      }
    }
  html,
  body {
    --blue: #150d63;
    --red: #E04843;
    --black: #010101;
    font-family: "Lexend";
    padding: 0;
    margin: 0;
    height: 100vh; /* fallback for Js load */
    height: var(--doc-height);
    overscroll-behavior: none; 
    color: var(--black);
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: .7rem;
    height: 100%;
    label {
      font-size: .8rem;
      height: 1rem;
      height: fit-content;
      margin: 0;
      display: flex;
      flex-direction: column;
    }
    input, select {
      font-family: "Lexend";
      /* height: 1rem; */
      padding: 0.2rem;
      width: 200px;
    }
    button {
      font-family: "Lexend" !important;
      height: 1rem;
      font-size: .7rem;
      padding: 0.2rem;
      height: fit-content;
      cursor: pointer;
    }
  }
`;

export default GlobalStyle;
