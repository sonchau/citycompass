import React, { useEffect } from "react";
import { Table } from "antd";
import { arrayToObject, replaceSqlContent } from "../../utils/common";
import {useApi} from '../../utils/hooks';
import {makeHeading} from '../../utils/common';
import StyledTable from '../../styled/Components/StyledTable';
const { Column, ColumnGroup } = Table;

const TableGroup = ({ query, selectedFilters, options }) => {
  const updatedSql = replaceSqlContent(selectedFilters, query)
  const {before, grouping, after} = JSON.parse(options)
  // options is in the following format
  // {"before":["category"],
  // "grouping": [{"This can be text and {{column_name}}": ["column name 1", "column name 2)"]}, {"This can be text and other {{column_name}}": ["column name 3", "column name 4)"]}],
  // "after":["change"]
  // }    

  //console.log(selectedFilters, 'updatedSql', updatedSql, 'grouping', grouping)
  const params = arrayToObject(selectedFilters);
  const [getData, results, errorMessage] = useApi(updatedSql, params)

  useEffect(() => {
    getData(query, params)
  }, [selectedFilters]);
  //console.log('selectedFilters',selectedFilters,'results', results)

  return errorMessage ? 
      <p>{errorMessage}</p> : 
      (results.length && selectedFilters.length &&
      <StyledTable>
        <Table bordered dataSource={results} rowKey="key">
          { before.map((beforeItem) => {
            //console.log('show', show)
            return <Column align="center" title={makeHeading(beforeItem)} dataIndex={beforeItem} key={beforeItem} />
          })}
          { grouping.map((group, groupIndex) => {
            const key = Object.keys(group)[0]
            const values = Object.values(group)[0]
            const updatedKey = replaceSqlContent(selectedFilters, key)
            //console.log('group', group, 'key', key, 'updatedKey', updatedKey)
              return (
                <ColumnGroup key={groupIndex} title={updatedKey}>
                  {
                    values.map( (value, index) => {
                      const updatedValue = replaceSqlContent(selectedFilters, value)
                      //console.log('updatedValue', updatedValue)
                      return <Column align="center" title={updatedValue} dataIndex={updatedValue} key={updatedValue} />
                    })
                  }
                </ColumnGroup>
              )
            })
          }
          { after.map((afterItem) => {
            //console.log('show', show)
            return <Column align="center" title={makeHeading(afterItem)} dataIndex={afterItem} key={afterItem} />
          })}

        </Table>
      </StyledTable> 
      )
};

export default TableGroup;

