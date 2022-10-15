import React from 'react';

interface Props {
  data: any[];
  start: string;
  end: string;
}

// Record data from 2022-10-01 to 2022-10-31, all 14 to download Excel.

export function DownloadExcel({ data, start, end }: Props) {
  const onClickDownloadExcel = () => {
    if (data) {
      const confirm = window.confirm(`Record data from ${start} to ${end}, all ${data.length} to download excel.`);
      if (confirm) {
        import('xlsx').then(xlsx => {
          let ws = xlsx.utils.json_to_sheet(data);
          let wb = xlsx.utils.book_new();
          xlsx.utils.book_append_sheet(wb, ws, 'Report');
          xlsx.writeFile(wb, 'report.xlsx', {
            cellStyles: true,
          });
        });
      }
    }
  };

  return (
    <button className="btn btn-sm btn-success" onClick={onClickDownloadExcel}>
      Download Excel
    </button>
  );
}
