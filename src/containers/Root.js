import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import CreateGlobalStyles from "../CreateGlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "../constants/theme";

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CreateGlobalStyles />
        <div>
          <h1>Hello, Root Component </h1>
        </div>
      </ThemeProvider>
    </Provider>
  );
};
export default Root;
