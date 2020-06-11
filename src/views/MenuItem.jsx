import React from "react";
import { Layout, Typography, Menu, } from "antd";

const GenericDataComponent = ({
  key,
  title
}) => {
  console.log('rend')
  return (
            <Menu.Item key={key}>{title}</Menu.Item>
  )
};

export default GenericDataComponent;
