import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PAGE_DIRECTORY_QUERY } from "../sqlQueries";

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
import CommunityProfiles from "../views/CommunityProfiles";
import PopulationEstimates from "../views/AreaProfiles/population/PopulationEstimates";
// container
import HeaderContainer from "./HeaderContainer";

// action creators
import fetchData from "../actions/apiActions";
import sqlQueryTransforms from "./../sqlQueryTransforms";

const Root = ({ isThemeLight, pageDirectory }) => {
  // Similar to componentDidMount and componentDidUpdate:
  return (
    <ThemeProvider theme={isThemeLight ? theme.lightTheme : theme.darkTheme}>
      <CreateGlobalStyles />
      <StyledContainer>
        <StyledHeader>
          <HeaderContainer />{" "}
        </StyledHeader>
        <StyledContent>
          <StyledSidebar>
            <Sidebar
              pageDirectory={sqlQueryTransforms["PAGE_DIRECTORY_QUERY"](
                pageDirectory
              )}
            />
          </StyledSidebar>
          <StyledMain>
            <Switch>
              {/* <Route path="/A1">
                <CommunityProfiles />
              </Route>
              <Route path="/A2">
                <PopulationEstimates />
              </Route> */}

              {pageDirectory && (
                <Route key={"page_code"} path={`/:page_code`}>
                  <PopulationEstimates></PopulationEstimates>
                </Route>
              )}
              {/* {communityProfileRoutes.map((prop, key) => {
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
              })} */}
            </Switch>
          </StyledMain>
        </StyledContent>
      </StyledContainer>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  console.log("state.pageDirectory", state.pageDirectory);
  return {
    isThemeLight: state.isThemeLight,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     pageStructure: () =>
//       // TODO: move SET_PAGE_DIRECTORY to import form action constants
//       dispatch(fetchData(PAGE_DIRECTORY_QUERY, "SET_PAGE_DIRECTORY")),
//     // ageSexPyramid: () =>
//     //   dispatch(
//     //     fetchData(
//     //       `SELECT * FROM casey.cc_casey_mp_agegend5 WHERE geo_name = 'Casey (C)'`
//     //     )
//   };
// };

export default connect(mapStateToProps)(Root);
