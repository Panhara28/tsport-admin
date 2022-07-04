import dynamic from 'next/dynamic';
import React from 'react';

const ReactApexChart: any = dynamic(() => import('react-apexcharts'), { ssr: false });
export class RevenueReports extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      series: [
        {
          name: 'TEAM A',
          type: 'column',
          data: [23, 11, 22, 27, 13, 22],
        },
        {
          name: 'TEAM B',
          type: 'area',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'TEAM C',
          type: 'line',
          data: [30, 25, 36, 30, 45, 35],
        },
      ],
      options: {
        chart: {
          width: 100,
          height: 70,
          type: 'line',
          stacked: false,
        },
        stroke: {
          width: [0, 2],
          curve: 'smooth',
        },
        plotOptions: {
          bar: {
            columnWidth: '50%',
          },
        },

        fill: {
          opacity: [0.85, 0.25, 1],
          // gradient: {
          //   inverseColors: false,
          //   shade: 'light',
          //   type: 'vertical',
          //   opacityFrom: 0.85,
          //   opacityTo: 0.55,
          //   stops: [0, 100],
          // },
        },
        // labels: [
        //   '01/01/2003',
        //   '02/01/2003',
        //   '03/01/2003',
        //   '04/01/2003',
        //   '05/01/2003',
        //   '06/01/2003',
        // ],
        
        tooltip: {
          shared: false,
          intersect: false,
          y: {
            formatter: function(y: any) {
              if (typeof y !== 'undefined') {
                return y.toFixed(0) + ' points';
              }
              return y;
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
      </div>
    );
  }
}

// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);
