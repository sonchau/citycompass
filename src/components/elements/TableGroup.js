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
  const {grouping, showing} = JSON.parse(options)
  // {"grouping": ["base_year", "comparison_year"],
  // "showing":["category", "population"]}         
  //console.log(selectedFilters, 'updatedSql', updatedSql, 'grouping', grouping, 'showing', showing)
  const params = arrayToObject(selectedFilters);
  const [getData, results, errorMessage] = useApi(updatedSql, params)

  useEffect(() => {
    getData(query, params)
  }, [selectedFilters]);
  //console.log('results', results)

  return errorMessage ? 
      <p>{errorMessage}</p> : 
      (results.length && selectedFilters.length &&
      <Wrapper>
        <Table bordered dataSource={results} rowKey="key">
          { showing.map((show) => {
            //console.log('show', show)
            return <Column align="center" title={makeHeading(show)} dataIndex={show} key={show} />
          })}
          { grouping.map((group) => {
              const groupValue = _.find(selectedFilters, group)[group]
              //console.log('groupValue', groupValue)
              return (<ColumnGroup title={groupValue}>
              <Column align="center" title="Value" dataIndex={`_${groupValue}`} key={`_${groupValue}`} />
              <Column align="center" title="Percentage" dataIndex="percentage" key="percentage" />
            </ColumnGroup>)
            })
          }
          <Column align="center" title="Change" key="change" 
            render={(record) => {
              const output = grouping.reduce((memo, group, index) => {
                  const groupValue = _.find(selectedFilters, group)[group]
                  const recordValue = record[`_${groupValue}`]
                  //console.log('record',record,'groupValue', groupValue, 'recordValue', recordValue, 'out',  memo - parseInt(recordValue, 10))
                  return (index === 0) ?  memo + recordValue : memo - recordValue
                }, 0)
              return <p>{output}</p>
              }
            }
          />
        </Table>
      </Wrapper> 
      )
};

export default TableGroup;

