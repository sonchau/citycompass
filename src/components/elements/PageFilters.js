import React, { useState, useEffect, useContext } from "react";
import { getAllData } from "../../utils/common";
import FilterDropdown from "../common/FilterDropdown";
import styled from "styled-components";
import PageFiltersContext from "../../views/PageFiltersContext";

const Wrapper = styled.div`
  padding: 1rem;
  background: ${(props) => props.theme.filterPanel};
`;

const PageFilters = ({ pageFilters }) => {
  const [filterDropdowns, setFilterDropdowns] = useState([]);
  let filterSqls = [],
    filterHeadings = [];

  if (pageFilters.length) {
    [pageFilters].log("pageFilters");
    const filters = JSON.parse(pageFilters);
    filterSqls = Object.values(filters);
    filterHeadings = Object.keys(filters);
  }

  const { selectedFilters, setSelectedFilters } = useContext(
    PageFiltersContext
  );

  useEffect(() => {
    if (filterSqls) {
      [filterSqls].log("filterSqls");
      getAllData(filterSqls, {}).then((responses) => {
        [responses].log("setFilterDropdowns");
        setFilterDropdowns(responses);

        // initially filers aren't set
        if (!selectedFilters || !selectedFilters.length) {
          // array does not exist, is not an array, or is empty
          setSelectedFilters(responses.map((i) => i[0]));
        }
      });
    }
  }, []);

  return (
    <Wrapper>
      {selectedFilters.length &&
        filterDropdowns.map((filterDropdown, index) => (
          <FilterDropdown
            key={index}
            filterItems={filterDropdown}
            filterHeading={filterHeadings[index]}
            selectedItem={selectedFilters[index]}
          />
        ))}
    </Wrapper>
  );
};

export default PageFilters;
