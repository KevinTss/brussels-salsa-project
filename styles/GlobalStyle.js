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
    flex-direction: column;
  }
`;

export default GlobalStyle;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.title};
`;

export const TitleDescription = styled.p`
  color: ${({ theme }) => theme.color.text};
`;
