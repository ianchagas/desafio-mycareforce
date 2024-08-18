import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { DefaultColors } from "./styles/defaultColors";
import Routes from "./routes";
import useToken from "./hooks/useToken";

const App: React.FC = () => {
  useToken();

  return (
    <ThemeProvider theme={DefaultColors}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
