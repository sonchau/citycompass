import React, { useState, useEffect } from "react";
import { Table } from 'antd'
import { getData } from "../../utils/common";

const TableElement = ({
  query,
}) => {
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    const updatedQuery = query.replace('{', '').replace('}', '')
    //console.log('updatedQuery', updatedQuery)
    getData(updatedQuery).then(({ data }) => {
      //console.log('data', data.rows)
      setTableData(data.rows)
    })  
  }, [query]);

  const columns = tableData.length ? Object.keys(tableData[0]).map((i) => ({
    title: i,
    dataIndex: i,
    key: i,
  })) : [];
  return (
    <Table dataSource={tableData} columns={columns} rowKey="cartodb_id" />
  );
};

export default TableElement;

