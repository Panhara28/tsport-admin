export function ReadFileExcel(e: File, callback: (e: any[]) => void) {
  const extension = e.name.split('.')[e.name.split('.').length - 1];

  if (extension === 'xlsx') {
    const read = new FileReader();
    const items: any[] = [];

    read.onload = () => {
      // @ts-ignore
      import('xlsx').then(xlsx => {
        const workbook = xlsx.read(read.result, {
          type: 'binary',
        });
        workbook.SheetNames.forEach((sheet: any) => {
          const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
          rows.map((x: any) => {
            items.push({
              ...x,
            });
            return items;
          });
          callback(items);
        });
      });
    };

    read.readAsBinaryString(e);
  }
}
