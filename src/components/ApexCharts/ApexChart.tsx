import dynamic from 'next/dynamic';
import React from 'react';

const ReactApexChart: any = dynamic(() => import('react-apexcharts'), { ssr: false });

type Props = {
  options: any;
  series: any[];
  type: string;
};

export class LineChart extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.props.options} series={this.props.series} type={this.props.type} />
      </div>
    );
  }
}
