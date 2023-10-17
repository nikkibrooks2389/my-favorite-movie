import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }


    *, *:before, *:after {
        box-sizing: border-box;
    }
  // Other global styles...
`;

export default GlobalStyle;