import React from "react";
import { AutoComplete } from "antd";
import { Layout } from "antd";
import "antd/dist/antd.css";

const { Content } = Layout;

const options = [
  {
    value: "City of Casey",
  },
  {
    value: "Downing Street",
  },
  {
    value: "Wall Street",
  },
];

const Complete = () => (
  <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
    <div
      className="site-layout-background"
      style={{ padding: 24, textAlign: "center" }}
    >
      <AutoComplete
        size="large"
        style={{
          width: "100%",
        }}
        options={options}
        placeholder="Enter location"
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    </div>
  </Content>
);

export default Complete;
