import numeral from 'numeral';

export const barChartItemStyles = [
    {
        backgroundColor: 'rgba(233,130,68,1)',
        borderColor: 'rgba(233,130,68,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(233,130,68,1)',
        hoverBorderColor: 'rgba(233,130,68,1)',
    },
    {
        backgroundColor: 'rgba(78,115,190,1)',
        borderColor: 'rgba(78,115,190,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(78,115,190,1)',
        hoverBorderColor: 'rgba(78,115,190,1)',
    },
    {
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,1)',
        hoverBorderColor: 'rgba(255,99,132,1)',
    }
]
export const barChartOptions = (xAxes, yAxes) => {
    return {
      maintainAspectRatio: false,
      legend: {
         display: true,
       },
       responsive: false,
       intersect: true,
       chartArea: {
         backgroundColor: 'rgba(255, 255, 255, 1)'
       },
       
      scales: {
        xAxes: [{
          ticks: {
            callback: (value) => {
                return numeral(value).format('0,0');
            }
          },
          scaleLabel: {
            display: true,
            labelString: xAxes,
            fontStyle: 'bold',
            fontSize: 16
          }
        }
      ],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: yAxes,
            fontStyle: 'bold',
            fontSize: 16
          }
        }],
      },
      "tooltips": {
        "enabled": true,
        "mode": "label",
        "intersect": false,
        "displayColors": false,
        "callbacks": {
          title: (tooltipItem, data) => {
            return '';
          },
          label: (tooltipItem, data) => {
            let item = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            return `${numeral(item).format('0,0')}` ;
          },
        }
      }
    }

  }
