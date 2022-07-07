export function format_imports_exports(importsEachYear: any, exportsEachYear: any) {
  const data: any = {
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#FAB117', '#008FFB'],
      tooltip: {
        enabled: true,
        theme: 'dark',
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['black', 'black'],
        },
      },
      stroke: {
        // curve: 'smooth',
      },
      title: {
        text: 'Reports',
        align: 'left',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['black', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Year',
        },
      },
      yaxis: {
        title: {
          text: 'Value USD',
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  };

  let export_data: any = {
    name: 'exports',
    data: [],
  };

  let import_data: any = {
    name: 'imports',
    data: [],
  };

  for (const x of exportsEachYear) {
    export_data.data.push(x.value);

    data.options.xaxis.categories.push(x.year);
  }

  for (const y of importsEachYear) {
    import_data.data.push(y.value);
  }

  data.series.push(export_data, import_data);

  console.log;

  return data;
}
