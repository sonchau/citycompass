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

  const [taleData, setTableData] = useState([])
  const [filterDropdowns, setFilterDropdowns]= useState([])
  
  let filterSqls = null
  if (pageFilters) {
    const filters = JSON.parse(pageFilters)
    filterSqls = Object.values(filters)
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
    
  }, [query]);

  let columns;
  if (taleData.length > 0) {
    columns = Object.keys(taleData[0]).map(i => {
      if (i.includes('foo') || i.includes('bar')) return { title: i, dataIndex: i, key: i }
    }).filter(i => i !== undefined)
  }

  return (
    <>
      <Wrapper>
        {filterDropdowns.map(filterDropdown => {
          return <FilterDropdown filterDropdownItems = {filterDropdown} />
        })}
      </Wrapper>
      <Table dataSource={taleData} columns={columns} />
    </>
  );
};

export default TableElement;

