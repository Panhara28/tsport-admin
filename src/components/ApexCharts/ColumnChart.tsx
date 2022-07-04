import moment from 'moment';
import dynamic from 'next/dynamic';
import React from 'react';

const ReactApexChart: any = dynamic(() => import('react-apexcharts'), { ssr: false });
export class BalanceChart extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
    
      series: [{
        name: 'Net Profit',
        data: [44,  57, 56, 61, 58]
      }, {
        name: 'Revenue',
        data: [76, 85, 101,  87, 105]
      }, {
        name: 'Free Cash Flow',
        data: [35, 41, 36,  45, 48]
      }],
      options: {
        chart: {
          type: 'bar',
          width: 100,
          height: 120
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        // yaxis: {
        //   title: {
        //     text: '$ (thousands)'
        //   }
        // },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return "$ " + val + " thousands"
            }
          }
        }
      },
    
    
    };
  }



  render() {
    return (     

      <div id="chart">
      <ReactApexChart options={this.state.options} series={this.state.series} type="bar" />
      </div>

    );
  }
}

// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);