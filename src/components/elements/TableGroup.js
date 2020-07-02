import React, { useEffect } from "react";
import { Table } from "antd";
import { arrayToObject, replaceSqlContent } from "../../utils/common";
import {useApi} from '../../utils/hooks';
import {makeHeading} from '../../utils/common';
import _ from 'lodash';
import styled from "styled-components";
const { Column, ColumnGroup } = Table;

const Wrapper = styled.table`
  width: 100%;
  .ant-table-thead > tr > th {
    background-color: ${(props) => props.theme.tableHeader};
    color: ${(props) => props.theme.white};
  }
`;

  //padding: 1rem;
  //background: ${(props) => props.theme.filterPanel};
const TableGroup = ({ query, selectedFilters, options }) => {
  const updatedSql = replaceSqlContent(selectedFilters, query)
  const {before, grouping, after} = JSON.parse(options)
  // {"grouping": ["base_year", "comparison_year"],
  // "showing":["category", "population"]}         
  //console.log(selectedFilters, 'updatedSql', updatedSql, 'grouping', grouping, 'showing', showing)
  const params = arrayToObject(selectedFilters);
  const [getData, results, errorMessage] = useApi(updatedSql, params)

  useEffect(() => {
    getData(query, params)
  }, [selectedFilters]);
  //console.log('selectedFilters',selectedFilters,'results', results)

  return errorMessage ? 
      <p>{errorMessage}</p> : 
      (results.length && selectedFilters.length &&
      <Wrapper>
        <Table bordered dataSource={results} rowKey="key">
          { before.map((beforeItem) => {
            //console.log('show', show)
            return <Column align="center" title={makeHeading(beforeItem)} dataIndex={beforeItem} key={beforeItem} />
          })}
          { grouping.map((group) => {
            
            const key = Object.keys(group)[0]
            const groupValue = _.find(selectedFilters, key)[key]
            const groupPercent = `${groupValue} (%)`
            //console.log('group', group, 'groupValue', groupValue, 'groupPercent', groupPercent)
              return (
                <ColumnGroup title={groupValue}>
                  <Column align="center" title="Number" dataIndex={groupValue} key={groupValue} />
                  <Column align="center" title="%" dataIndex={groupPercent} key={groupPercent} />
                </ColumnGroup>
              )
            })
          }
          { after.map((afterItem) => {
            //console.log('show', show)
            return <Column align="center" title={makeHeading(afterItem)} dataIndex={afterItem} key={afterItem} />
          })}

        </Table>
      </Wrapper> 
      )
};

export default TableGroup;

