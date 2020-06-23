import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { getData, arrayToObject } from "../../utils/common";

const TableElement = ({ query, selectedFilters }) => {
  const [tableData, setTableData] = useState([{}]);

  useEffect(() => {
    const params = arrayToObject(selectedFilters);
    getData(query, params).then(({ data: { rows } }) => setTableData(rows));
  }, [query, selectedFilters]);

  const columns = Object.keys(tableData[0]).map((col) => ({
    title: col,
    dataIndex: col,
    key: col,
  }));

  return <Table dataSource={tableData} columns={columns} rowKey="cartodb_id" />;
};

export default TableElement;

