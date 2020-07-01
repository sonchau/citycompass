import React, { useEffect } from "react";
import { Table } from "antd";
import { arrayToObject, replaceSqlContent } from "../../utils/common";
import {useApi} from '../../utils/hooks';
import {makeHeading} from '../../utils/common';
import _ from 'lodash';

const { Column, ColumnGroup } = Table;

const TableGroup = ({ query, selectedFilters, options }) => {
  const updatedSql = replaceSqlContent(selectedFilters, query)
  const {grouping} = JSON.parse(options)
  //console.log(selectedFilters, 'updatedSql', updatedSql, 'options', grouping)
  const params = arrayToObject(selectedFilters);
  const [getData, results, errorMessage] = useApi(query, params)

  useEffect(() => {
    getData(query, params)
  }, [selectedFilters]);
  //console.log('results', results)

  return errorMessage ? 
      <p>{errorMessage}</p> : 
      <Table bordered dataSource={results} rowKey="key">
      <Column title="Category" dataIndex="category" key="category" />
        {
          grouping.map((group) => {
          const groupValue = _.find(selectedFilters, group)[group]
          //console.log('groupValue', groupValue)
          return (<ColumnGroup title={groupValue}>
          <Column title="Value" dataIndex={`_${groupValue}`} key={`_${groupValue}`} />
          <Column title="Percentage" dataIndex="percentage" key="percentage" />
        </ColumnGroup>)
        })
      }
        <Column title="Change" key="change" 
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
};

export default TableGroup;

