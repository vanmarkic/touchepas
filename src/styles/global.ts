import { createGlobalStyle, css } from "styled-components";

export const px2vw = (size: number, width = 1440) => `${(size / width) * 100}vw`;

export const whenVerticalAspectRatio = (cssRules: string) => css`
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
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
    --red:#E04843;  
    --dark-red:#af211d;
    --black: #010101;
    --white: #fefefe;
    --radius: 3px;
    --shadow: 0 1px 1px hsl(0deg 0% 0% / 0.1),
              0 2px 2px hsl(0deg 0% 0% / 0.2),
              0 4px 4px hsl(0deg 0% 0% / 0.1),
              0 6px 6px hsl(0deg 0% 0% / 0.1),
              0 12px 12px hsl(0deg 0% 0% / 0.1);
    font-family: "Lexend";
    padding: 0;
    margin: 0;
    height: 100vh; /* fallback for Js load */
    height: var(--doc-height);
    overscroll-behavior: none; 
    color: var(--black);
  }
  h4 {
    font-family: "Lexend" !important;
    font-size: 1.4rem;
    cursor: default;
    color: var(--blue);
    text-transform:uppercase;
  }
  button {
    font-family: "Lexend" !important;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: .7rem;
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
      font-size: 1rem;
      padding: 0.2rem;
      width: 200px;
      color: var(--black);
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
