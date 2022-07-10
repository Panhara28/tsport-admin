export function format_imports_exports_bar(importsEachYear?: any, exportsEachYear?: any, filterData?: number) {
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
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function(val: any) {
            return '$ ' + val + ' thousands';
          },
        },
        enabled: true,
        theme: 'dark',
      },
    },
  };

  if (filterData === 1) {
    let export_data: any = {
      name: 'exports',
      data: [],
    };

    for (const x of exportsEachYear) {
      export_data.data.push(x.value);

      data.options.xaxis.categories.push(x.year);
    }

    data.options.colors = ['#FAB117'];

    data.series = [export_data];

    return data;
  } else if (filterData === 2) {
    let import_data: any = {
      name: 'imports',
      data: [],
    };

    for (const y of importsEachYear) {
      import_data.data.push(y.value);
    }

    data.options.colors = ['#008FFB'];

    data.series = [import_data];

    return data;
  } else {
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

    data.options.colors = ['#FAB117', '#008FFB'];

    data.series.push(export_data, import_data);

    return data;
  }
}
