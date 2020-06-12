import React from "react";
import { Layout, Typography, Menu } from "antd";

const GenericDataComponent = ({ key, title }) => {
  return <Menu.Item key={key}>{title}</Menu.Item>;
};

export default GenericDataComponent;
