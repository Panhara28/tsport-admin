import dynamic from 'next/dynamic';
import React from 'react';

const ReactApexChart: any = dynamic(() => import('react-apexcharts'), { ssr: false });
export class LineChart extends React.Component {
  constructor(props:any) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Desktops',
          data: [5, 10, 15, 9, 17, 13, 16, 25],
        },
      ],
      options: {
        chart: {
          width : 100,
          height: 120,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        // title: {
        //   text: 'Product Trends by Month',
        //   align: 'left',
        // },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
        },
        // xaxis: {
        //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        // },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" />
      </div>
    );
  }
}


