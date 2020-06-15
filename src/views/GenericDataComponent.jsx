import React, { useState, useEffect } from "react";
import { Layout, Typography, Menu, Breadcrumb } from "antd";
import { pageDepth } from "../utils/pageCodeToObjectPath";
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
  clientName,
  handlMenuItemClick
}) => {
  // initial state
  const [pageData, setPageData] = useState([]);

  // hooks
  useEffect(() => {
    // TODO: cleanup data fetching https://codesandbox.io/s/jvvkoo8pq3?file=/src/index.js
     getData(PAGE_CONTENT_QUERY(clientName, page_code)).then(({ data }) => {
      let response = data.rows;
      setPageData(response);
    });
  }, [clientName, page_code]);

  return (
    <Content>
      {pageDepth(page_code) === 4 ? (
        <Menu
          onClick={handlMenuItemClick}
          selectedKeys={[page_code]}
          mode="horizontal"
        >
          {adjacentPages.map(({
            page_code,
            page_filters,
            a_title,
            b_title,
            c_title,
            d_title }) => (
              <Menu.Item
                key={page_code}
                data={{
                  pageMetaData:
                  {
                    page_titles: {
                      a_title,
                      b_title,
                      c_title,
                      d_title,
                    },
                    page_filters,
                  },
                  page_code
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
          table: <Table query={page.data_query} pageFilters={pageMetaData["page_filters"]} />,
          map: <Map content={page.element_text} query={page.data_query} />,
        }[page.element_type];
      })}
    </Content>
  );
};

export default GenericDataComponent;
