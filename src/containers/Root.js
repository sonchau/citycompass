import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import CreateGlobalStyles from "../CreateGlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import StyledContainer from "../components/Layout/StyledContainer";
import StyledHeader from "../components/Layout/StyledHeader";
import StyledContent from "../components/Layout/StyledContent";
import StyledSidebar from "../components/Layout/StyledSidebar";
import StyledMain from "../components/Layout/StyledMain";

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CreateGlobalStyles />
        <StyledContainer>
          <StyledHeader>
            <span>Geografia</span>{" "}
            {/* <Toggle theme={theme} toggleTheme={toggleTheme} /> */}
          </StyledHeader>
          <StyledContent>
            <StyledSidebar>StyledSidebar it is</StyledSidebar>
            <StyledMain>Its Main Content Area</StyledMain>
          </StyledContent>
        </StyledContainer>
      </ThemeProvider>
    </Provider>
  );
};
export default Root;
