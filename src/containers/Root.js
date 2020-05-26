import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PAGE_DATA_QUERY, PAGE_DATA_QUERY_TRANSFORM } from "../sqlQueries";

// Styled components
import { ThemeProvider } from "styled-components";
import CreateGlobalStyles from "../CreateGlobalStyles";
import theme from "../constants/theme";
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

// action creators
import fetchData from "../actions/apiActions";

const Root = ({ isThemeLight, ageSexPyramid, pageStructure }) => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    pageStructure();
    // ageSexPyramid();
  });
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
  console.log("state", state);
  return {
    isThemeLight: state.isThemeLight,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pageStructure: () =>
      // TODO: move SET_ROUTES to import form action constants
      dispatch(
        fetchData(PAGE_DATA_QUERY, "SET_ROUTES", PAGE_DATA_QUERY_TRANSFORM)
      ),
    // ageSexPyramid: () =>
    //   dispatch(
    //     fetchData(
    //       `SELECT * FROM casey.cc_casey_mp_agegend5 WHERE geo_name = 'Casey (C)'`
    //     )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
