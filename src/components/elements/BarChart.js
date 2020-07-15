import React from 'react';
import {HorizontalBar, Bar} from 'react-chartjs-2';
import {barHorizontalChartOptions, barVerticalChartOptions} from '../../utils/chart';
import StyledBarChart from '../../styled/Components/StyledBarChart';
import {useApi} from '../../utils/hooks';
import {makeChartLabel, makeChartDataSets, arrayToObject, replaceSqlContent} from '../../utils/common';
import {makeHeading} from '../../utils/common';

const BarChart = ({ query, selectedFilters, options, chartType }) => {
    // options is in the following format
    // {"label":"category",
    // "datasets": "year",
    // "value": "value"
    // }
    const {label, datasets, value} = JSON.parse(options)
    const updatedSql = replaceSqlContent(selectedFilters, query)
    const params = arrayToObject(selectedFilters);
    const [getData, results, errorMessage] = useApi(updatedSql, params, selectedFilters)
    //console.log('query', query, 'selectedFilters', selectedFilters, 'options', options)
    const chartLabel = makeChartLabel(results, label)
    const chartDataSets = makeChartDataSets(results, datasets, value)
    const data = {
        labels: chartLabel,
        datasets: chartDataSets
    }
    //console.log('results', results, 'label', label, 'datasets', datasets, 'chartLabel', chartLabel, 'chartDataSets', chartDataSets, 'chartType', chartType)
    return errorMessage ? 
    <p>{errorMessage}</p> :
    (
        <StyledBarChart>
            {chartType === 'horizontalBarChart' ? 
                <HorizontalBar download={true} redraw={true} data={data} 
                width={800}
                height={400} 
                options={barHorizontalChartOptions(makeHeading(value), makeHeading(label))} />
            :  <Bar download={true} redraw={true} data={data} 
                width={1000}
                height={400} 
                options={barVerticalChartOptions(makeHeading(label), makeHeading(value))} />
            }
        </StyledBarChart>
    );
}

export default BarChart

