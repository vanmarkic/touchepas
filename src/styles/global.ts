import { createGlobalStyle, css } from 'styled-components';

export const px2vw = (size: number, width = 1440) => `${(size / width) * 100}vw`;

export const whenVerticalAspectRatio = (cssRules: string) => css`
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    ${cssRules}
  }
`;

export const GlobalStyle = createGlobalStyle`

@import '@radix-ui/colors/black-alpha.css';
@import '@radix-ui/colors/mauve.css';
@import '@radix-ui/colors/violet.css';
.scrolled {
    height: 40px  !important;
    overflow:hidden !important;
    background-color:red !important;

  }
.AccordionItem {
  overflow: hidden;
  margin-top: 1px;
}

.AccordionItem:focus-within {
  position: relative;
  z-index: 1;
}

.AccordionHeader {
  display: flex;
  box-shadow:none;
  border:none;
 
}

.AccordionTrigger {
  width: 100%;
  background-color: transparent;
  display: flex;
  align-items:center;
  justify-content: center;
  color: var(--blue);
  background-color: white;
  box-shadow:none;
  border:none;
  font-family: "Lexend" !important;
  font-size: 0.8rem;
  color: var(--blue);
  text-align: center;
  
}

.AccordionTrigger:hover {
 text-decoration:underline

}

.AccordionContent {
  overflow: hidden;
  color: var(--blue);
 

}
.AccordionContent[data-state='open'] {
  animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
}
.AccordionContent[data-state='closed'] {
  animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
}

.AccordionContentText {
  padding: 15px 0px;
}


.AccordionTrigger[data-state='open'] >

.AccordionChevron {
  transform: rotate(180deg);
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}



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
    font-size: larger;
    color: var(--blue);
    text-transform:uppercase;
  }
  h5 {
    font-family: "Lexend" !important;
    font-size: 1rem;

  }img
{object-fit:contain !important;}
  button {
    font-family: "Lexend" !important;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
 width:90%;
  gap: 10px;

  }
  .logo {
   height:fit-content;
    height:12vw !important;
 width:12vw !important;
 @media (max-aspect-ratio: 1/1) and (max-width: 759px) {
  width:20vw !important;
height:20vw !important;
  }
  }
  

   
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
   
`;

export default GlobalStyle;
