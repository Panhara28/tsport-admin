export function TransformDataEditorJS(data: any) {
  const blocks: any[] = [];

  data.blocks.map((item: any) => {
    if (item.type === 'paragraph') {
      const find = item.data.text.indexOf('</a>');
      if (find > -1) {
        const doc: any = new DOMParser().parseFromString(item.data.text, 'text/xml');
        const text: string = doc.firstChild.innerHTML;
        const link = doc.firstChild.getAttribute('href');
        blocks.push({
          ...item,
          type: 'link',
          data: {
            text,
            hyperlink: link,
          },
        });
      } else {
        blocks.push(item);
      }
    } else {
      blocks.push(item);
    }
  });

  const result = {
    ...data,
    blocks,
  };

  return result;
}
