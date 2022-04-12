export function ReverseDataEditorJS(data: any) {
  const blocks: any[] = [];

  data?.blocks?.map((item: any) => {
    if (item.type === 'link') {
      blocks.push({
        id: item.id,
        type: 'paragraph',
        data: {
          text: `<a href='${item.data.hyperlink}'>${item.data.text}</a>`,
        },
      });
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
