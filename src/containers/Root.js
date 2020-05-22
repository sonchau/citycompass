import React from "react";
import CreateGlobalStyles from "../CreateGlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "../constants/theme";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Styled components
import StyledContainer from "../styled/Layout/StyledContainer";
import StyledHeader from "../styled/Layout/StyledHeader";
import StyledContent from "../styled/Layout/StyledContent";
import StyledSidebar from "../styled/Layout/StyledSidebar";
import StyledMain from "../styled/Layout/StyledMain";

// components
import Sidebar from "../components/Sidebar/Sidebar";
import communityProfileRoutes from "../routes/communityProfiles";

// container
import HeaderContainer from "./HeaderContainer";

const Root = ({ isThemeLight }) => {
  return (
    <ThemeProvider theme={isThemeLight ? theme.lightTheme : theme.darkTheme}>
      <CreateGlobalStyles />
      <StyledContainer>
        <StyledHeader>
          <HeaderContainer />{" "}
        </StyledHeader>
        <StyledContent>
          <StyledSidebar>
            <Sidebar routes={communityProfileRoutes} />
          </StyledSidebar>
          <StyledMain>
            <Switch>
              {communityProfileRoutes.map((prop, key) => {
                if (prop.redirect) {
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                  );
                }
                if (prop.category) {
                  return (
                    <React.Fragment>
                      {prop.routes.map((route, key) => {
                        if (route.nestedRoutes) {
                          return (
                            <React.Fragment>
                              <Route
                                path={route.path}
                                component={route.component}
                                key={key}
                              />

                              {route.nestedRoutes.map((nestedRoute, key) => {
                                return (
                                  <Route
                                    path={nestedRoute.path}
                                    component={nestedRoute.component}
                                    key={key}
                                  />
                                );
                              })}
                            </React.Fragment>
                          );
                        }
                        return (
                          <Route
                            path={route.path}
                            component={route.component}
                            key={key}
                          />
                        );
                      })}
                    </React.Fragment>
                  );
                }
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
            </Switch>
          </StyledMain>
        </StyledContent>
      </StyledContainer>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    isThemeLight: state.isThemeLight,
  };
};
export default connect(mapStateToProps, null)(Root);
