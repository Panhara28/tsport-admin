import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Button } from 'react-bootstrap';
import { options } from './options';
// import 'toastr/build/toastr.min.css';
import { useLoadData, useSaveCallback, useSetData } from '../../hook/hook';
const Editor: any = dynamic(() => import('./EditorJS').then(mod => mod.EditorContainer), { ssr: false });

type FormEditorType = {
  dataKey?: string;
  data?: any;
  editDataKey?: any;
  id?: any;
};

export default function FormEditor({ dataKey, data, editDataKey, id }: FormEditorType) {
  const [editor, setEditor] = useState(null);
  const [changed, setChanged] = useState(false);

  // save handler
  const onSave = useSaveCallback(editor, dataKey ? dataKey : editDataKey);

  // load data
  const { item, load } = useLoadData(dataKey);

  // set saved data
  useSetData(editor, item);

  // clear data callback
  // const clearData = useClearDataCallback(editor);

  useEffect(() => {
    if (changed === true) {
      setTimeout(() => {
        onSave();
        setChanged(false);
        // toastr.success("Saved Draft!")

        if (id) {
          localStorage.setItem('usedNews', id + '');
        }
      }, 2000);
    }
  }, [editor, changed]);

  const disabled = editor === null || load;

  return (
    <>
      <main className="mainEditor" style={{ width: '100%' }}>
        <div className="editorContainer">
          <Editor
            reInit
            editorRef={setEditor}
            options={{ ...options, onChange: () => setChanged(true) }}
            data={dataKey ? item : data}
          />
        </div>
      </main>

      <style jsx>{`
        .container {
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .editorContainer {
          width: 94%;
          margin-bottom: 10px;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        a,
        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        a:hover,
        .title a:hover,
        a:focus,
        .title a:focus,
        a:active,
        .title a:active {
          text-decoration: underline;
        }

        .button-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
          padding-bottom: 10px;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono,
            Courier New, monospace;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
