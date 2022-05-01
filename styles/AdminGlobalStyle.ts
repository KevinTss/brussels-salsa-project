import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    width: 100vw;
    height: 100vh;
  }
  body, #__next {
    width: 100%;
    height: 100%;
  }
  #__next {
    display: flex;
  }
`;

export default GlobalStyle;
