import { createGlobalStyle } from 'styles/styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Nunito', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: .75rem;
  }

  body.fontLoaded {
    font-family: 'Nunito', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #f1f1f1;
    min-height: 100%;
    min-width: 100%;
    padding-bottom: 60px;
  }

  p,
  label {
    font-family: 'Nunito', Georgia, Times, 'Times New Roman', sans-serif;
    line-height: 1.5em;
  }

  .container {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }

  .container.nopadding{
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  a {
    text-decoration: none;
  }
  .error {
    color: red;
    padding-left: 10px
  }
`;

export default GlobalStyle;
