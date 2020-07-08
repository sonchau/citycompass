import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import {barChartOptions} from '../../utils/chart';
import StyledHorizontalBarChart from '../../styled/Components/StyledHorizontalBarChart';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const HorizontalBarChart = ({ query, selectedFilters, options }) => {
    return (
        <StyledHorizontalBarChart>
            <HorizontalBar download={true} redraw={true} data={data} 
            width={600}
            height={300} 
            options={barChartOptions} />
        </StyledHorizontalBarChart>
      );
}

export default HorizontalBarChart

