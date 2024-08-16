import React from "react";
// import SignIn from "./pages/SignIn/index";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { DefaultColors } from "./styles/defaultColors";
import Routes from "./routes";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={DefaultColors}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
