export const area = {
  series: [
    {
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  options: {
    chart: {
      height: 150,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z',
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  },
};

export const lineData = {
  series: [
    {
      name: 'Desktops',
      data: [5, 10, 15, 9, 17, 13, 16, 25],
    },
  ],
  options: {
    chart: {
      width: 100,
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

export const balanceData = {
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

export const country_selection = [
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Cambodia', label: 'Cambodia' },
  { value: 'Vietnam', label: 'Vietnam' },
];
