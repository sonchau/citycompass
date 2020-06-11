import React from 'react';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {makeHeading} from '../../utils/common';
import styled from "styled-components";

const Wrapper = styled.a`
padding: 0 2rem;
`
const FilterDropdown = ({filterDropdownItems, filterHeading}) => {
  
  const dropdownItems = filterDropdownItems.map(filterDropdownItem => {
    return Object.values(filterDropdownItem)[0]
  })
  //console.log('filterDropdownItems',filterDropdownItems,'dropdownName', dropdownName, ';dropdownItems', dropdownItems)
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  
  const menu = () => {
    return (<Menu onClick={onClick}>
      { 
        dropdownItems.map((dropdownItem, index) => {
        return <Menu.Item key={index}>{dropdownItem}</Menu.Item>
        })
      }
    </Menu>
    )
  }
  
  return (
    <Wrapper>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {makeHeading(filterHeading)} <DownOutlined />
        </a>
      </Dropdown>
    </Wrapper>
  )
}
export default FilterDropdown