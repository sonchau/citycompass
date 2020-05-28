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
import CommunityProfiles from "../views/CommunityProfiles";
import PopulationEstimates from "../views/AreaProfiles/population/PopulationEstimates";
// container
import HeaderContainer from "./HeaderContainer";

// action creators
import fetchData from "../actions/apiActions";

const Root = ({ isThemeLight, dataset, pageStructure }) => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    pageStructure();
    // ageSexPyramid();
  }, []);
  return (
    <ThemeProvider theme={isThemeLight ? theme.lightTheme : theme.darkTheme}>
      <CreateGlobalStyles />
      <StyledContainer>
        <StyledHeader>
          <HeaderContainer />{" "}
        </StyledHeader>
        <StyledContent>
          <StyledSidebar>
            <Sidebar />
          </StyledSidebar>
          <StyledMain>
            <Switch>
              {dataset && (
                <Route key={"page_code"} path={`/:username/:page_code`}>
                  <PopulationEstimates></PopulationEstimates>
                </Route>
              )}
            </Switch>
          </StyledMain>
        </StyledContent>
      </StyledContainer>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  console.log("state.routes", state.routes);
  return {
    isThemeLight: state.isThemeLight,
    dataset: state.routes,
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
