import numeral from 'numeral';

export const barChartOptions = {

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
        }
      }]
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
          let total = data.datasets[tooltipItem.datasetIndex].lineTension;
          let percentage = numeral(item/total).format('0.00%');
          return `${numeral(item).format('0,0')} (${percentage})` ;
        },
      }
    }
  }