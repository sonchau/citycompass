import React, { useState, useEffect } from "react";
import { Layout, Typography, Menu, Breadcrumb } from "antd";
import { pageDepth } from "../utils/pageCodeToObjectPath";
import { PAGE_CONTENT_QUERY } from "../sqlQueries";
import { getData } from "../utils/common";
import PageContent from "../components/elements/PageContent";
import PageFilters from "../components/elements/PageFilters";
import Table from "../components/elements/Table";
import Map from "../components/elements/Map";
import PageFiltersContext from "./PageFiltersContext";
import { useLocation } from "react-router-dom";

// import {
//   MailOutlined,
//   AppstoreOutlined,
// } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

const GenericDataComponent = ({
  page_code,
  pageMetaData,
  adjacentPages,
  clientName,
  handlMenuItemClick,
}) => {
  // initial state
  const [pageData, setPageData] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const initSelectedFilters = Array.from(query.entries()).reduce(
    (memo, [key, value]) => {
      memo.push({ [key]: value });
      return memo;
    },
    []
  );
  const [selectedFilters, setSelectedFilters] = useState(initSelectedFilters);

  // hooks
  useEffect(() => {
    // TODO: cleanup data fetching https://codesandbox.io/s/jvvkoo8pq3?file=/src/index.js
    getData(PAGE_CONTENT_QUERY, {
      clientName,
      page_code,
    }).then(({ data: { rows } }) => setPageData(rows));
  }, [clientName, page_code]);

  const pageFilterContextValue = {
    pageFilters: pageMetaData["page_filters"],
    selectedFilters,
    setSelectedFilters,
  };

  return (
    <Content>
      {pageDepth(page_code) === 4 ? (
        <Menu
          onClick={handlMenuItemClick}
          selectedKeys={[page_code]}
          mode="horizontal"
        >
          {/* TODO: change adjacentPages to match the pageMetaData schema */}
          {adjacentPages.map((adjPage) => (
            <Menu.Item key={page_code} data={convertAjdPageToMetaData(adjPage)}>
              {adjPage.d_title}
            </Menu.Item>
          ))}
        </Menu>
      ) : null}
      <br />
      <Title>City of Casey</Title>
      <Breadcrumb>
        {Object.values(pageMetaData.page_titles).map((pageTitle, index) => (
          <Breadcrumb.Item key={index}>{pageTitle}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
      {pageMetaData["page_filters"] && (
        <PageFiltersContext.Provider
          value={pageFilterContextValue.log("pageFilterContextValue")}
        >
          <PageFilters pageFilters={pageMetaData["page_filters"]} />
        </PageFiltersContext.Provider>
      )}
      {pageData.map((page, index) => {
        //NOTE: depend in element_type then render appropriate component type
        // 'text' => render PageContent
        // 'chart' => render Chart
        return {
          text: (
            <PageContent
              key={`text-${page_code}-${index}`}
              header={page.element_header}
              footer={page.element_footer}
              content={page.element_text}
              query={santaizeSql(page.data_query)}
            />
          ),
          table: selectedFilters && (
            <Table
              key={`table-${page_code}-${index}`}
              query={santaizeSql(page.data_query)}
              selectedFilters={selectedFilters}
            />
          ),
          map: (
            <Map
              key={`map-${page_code}-${index}`}
              content={page.element_text}
              query={santaizeSql(page.data_query)}
            />
          ),
        }[page.element_type];
      })}
    </Content>
  );
};

export default GenericDataComponent;

const convertAjdPageToMetaData = ({
  page_code,
  page_filters,
  a_title,
  b_title,
  c_title,
  d_title,
}) => {
  return {
    pageMetaData: {
      page_titles: {
        a_title,
        b_title,
        c_title,
        d_title,
      },
      page_filters,
    },
    page_code,
  };
};

// removes the "{" and "}" surrounding the query coz SQL queries can't be stored in a database field without these
const santaizeSql = (rawSql) => {
  const re = new RegExp(/^\{(.*)\}$/s)
  const match = re.exec(rawSql);
  return match ? match[1] : rawSql;
};
