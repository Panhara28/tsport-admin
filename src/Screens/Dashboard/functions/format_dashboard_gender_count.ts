export function format_dashboard_gender_count(total_employee?: any, category?: any) {
  const data: any = {
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      colors: [],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [],
      },
      yaxis: {},
      fill: {
        opacity: 1,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function(val: any) {
            return val.toString();
          },
        },
        theme: 'dark',
      },
    },
  };

  let male_data: any = {
    name: 'male',
    data: [],
  };

  let female_data: any = {
    name: 'female',
    data: [],
  };

  male_data.data.push(total_employee?.total_male);

  data.options.xaxis.categories.push(category ? category : 'Total Employees Gender');

  female_data.data.push(total_employee?.total_female);

  data.options.colors = ['#FAB117', '#008FFB'];

  data.series.push(male_data, female_data);

  return data;
}
