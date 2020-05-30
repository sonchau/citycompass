import React from "react";
import { Layout, Typography, Menu } from "antd";
import { pageDepth } from "../utils/pageCodeToObjectPath";
// import {
//   MailOutlined,
//   AppstoreOutlined,
// } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

const GenericDataComponent = ({ page_code, pageMetaData, adjacentPages }) => {
  adjacentPages.log("adjacentPages");
  pageDepth(page_code).log(page_code);
  return (
    <Content>
      {" "}
      {pageDepth(page_code) === 4 ? (
        <Menu
          onClick={(e) => console.log(e)}
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
      {page_code}
      <pre>{JSON.stringify(pageMetaData, null, 2)}</pre>
      <pre>{JSON.stringify(adjacentPages, null, 2)}</pre>
    </Content>
  );
};

export default GenericDataComponent;
