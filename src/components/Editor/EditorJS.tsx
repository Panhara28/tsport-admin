import React, { useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { tools } from './tools';
import { UploadImageEditorJs } from '../UploadImageEditorJs';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
/**
 *
 * @param {EditorJS.Tool[]} toolsList
 * @param {*} param1
 * @param {EditorJS.EditorConfig} options
 */
export const useEditor = (toolsList: any, { data, editorRef }: any, options = {}) => {
  const [editorInstance, setEditor] = useState(null);
  const { data: ignoreData, tools: ignoreTools, holder: ignoreHolder, ...editorOptions }: any = options;
  // initialize
  useEffect(() => {
    let url = process.env.NEXT_PUBLIC_API_URL;
    const uri = `${url}?token=` + localStorage.getItem('token');
    // create instance
    const editor: any = new EditorJS({
      /**
       * Id of Element that should contain the Editor
       */
      holder: 'editor-js',

      /**
       * Available Tools list.
       * Pass Tool's class or Settings object for each Tool you want to use
       */
      tools: {
        ...toolsList,
        linkTool: {
          class: LinkTool,
        },
        embed: Embed,
        image: {
          class: ImageTool,
          config: {
            types: 'image/*',
            buttonContent: "<div><i class='fal fa-image fa-lg' style='font-style: normal;'></i> Select an image</div>",
            endpoints: {
              byFile: `${uri}`, // Your backend file uploader endpoint
              byUrl: `${uri}`, // Your endpoint that provides uploading by Url
            },
            uploader: {
              /**
               * Upload file to the server and return an uploaded image data
               * @param {File} file - file selected from the device or pasted by drag-n-drop
               * @return {Promise.<{success, file: {url}}>}
               */
              uploadByFile: async (file: any) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                const res = await UploadImageEditorJs(file);
                return { success: 1, file: { url: res.singleUpload.url } };
              },
              uploadByUrl: (file: any) => {
                return { success: 1, file };
              },
            },
          },
        },
      },

      /**
       * Previously saved data that should be rendered
       */
      data: data || {},

      initialBlock: 'paragraph',

      // Override editor options
      ...editorOptions,
    });

    setEditor(editor);

    // cleanup
    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
          setEditor(null);
        })
        .catch((e: any) => console.error('ERROR editor cleanup', e));
    };
  }, [toolsList]);

  // set reference
  useEffect(() => {
    if (!editorInstance) {
      return;
    }
    // Send instance to the parent
    if (editorRef) {
      editorRef(editorInstance);
    }
  }, [editorInstance, editorRef]);

  return { editor: editorInstance };
};

export const EditorContainer: any = ({ editorRef, children, data, options }: any) => {
  useEditor(tools, { data, editorRef }, options);

  return (
    <React.Fragment>
      {!children && <div id="editor-js"></div>}
      {children}
      <style jsx>{`
        .container {
          width: 100%;
          padding: 2px 0;
          border: 2px dashed #dcdde1;
        }
      `}</style>
    </React.Fragment>
  );
};
