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
export const barHorizontalChartOptions = (xAxes, yAxes) => {
    return {
      maintainAspectRatio: false,
      legend: {
         display: true,
         labels: {
          //fontColor: '#fff'
        }
      },
      responsive: false,
      intersect: true,
      chartArea: {
         backgroundColor: "rgb(33, 42, 52)",
         bottom: 150
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
            fontSize: 16,
          },
          gridLines: {
            color: 'rgb(62, 95, 119)',
            borderDash: [1, 5],
          },
        }
      ],
        yAxes: [
          {
          scaleLabel: {
            display: true,
            labelString: yAxes,
            fontStyle: 'bold',
            fontSize: 16,
          },
          ticks: {
            beginAtZero:true,
            fontColor: 'rgb(98, 112, 123)'
          },
          gridLines: {
            color: 'rgb(33, 42, 52)',
            borderDash: [1, 1000],
          },
        }
      ],
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

export const barVerticalChartOptions = (xAxes, yAxes) => {
  return {
    maintainAspectRatio: false,
    legend: {
        display: true,
        labels: {
        }
    },
    responsive: false,
    intersect: true,
    chartArea: {
      backgroundColor: "rgb(33, 42, 52)",
      bottom: 100
    },
      
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: xAxes,
          fontStyle: 'bold',
          fontSize: 16,
        },
        gridLines: {
          color: 'rgb(33, 42, 52)',
          borderDash: [1, 1000],
        },
      }],
      yAxes: [{
        ticks: {
          callback: (value) => {
              return numeral(value).format('0,0');
          },
          beginAtZero:true,
          fontColor: 'rgb(98, 112, 123)'
        },
        scaleLabel: {
          display: true,
          labelString: yAxes,
          fontStyle: 'bold',
          fontSize: 16,
        },
        gridLines: {
          color: 'rgb(62, 95, 119)',
          borderDash: [1, 5],
        },
      }],
     }
    ,
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
