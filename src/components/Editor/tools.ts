import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Table from '@editorjs/table';
import Image from '@editorjs/image';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import EmbedTool from './plugins/editorjs/embed';

export const tools = {
  header: {
    class: Header,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  table: Table,
  image: Image,
  quote: Quote,
  marker: Marker,
  embedTool: EmbedTool,
};
