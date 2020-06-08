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
import pageCodeToObjectPath from "../utils/pageCodeToObjectPath";

// antd components
import { Layout, Menu, Breadcrumb } from "antd";
const { SubMenu } = Menu;

// TODO: Do we weant the paths to be the A1B2 serial codes or the names of the pages?

const Root = ({ clientName, isThemeLight }) => {
  let defaultPageCode, defaultPageMetaData;
  const [pageDirectory, setPageDirectory] = useState(null);
  const [pageMetaData, setPageMetaData] = useState(null);
  useEffect(() => {
    getData(PAGE_DIRECTORY_QUERY).then(({ data }) =>
      setPageDirectory(sqlQueryTransforms["PAGE_DIRECTORY_QUERY"](data))
    );
  }, []);

  // Similar to componentDidMount and componentDidUpdate:
  if (pageDirectory) {
    // TODO: refactor to not hard code path write utility belt for parsing the navigation structure
    defaultPageCode = pageDirectory[0]["b"][0]["page_code"];
    defaultPageMetaData = {
      a_title: pageDirectory[0]["a_title"],
      b_title: pageDirectory[0]["b"][0]["b_title"],
    };
  }

  return pageDirectory ? (
    <ThemeProvider theme={isThemeLight ? theme.lightTheme : theme.darkTheme}>
      <CreateGlobalStyles />
      <Layout>
        <StyledHeader>
          <Layout.Header>
            <HeaderContainer />{" "}
          </Layout.Header>
        </StyledHeader>

        <StyledContent>
          <Layout.Content>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
            <Layout>
              <StyledSidebar>
                <Layout.Sider className="site-layout-background" width={300}>
                  <Sidebar
                    setPageMetaData={setPageMetaData}
                    clientName={clientName}
                    pageDirectory={pageDirectory}
                  />
                </Layout.Sider>
              </StyledSidebar>
              <StyledMain>
                <Layout.Content style={{ padding: "0 24px", minHeight: 280 }}>
                  <Switch>
                    <Route
                      exact
                      path={`/${clientName}`}
                      render={() => (
                        <Redirect
                          to={`/${clientName}/${defaultPageCode}`}
                        ></Redirect>
                      )}
                    ></Route>
                    <Route
                      path={`/${clientName}/:page_code`}
                      render={({
                        match: {
                          params: { page_code },
                        },
                      }) => (
                        <GenericDataComponent
                          clientName={clientName}
                          pageMetaData={pageMetaData || defaultPageMetaData}
                          page_code={page_code}
                          adjacentPages={getAdjacentPageDirectory(
                            pageDirectory,
                            page_code
                          )}
                          setPageMetaData={setPageMetaData}
                        />
                      )}
                    />
                    <Route component={ErrorPage} />
                  </Switch>
                </Layout.Content>
              </StyledMain>
            </Layout>
          </Layout.Content>
        </StyledContent>
        <Layout.Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Layout.Footer>
      </Layout>
    </ThemeProvider>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    isThemeLight: state.isThemeLight,
  };
};

export default connect(mapStateToProps)(Root);

function getAdjacentPageDirectory(pageDirectory, page_code) {
  const adjacentPageCode = page_code.substr(0, page_code.match(/(\d+$)/).index);
  return Object.byString(pageDirectory, pageCodeToObjectPath(adjacentPageCode));
}
