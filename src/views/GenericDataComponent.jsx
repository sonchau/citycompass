import React from "react";
import { Layout, Typography, Menu, Breadcrumb } from "antd";
import { pageDepth } from "../utils/pageCodeToObjectPath";
import { useHistory } from "react-router-dom";
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
}) => {
  let history = useHistory();
  const handleClick = ({ key: newPageCode, ...rest }) => {
    history.push(`/casey/${newPageCode}`);
    // TODO: Don't use inner text, because if styling change it will break
    setPageMetaData({
      ...pageMetaData,
      d_title: rest.domEvent.target.innerText,
    });
  };

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

      <hr></hr>

      <pre>{JSON.stringify(pageMetaData, null, 2)}</pre>
      <pre>{JSON.stringify(adjacentPages, null, 2)}</pre>
    </Content>
  );
};

export default GenericDataComponent;
