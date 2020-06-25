import React, { useEffect } from "react";
import { Table } from "antd";
import { arrayToObject } from "../../utils/common";
import {useApi} from '../../utils/hooks';
import {makeHeading} from '../../utils/common';

const TableElement = ({ query, selectedFilters }) => {
  const params = arrayToObject(selectedFilters);
  const [getData, results, errorMessage] = useApi(query, params)
  let tableData = [], columns = []

  if (results.length) {
    tableData = results
    columns = Object.keys(results[0]).map((col, index) => ({
                title: makeHeading(col),
                dataIndex: col,
                key: `${col}-${index}`,
              }));
  }

  useEffect(() => {
    getData(query, params)
  }, [selectedFilters]);

  return errorMessage ? 
      <p>{errorMessage}</p> : 
      <Table dataSource={tableData} columns={columns} rowKey="key" />;
};

export default TableElement;

