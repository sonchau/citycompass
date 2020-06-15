import React, { useState, useEffect } from "react";
import { Table } from 'antd'
import { getData, getAllData } from "../../utils/common";
import FilterDropdown from '../common/FilterDropdown'
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem;
  background: #11131A;
`;

const TableElement = ({
  query,
  pageFilters
}) => {

  const [tableData, setTableData] = useState([])
  const [filterDropdowns, setFilterDropdowns]= useState([])
  
  let filterSqls = [], filterHeadings =[]
  if (pageFilters.length > 0) {
    const filters = JSON.parse(pageFilters)
    filterSqls = Object.values(filters)
    filterHeadings = Object.keys(filters)
  }

  useEffect(() => {
    const updatedQuery = query.replace('{', '').replace('}', '')
    //console.log('updatedQuery', updatedQuery)
    getData(updatedQuery).then(({ data }) => {
      //console.log('data', data.rows)
      setTableData(data.rows)
    })

    if(filterSqls) {
      getAllData(filterSqls).then(responses => {
        setFilterDropdowns(responses)
      })
    }
    
  }, [query, filterSqls]);

  const columns = tableData.length ? Object.keys(tableData[0]).map((i) => ({
    title: i,
    dataIndex: i,
    key: i,
  })) : [];

  return (
    <>
      <Wrapper>
        {filterDropdowns.map((filterDropdown, index) => {
          return <FilterDropdown key={index} filterDropdownItems={filterDropdown} filterHeading={filterHeadings[index]}/>
        })}
      </Wrapper>
      <Table dataSource={tableData} columns={columns} rowKey="cartodb_id" />
    </>
  );
};

export default TableElement;

