import React, { useState, useEffect } from "react";
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
import GenericDataComponent from "../views/GenericDataComponent";
import ErrorPage from "../views/ErrorPage";
// container
import HeaderContainer from "./HeaderContainer";

import { getData } from "../utils/common";
import sqlQueryTransforms from "./../sqlQueryTransforms";

// TODO: Do we weant the paths to be the A1B2 serial codes or the names of the pages?

const Root = ({ clientName, isThemeLight }) => {
  let defaultPageCode;
  const [pageDirectory, setPageDirectory] = useState(null);
  useEffect(() => {
    getData(PAGE_DIRECTORY_QUERY).then(({ data }) =>
      setPageDirectory(sqlQueryTransforms["PAGE_DIRECTORY_QUERY"](data))
    );
  }, []);

  // Similar to componentDidMount and componentDidUpdate:
  if (pageDirectory) {
    // TODO: refactor to not hard code path write utility belt for parsing the navigation structure
    defaultPageCode = pageDirectory[0]["b"][0]["page_code"];
  }

  return pageDirectory ? (
    <ThemeProvider theme={isThemeLight ? theme.lightTheme : theme.darkTheme}>
      <CreateGlobalStyles />
      <StyledContainer>
        <StyledHeader>
          <HeaderContainer />{" "}
        </StyledHeader>
        <StyledContent>
          <StyledSidebar>
            <Sidebar clientName={clientName} pageDirectory={pageDirectory} />
          </StyledSidebar>
          <StyledMain>
            <Switch>
              <Route
                exact
                path={`/${clientName}`}
                render={() => (
                  <Redirect to={`/${clientName}/${defaultPageCode}`}></Redirect>
                )}
              ></Route>
              <Route
                path={`/${clientName}/:page_code`}
                render={({
                  match: {
                    params: { page_code },
                  },
                }) => <GenericDataComponent page_code={page_code} />}
              />
              <Route component={ErrorPage} />
            </Switch>
          </StyledMain>
        </StyledContent>
      </StyledContainer>
    </ThemeProvider>
  ) : null;
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
