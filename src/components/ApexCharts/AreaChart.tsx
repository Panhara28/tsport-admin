import moment from 'moment';
import dynamic from 'next/dynamic';
import React from 'react';

const ReactApexChart: any = dynamic(() => import('react-apexcharts'), { ssr: false });
export class AreaChart extends React.Component {
  constructor(props: any) {
    super(props);
    
    this.state = {
      
      series: [{
        name: 'PRODUCT A',
        data: [5, 10, 15, 9, 17, 13, 16, 25],
        // data: dataSet[0]
      }, 
      {
        name: 'PRODUCT B',
        data: [2, 4, 15, 6, 10, 13, 8, 25],
      },
      ],
      options: {
        chart: {
          type: 'area',
          stacked: false,
          width: 100,
          height: 120,
          zoom: {
            enabled: false
          },
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 5,
        },
        fill: {
          type: 'gradient',
          gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.45,
              opacityTo: 0.05,
              stops: [20, 10, 10, 10]
            },
        },
        yaxis: {
          labels: {
              style: {
                  colors: '#8e8da4',
              },
              offsetX: 0,
              // formatter: function(val: any) {
              //   return (val / 1000000).toFixed(2);
              // },
          },
          axisBorder: {
              show: false,
          },
          axisTicks: {
              show: false
          }
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 5,
          min: new Date("01/01/2022").getTime(),
          max: new Date("01/20/2022").getTime(),
          labels: {
              rotate: -15,
              rotateAlways: true,
              formatter: function(val: any, timestamp: any) {
                return moment(new Date(timestamp)).format("DD MMM YYYY")
            }
          }
        },
        tooltip: {
          shared: true
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          offsetX: -10
        }
      },
    
    
    };
  }



  render() {
    return (     

      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="area" />
      </div>
    );
  }
}

// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);