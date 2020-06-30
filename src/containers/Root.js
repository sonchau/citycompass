import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PAGE_DIRECTORY_QUERY } from "../sqlQueries";
import { useHistory, useLocation } from "react-router-dom";

// Styled components
import { ThemeProvider } from "styled-components";
import CreateGlobalStyles from "../CreateGlobalStyles";
import theme from "../constants/theme";
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
import { Layout } from "antd";
import _ from 'lodash';

// TODO: Do we weant the paths to be the A1B2 serial codes or the names of the pages?

const Root = ({ clientName, isThemeLight }) => {
  let history = useHistory();
  let location = useLocation();
  let defaultPageCode, defaultPageMetaData;
  const [pageDirectory, setPageDirectory] = useState(null);
  const [pageMetaData, setPageMetaData] = useState(null);
  const [responseData, setResponseData] = useState(null)
  useEffect(() => {
    getData(PAGE_DIRECTORY_QUERY, { clientName }).then(({ data }) => {
      setResponseData(data.rows)
      setPageDirectory(sqlQueryTransforms["PAGE_DIRECTORY_QUERY"](data));
    });
  }, []);

  // Similar to componentDidMount and componentDidUpdate:
  if (pageDirectory) {
    // TODO: refactor to not hard code path write utility belt for parsing the navigation structure
    // TODO: be explicit about the intial state of the pageMetadata using pagecode maybe?
    defaultPageCode = 'A1B1';
    
    const currentPagecode = _.last(location.pathname.split('/'))
    const currentPageData = _.find(responseData, { 'page_code': currentPagecode });
    if (currentPageData) {
      defaultPageMetaData = {
        page_titles: {
          a_title: currentPageData["a_title"],
          b_title: currentPageData["b_title"],
        },
        page_filters: currentPageData["page_filters"],
      };
    } else {
      //TODO: ask Cesar here cause A2B1 does not have any pagecode
      // the first record is A2B1C1D01
      // for now default to A1B1
      // or not able to click on this
      defaultPageMetaData = {
        page_titles: {
          a_title: pageDirectory[0]["a_title"],
          b_title: pageDirectory[0]["b"][0]["b_title"],
        },
        page_filters: pageDirectory[0]["b"][0]["page_filters"],
      };
    }

  }

  // Use "props" through menu items, that way we don't invoke the functions
  const handlMenuItemClick = ({
    item: {
      props: {
        data: { pageMetaData, page_code },
      },
    },
  }) => {
    handleItemTitleClick(pageMetaData, page_code);
  };
  // Unfortunately onTitleClick needs to be used with SubMenu items
  // Open issue: https://github.com/ant-design/ant-design/issues/6463
  const handleItemTitleClick = (pageMetaData, page_code) => {
    if (history.location.pathname !== `/${clientName}/${page_code}`) {
      history.push(`/${clientName}/${page_code}`);
      setPageMetaData(pageMetaData);
    }
  };

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
            <Layout>
              <StyledSidebar>
                <Layout.Sider className="site-layout-background" width={300}>
                  <Sidebar
                    setPageMetaData={setPageMetaData}
                    clientName={clientName}
                    pageDirectory={pageDirectory}
                    handlMenuItemClick={handlMenuItemClick}
                    handleItemTitleClick={handleItemTitleClick}
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
                          key={page_code}
                          clientName={clientName}
                          pageMetaData={pageMetaData || defaultPageMetaData}
                          page_code={page_code}
                          adjacentPages={getAdjacentPageDirectory(
                            pageDirectory,
                            page_code
                          )}
                          handlMenuItemClick={handlMenuItemClick}
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
          Geografia Pty. Ltd. © {new Date().getFullYear()}
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
