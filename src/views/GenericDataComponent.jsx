import React, { useState, useEffect } from "react";
import { Layout, Typography, Menu, Breadcrumb } from "antd";
import { pageDepth } from "../utils/pageCodeToObjectPath";
import { useHistory } from "react-router-dom";
import { PAGE_CONTENT_QUERY } from "../sqlQueries";
import { getData } from "../utils/common";
import PageContent from "../components/elements/PageContent";
import Table from "../components/elements/Table";
import Map from "../components/elements/Map";

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
  setPageMetaData,
  clientName,
}) => {
  // initial state
  const [pageData, setPageData] = useState([]);

  // hooks
  useEffect(() => {
    getData(PAGE_CONTENT_QUERY(clientName, page_code)).then(({ data }) => {
      let response = data.rows;
      response.log("PAGE_CONTENT_QUERY");
      setPageData(response);
    });
  }, [clientName, page_code]);

  let history = useHistory();

  const handleClick = ({
    page_code: newPageCode,
    page_filters,
    d_title,
    ...rest
  }) => {
    [page_filters].log("handleClick");
    history.push(`/casey/${newPageCode}`);
    setPageMetaData({
      page_titles: { ...pageMetaData.page_titles, d_title },
      page_filters,
    });
  };

  [pageMetaData].log("pageMetaData");
  [adjacentPages].log("adjacentPages");

  const pageFilterItem = adjacentPages.filter((p) => page_code === p.page_code);

  let pageFilters = [];

  if (pageFilterItem.length > 0) {
    pageFilters = pageFilterItem[0]["page_filters"];
  }

  return (
    <Content>
      {pageDepth(page_code) === 4 ? (
        <Menu
          onClick={handleClick}
          selectedKeys={[page_code]}
          mode="horizontal"
        >
          {adjacentPages.map(({ page_code, page_filters, d_title }) => (
            <Menu.Item
              key={{
                page_code,
                page_filters,
                d_title,
              }}
            >
              {d_title}
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

      {pageData.map((page, index) => {
        //NOTE: depend in element_type then render appropriate component type
        // 'text' => render PageContent
        // 'chart' => render Chart
        return {
          text: (
            <PageContent
              key={index}
              header={page.element_header}
              footer={page.element_footer}
              content={page.element_text}
              query={page.data_query}
            />
          ),
          table: <Table query={page.data_query} pageFilters={pageFilters} />,
          map: <Map content={page.element_text} query={page.data_query} />,
        }[page.element_type];
      })}
    </Content>
  );
};

export default GenericDataComponent;
