import React, { useContext } from "react";
import { Select, Space } from "antd";
import {
  updateFiltersFromDropdownEvent,
  makeUrlQueryString,
  makeHeading,
  getSelectedFilterValue
} from "../../utils/common";
import styled from "styled-components";
import PageFiltersContext from "../../context/PageFiltersContext";
import { useHistory } from "react-router-dom";

const { Option } = Select;

const Wrapper = styled.span`
  padding: 0 1rem;
`;

const Heading = styled.span`
  color: ${(props) => props.theme.filterPanelText};
`;
const FilterDropdown = ({ filterItems, filterHeading }) => {
  let history = useHistory();
  let filterValue =''

  const { selectedFilters, dispatch } = useContext(
    PageFiltersContext
  );
  if (selectedFilters.length) {
    filterValue = getSelectedFilterValue(filterItems, selectedFilters)
  }

  const onChange = (_, { value, title }) => {
    const newFilters = updateFiltersFromDropdownEvent(selectedFilters, {
      value,
      title,
    });
    const updatedFilters = dispatch({
      type: 'UPDATE_FILTERS',
      payload: {
        value,
        title,
      }
    })

    const urlQueryString = makeUrlQueryString(newFilters);
    history.push(urlQueryString);
  };

  return (
    <Wrapper>
    {
      filterValue && (
        <Space direction="vertical">
          <Heading>{makeHeading(filterHeading)}</Heading>
          <Select
            showSearch
            style={{ width: 200 }}
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            defaultValue={filterValue}
          >
            {filterItems.map((filterItem, index) => {
              return (
                <Option
                  title={Object.keys(filterItem)[0]}
                  key={index}
                  value={Object.values(filterItem)[0]}
                >
                  {Object.values(filterItem)[0]}
                </Option>
              );
            })}
          </Select>
        </Space>
      )
    }
    </Wrapper>
  );
};
export default FilterDropdown;
