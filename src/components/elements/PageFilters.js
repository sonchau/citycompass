import React, { useState, useEffect } from "react";
import { Table } from 'antd'
import { getData, getAllData } from "../../utils/common";
import FilterDropdown from '../common/FilterDropdown'
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem;
  background: ${(props) => props.theme.filterPanel};
`;

const PageFilters = ({
  pageFilters
}) => {
  const [filterDropdowns, setFilterDropdowns]= useState([])
  
  let filterSqls = [], filterHeadings =[]
  if (pageFilters.length > 0) {
    const filters = JSON.parse(pageFilters)
    filterSqls = Object.values(filters)
    filterHeadings = Object.keys(filters)
  }
  useEffect(() => {
    if(filterSqls) {
      getAllData(filterSqls).then(responses => {
        setFilterDropdowns(responses)
      })
    }
  }, []);
  return (
    <>
      <Wrapper>
        {filterDropdowns.map((filterDropdown, index) => {
          return <FilterDropdown key={index} filterDropdownItems={filterDropdown} filterHeading={filterHeadings[index]}/>
        })}
      </Wrapper>
    </>
  );
};

export default PageFilters;

