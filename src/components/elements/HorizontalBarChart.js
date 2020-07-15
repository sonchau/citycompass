import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import {barChartOptions} from '../../utils/chart';
import StyledHorizontalBarChart from '../../styled/Components/StyledHorizontalBarChart';
import {useApi} from '../../utils/hooks';
import {makeChartLabel, makeChartDataSets, arrayToObject, replaceSqlContent} from '../../utils/common';
import {makeHeading} from '../../utils/common';

const HorizontalBarChart = ({ query, selectedFilters, options }) => {
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
    //console.log('results', results, 'label', label, 'datasets', datasets, 'chartLabel', chartLabel, 'chartDataSets', chartDataSets)
    return errorMessage ? 
    <p>{errorMessage}</p> :
    (
        <StyledHorizontalBarChart>
            <HorizontalBar download={true} redraw={true} data={data} 
            width={800}
            height={400} 
            options={barChartOptions(makeHeading(value), makeHeading(label))} />
        </StyledHorizontalBarChart>
    );
}

export default HorizontalBarChart

