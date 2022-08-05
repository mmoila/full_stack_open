import { createGlobalStyle } from "styled-components";

export const GlobalFont = createGlobalStyle`
  
  body {
    font-family: 'Lato', sans-serif;
  }

  @media only screen and (max-width: 420px) {
    body {
      font-size: 10px;
    }
  }
`