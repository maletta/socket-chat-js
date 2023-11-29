import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Inter', sans-serif;
  } 

  html {
    width: 100%;
    height: 100%;
    font-size: 16px; 
    background-color: #1e1e1e ; // black dark
  }

  :root{
    font-size: 62.5%; /** 1rem = 10px*/
  }


`;

export default GlobalStyle;
