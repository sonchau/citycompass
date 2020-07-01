import React, { useEffect } from "react";
import { Table } from "antd";
import { arrayToObject, replaceSqlContent } from "../../utils/common";
import {useApi} from '../../utils/hooks';
import {makeHeading} from '../../utils/common';
import _ from 'lodash';

const { Column, ColumnGroup } = Table;

const TableGroup = ({ query, selectedFilters, options }) => {
  const updatedSql = replaceSqlContent(selectedFilters, query)
  const {grouping} = JSON.parse(options)
  //console.log(selectedFilters, 'updatedSql', updatedSql, 'options', grouping)
  const params = arrayToObject(selectedFilters);
  const [getData, results, errorMessage] = useApi(query, params)

  let tableData = [], columns = []

  if (results.length) {
    tableData = results.map(result => {
      return { 
        ...result,
        key: result.cartodb_id
      }
    })
    columns = Object.keys(results[0]).map((col, index) => ({
                title: makeHeading(col),
                dataIndex: col,
                key: `${col}-${index}`,
              }));
  }

  useEffect(() => {
    getData(query, params)
  }, [selectedFilters]);
  //console.log('tableData', tableData)
  return errorMessage ? 
      <p>{errorMessage}</p> : 
      <Table dataSource={tableData} rowKey="key">
      <Column title="Category" dataIndex="category" key="category" />
        {grouping.map((group) => {
          const groupValue = _.find(selectedFilters, group)[group]
          //console.log('groupValue', groupValue)
          return (<ColumnGroup title={groupValue}>
          <Column title="Value" dataIndex={`_${groupValue}`} key={`_${groupValue}`} />
          <Column title="Percentage" dataIndex="percentage" key="percentage" />
        </ColumnGroup>)
        })}
      </Table>
};

export default TableGroup;

