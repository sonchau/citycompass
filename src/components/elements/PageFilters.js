import React, { useState, useEffect, useContext } from "react";
import { getAllData } from "../../utils/common";
import FilterDropdown from "../common/FilterDropdown";
import styled from "styled-components";
import PageFiltersContext from "../../context/PageFiltersContext";

const Wrapper = styled.div`
  padding: 1rem 1rem 1.5rem;
  margin-bottom: 1rem;
  background: ${(props) => props.theme.filterPanel};
  border-radius: 1rem;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 10;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.5);
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.5);
`;

const PageFilters = ({pageFilters}) => {
  const [filterDropdowns, setFilterDropdowns] = useState([]);
  const { selectedFilters, dispatch } = useContext(
    PageFiltersContext
  );
  let filterSqls = [],
    filterHeadings = [];

  if (pageFilters.length) {
    const filters = JSON.parse(pageFilters);
    filterSqls = Object.values(filters);
    filterHeadings = Object.keys(filters);
  }

  useEffect(() => {
    if (filterSqls) {
      getAllData(filterSqls, {}).then((responses) => {
        setFilterDropdowns(responses);

        // initially filers aren't set
        if (!selectedFilters || !selectedFilters.length) {
          // array does not exist, is not an array, or is empty
          const initFilters = responses.map((response) => response[0])
          // TODO: push params to history
          dispatch({type: 'SET_INIT_FILTERS', payload: initFilters})
        }
      });
    }
  }, []);

  return (
    <Wrapper>
      {filterDropdowns.length &&
        filterDropdowns.map((filterDropdown, index) => (
          <FilterDropdown
            key={index}
            filterItems={filterDropdown}
            filterHeading={filterHeadings[index]}
          />
        ))}
    </Wrapper>
  );
};

export default PageFilters;
