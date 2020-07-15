import React, { useReducer } from "react";
import 'url-search-params-polyfill';
import { Layout, Typography, Menu, Breadcrumb } from "antd";
import { pageDepth } from "../utils/pageCodeToObjectPath";
import { PAGE_CONTENT_QUERY } from "../sqlQueries";
import { santaizeSql, convertAjdPageToMetaData } from "../utils/common";
import PageContent from "../components/elements/PageContent";
import PageFilters from "../components/elements/PageFilters";
import PageBreadcrumb from "../components/elements/PageBreadcrumb";
import Table from "../components/elements/Table";
import TableGroup from "../components/elements/TableGroup";
import BarChart from '../components/elements/BarChart';
import Map from "../components/elements/Map";
import PageFiltersContext from "../context/PageFiltersContext";
import { useLocation } from "react-router-dom";
import filtersReducer from '../reducers/filtersReducer';
import {useApi} from '../utils/hooks';
import styled from "styled-components";

const { Content } = Layout;
const { Title } = Typography;
const PageTitle = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
` 

const GenericDataComponent = ({
  page_code,
  pageMetaData,
  adjacentPages,
  clientName,
  handlMenuItemClick,
}) => {
  // initial state
  const query = new URLSearchParams(useLocation().search);
  const initSelectedFilters = Array.from(query.entries()).reduce(
    (memo, [key, value]) => {
      memo.push({ [key]: value });
      return memo;
    },
    []
  );
  const [selectedFilters, dispatch] = useReducer(filtersReducer, initSelectedFilters)
  const [getData, results, errorMessage] = useApi(PAGE_CONTENT_QUERY, {
    clientName,
    page_code,
  })

  return errorMessage ? 
  <p>{errorMessage}</p> : 
  ( <Content>
      {pageDepth(page_code) === 4 ? (
        <Menu
          onClick={handlMenuItemClick}
          selectedKeys={[page_code]}
          mode="horizontal"
        >
          {/* TODO: change adjacentPages to match the pageMetaData schema */}
          {adjacentPages.map((adjPage) => (
            <Menu.Item key={adjPage.page_code} data={convertAjdPageToMetaData(adjPage)}>
              {adjPage.d_title}
            </Menu.Item>
          ))}
        </Menu>
      ) : null}
      <br />
      <PageTitle>City of Casey</PageTitle>
      <PageBreadcrumb titles={pageMetaData.page_titles} />
      {pageMetaData["page_filters"] && (
        <PageFiltersContext.Provider
          value= {
            { selectedFilters,
              dispatch }
          }
        >
          <PageFilters pageFilters={pageMetaData["page_filters"]} />
        </PageFiltersContext.Provider>
      )}
      {results.map((page, index) => {
        //NOTE: depend in element_type then render appropriate component type
        // 'text' => render PageContent
        // 'chart' => render Chart
        return {
          text: selectedFilters && (
            <PageContent
              key={`text-${page_code}-${index}`}
              header={page.element_header}
              footer={page.element_footer}
              content={page.element_text}
              query={santaizeSql(page.data_query)}
              selectedFilters={selectedFilters}
            />
          ),
          table: selectedFilters && (
            <Table
              key={`table-${page_code}-${index}`}
              query={santaizeSql(page.data_query)}
              selectedFilters={selectedFilters}
            />
          ),
          'tableGroup': selectedFilters && (
            <TableGroup
              key={`table-${page_code}-${index}`}
              query={santaizeSql(page.data_query)}
              options={page.options}
              selectedFilters={selectedFilters}
            />
          ),
          'horizontalBarChart': selectedFilters && (
            <BarChart
              key={`chart-${page_code}-${index}`}
              query={santaizeSql(page.data_query)}
              options={page.options}
              selectedFilters={selectedFilters}
              chartType="horizontalBarChart"
            />
          ),
          'verticalBarChart': selectedFilters && (
            <BarChart
              key={`chart-${page_code}-${index}`}
              query={santaizeSql(page.data_query)}
              options={page.options}
              selectedFilters={selectedFilters}
              chartType="verticalBarChart"
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

