import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { getData, arrayToObject } from "../../utils/common";

const TableElement = ({ query, selectedFilters }) => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const params = arrayToObject(selectedFilters);
    const fetchData = async () => {
      const response = await getData(query, params)
      const rows = response.data.rows
      setTableData(rows);
      if(rows.length > 0) {
        const columnsName = Object.keys(rows[0]).map((col) => ({
            title: col,
            dataIndex: col,
            key: col,
          }));
        setColumns(columnsName)  
      }
    };
    fetchData();
  }, [query, selectedFilters]);

  return <Table dataSource={tableData} columns={columns} rowKey="cartodb_id" />;
};

export default TableElement;

