/* eslint-disable @typescript-eslint/ban-ts-comment */
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import react, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
//@ts-ignore
import { createPortal } from 'react-dom';

class ComponentToPrint extends react.Component<{ data: any[] }> {
  render(): react.ReactNode {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Barcode</th>
              <th>Description</th>
              <th>Size-Color</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>After Dis</th>
              <th>After Dis</th>
              <th>Amount</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

function PrintInternal({ data, timer }: { data: any; timer: string }, mainRef: any) {
  const [iframeBody, setIframeBody] = useState<HTMLElement | null | undefined>(null);

  const ref = useRef<HTMLIFrameElement>(null);
  useImperativeHandle(mainRef, () => ({
    print: () => ref?.current?.contentWindow?.print(),
  }));

  useEffect(() => {
    setIframeBody(ref.current?.contentWindow?.document?.body);
  }, [ref]);

  useEffect(() => {
    if (!!timer && !!ref.current) {
      if (!!ref.current.contentWindow) {
        ref.current.contentWindow.print();
      }
    }
  }, [ref, timer]);

  const dom = (
    <div>
      <div>
        <div>
          <img src="" alt="Logo" />
        </div>
        <div></div>
      </div>
      <div>
        <h3>INVOICE</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Barcode</th>
            <th>Description</th>
            <th>Size-Color</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>After Dis</th>
            <th>After Dis</th>
            <th>Amount</th>
          </tr>
        </thead>
      </table>
    </div>
  );

  return (
    <iframe ref={ref} style={{ width: '100%', display: 'none' }}>
      {iframeBody && createPortal(dom, iframeBody)}
    </iframe>
  );
}

const PrintReceipt = forwardRef(PrintInternal);
export default PrintReceipt;
