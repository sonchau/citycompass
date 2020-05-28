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
import ErrorPage from "../views/ErrorPage";
// container
import HeaderContainer from "./HeaderContainer";

// action creators
import fetchData from "../actions/apiActions";
import sqlQueryTransforms from "./../sqlQueryTransforms";

const Root = ({ path, isThemeLight, pageDirectory }) => {
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
              <Route
                key={"page_code"}
                exact={true}
                path={`${path}/A1B2`}
                component={({ page_code }) =>
                  <CommunityProfiles page_code={page_code} />
                }
              />
              <Route component={ErrorPage} />
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
