import React from 'react';
import { Menu } from 'antd';
import {makeHeading} from '../../utils/common';
import styled from "styled-components";
import { Select } from 'antd';

const { Option } = Select;

const Wrapper = styled.span`
  padding: 0 1rem;
`
const FilterDropdown = ({filterDropdownItems, filterHeading}) => {

  const dropdownItems = filterDropdownItems.map(filterDropdownItem => {
    return Object.values(filterDropdownItem)[0]
  })
  //console.log('filterDropdownItems',filterDropdownItems,'dropdownName', dropdownName, ';dropdownItems', dropdownItems)

  function onChange(value) {
    console.log(`selected ${value}`);
  }
  
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <Wrapper>
      <Select
        showSearch
        style={{ width: 150 }}
        placeholder={makeHeading(filterHeading)}
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {
          dropdownItems.map((dropdownItem, index) => {
          return <Option key={index}>{dropdownItem}</Option>
          })
        }
      </Select>
    </Wrapper>
  )
}
export default FilterDropdown