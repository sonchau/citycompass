import React, { useState, useEffect } from "react";
import { Table } from 'antd'
import { getData, replaceContent, makeInputData } from "../../utils/common";

const Map = ({
  query,
}) => {

  const [taleData, setTableData] = useState([])
  useEffect(() => {
    const updatedQuery = query.replace('{', '').replace('}', '')
    //console.log('updatedQuery', updatedQuery)
    getData(updatedQuery).then(({ data }) => {
      //console.log('data', data.rows)
      setTableData(data.rows)
    })
  }, [query]);

  let columns;
  if (taleData.length > 0) {
    columns = Object.keys(taleData[0]).map(i => {
      if (i.includes('foo') || i.includes('bar')) return { title: i, dataIndex: i, key: i }
    }).filter(i => i !== undefined)
  }

  return (
    <Table dataSource={taleData} columns={columns}  />
  );
};

export default Map;