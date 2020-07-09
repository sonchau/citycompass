import React, { useEffect } from "react";
import { Table } from "antd";
import { arrayToObject, replaceSqlContent } from "../../utils/common";
import {useApi} from '../../utils/hooks';
import {makeHeading} from '../../utils/common';
import StyledTable from '../../styled/Components/StyledTable';

const TableElement = ({ query, selectedFilters }) => {
  const updatedSql = replaceSqlContent(selectedFilters, query)
  const params = arrayToObject(selectedFilters);
  const [getData, results, errorMessage] = useApi(updatedSql, params, selectedFilters)
  let tableData = [], columns = []

  if (results.length) {
    tableData = results
    columns = Object.keys(results[0]).map((col, index) => ({
                title: makeHeading(col),
                dataIndex: col,
                key: `${col}-${index}`,
              }));
  }
  //console.log('results', results)
  return errorMessage ? 
      <p>{errorMessage}</p> : 
      <StyledTable>
        <Table bordered dataSource={tableData} columns={columns} rowKey="key" />
      </StyledTable>
};

export default TableElement;

