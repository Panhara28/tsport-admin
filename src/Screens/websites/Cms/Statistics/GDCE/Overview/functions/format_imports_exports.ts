export function format_imports_exports(importsEachYear?: any, exportsEachYear?: any, filterData?: number) {
  function commafy(num: string) {
    let str = num.split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }

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
      colors: [],
      tooltip: {
        y: {
          formatter: function(val: any) {
            return '$ ' + commafy(val.toString());
          },
        },
        enabled: true,
        theme: 'dark',
      },
      dataLabels: {
        enabled: false,
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
      // markers: {
      //   size: 1,
      // },
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
      data.options.xaxis.categories.push(y.year);

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
