import React, { useState, useEffect } from "react";
import { Layout, Typography, Menu, Breadcrumb } from "antd";
import { pageDepth } from "../utils/pageCodeToObjectPath";
import { useHistory } from "react-router-dom";
import { PAGE_CONTENT_QUERY } from "../sqlQueries";
import { getData } from "../utils/common";
import PageContent from "../components/PageContent";

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
  let history = useHistory();
  const handleClick = ({ key: newPageCode, ...rest }) => {
    history.push(`/casey/${newPageCode}`);
    setPageMetaData({
      ...pageMetaData,
      d_title: rest.domEvent.target.innerText,
    });
  };
  const [pageData, setPageData] = useState(null);
  useEffect(() => {
    getData(PAGE_CONTENT_QUERY(clientName, page_code)).then(({ data }) => {
      let response = data.rows
      response.sort((a, b) => (a.element_order > b.element_order) ? 1 : -1)
      //console.log('PAGE_CONTENT_QUERY data', data.rows)
      setPageData(response)
    })
  }, [clientName, page_code]);

  return (
    <Content>
      {pageDepth(page_code) === 4 ? (
        <Menu
          onClick={handleClick}
          selectedKeys={[page_code]}
          mode="horizontal"
        >
          {adjacentPages.map((p) => (
            <Menu.Item key={p["page_code"]}>{p["d_title"]}</Menu.Item>
          ))}
        </Menu>
      ) : null}
      <br />
      <Title>City of Casey</Title>
      <Breadcrumb>
        {Object.values(pageMetaData).map((pageTitle) => (
          <Breadcrumb.Item>{pageTitle}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
      { pageData && pageData.length > 0 && 
        pageData.map((page, index) => {
          return <PageContent key={index} header={page.element_header} footer={page.element_footer}
          content={page.element_text} query={page.data_query}/>
        })
      }
      
      <pre>{JSON.stringify(pageMetaData, null, 2)}</pre>
      <pre>{JSON.stringify(adjacentPages, null, 2)}</pre>
    </Content>
  );
};

export default GenericDataComponent;
