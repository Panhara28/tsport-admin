/* eslint-disable @next/next/no-css-tags */
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

  const invoiceNum = String(data.id).padStart(6, '0');

  const dom = (
    <div>
      <link type="text/css" rel="stylesheet" href="/style.css" />
      <div className="invoice">
        <div className="header">
          <div>
            <img src="/favicon.png" alt="Logo" style={{ width: 75, height: 75, objectFit: 'cover' }} />
          </div>
          <div className="info">
            <b>ធីស្ពតកម្ពុជា T-Sport Cambodia</b>
            <br />
            <span>អាស័យដ្ឋាន: #30C, St.70 Sangkat Srah Chak, Khan Doun Penh, Phnom Penh</span>
            <br />
            <span>លេខទូរស័ព្ទ: 098 84 74 27 / 010 51 03 53 / 089 345 679 / 088 999 5534</span>
          </div>
        </div>
        <br />
        <div className="body">
          <h3>វិក្កយបត្រ / INVOICE</h3>
          <br />
          <div className="info_customer">
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>អតិថិជន</td>
                    <td>{data.customer.display}</td>
                  </tr>
                  <tr>
                    <td>អាស័យដ្ឋាន</td>
                    <td>{data.details[0].address}</td>
                  </tr>
                  <tr>
                    <td>លេខទូរស័ព្ទ</td>
                    <td>+855{data.customer.phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <b>លេខ​វិក្កយបត្រ: {invoiceNum}</b>
              <br />
              <span>កាលបរិច្ឆេទចេញ: {data.date}</span>
            </div>
          </div>
        </div>
        <br />
        <table className="table_product">
          <thead>
            <tr>
              <th>No</th>
              <th>Barcode</th>
              <th>Description</th>
              <th style={{ width: 100 }}>Size-Color</th>
              <th>Quantity</th>
              <th style={{ width: 150 }}>Unit Price</th>
              <th style={{ width: 150 }}>After Dis</th>
              <th style={{ width: 150 }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.details.map((x: any, i: any) => {
              return (
                <tr key={x.id}>
                  <td>{i + 1}</td>
                  <td>{x.sku.barcode}</td>
                  <td>{x.product.title}</td>
                  <td>
                    <small>Size: {x.sku.size}</small>
                    <br />
                    <small>Color: {x.sku.color}</small>
                  </td>
                  <td>{x.qty}</td>
                  <td>
                    <b>${x.price}</b>
                  </td>
                  <td>
                    <b>${(Number(x.total) / Number(x.qty)).toFixed(2)}</b>
                  </td>
                  <td>
                    <b>${x.total}</b>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} rowSpan={5} style={{ textAlign: 'left' }}>
                <small>- ទំនិញដែលទិញហើយមិនអាចប្តូរជាលុយវិញបានទេ</small>
                <br />
                <small>
                  -
                  អតិថិជនបោះដុំអាចបង្វិលទំនិញដែលមានបញ្ហាខុសពីការកម្ម៉ុងក្នុងរយះពេល១ខែដោយគិតចាប់ពីថ្ងៃទិញនិងភ្ចាប់វិក្កយបត្រមកជាមួយ
                </small>
                <br />
                <small>- ការវេរលុយអាចផ្ញើរតាម TrueMoney, Wing, ឬតាមធនាគារ(ABA, ACLEDA)</small>
              </td>
              <td>
                <small>Sub-Total</small>
              </td>
              <td colSpan={2}>
                <b>R {Number(data.amount) * 4100}</b>
              </td>
              <td>
                <b>${data.amount}</b>
              </td>
            </tr>
            <tr>
              <td>
                <small>Discount</small>
              </td>
              <td colSpan={2}>
                <b>R {(Number(data.total) - Number(data.amount)) * 4100}</b>
              </td>
              <td>
                <b>${Number(data.total) - Number(data.amount)}</b>
              </td>
            </tr>
            <tr>
              <td>
                <small>After Discount</small>
              </td>
              <td colSpan={2}>
                <b>R {Number(data.total) * 4100}</b>
              </td>
              <td>
                <b>${data.total}</b>
              </td>
            </tr>
            <tr>
              <td>
                <small>Deposit</small>
              </td>
              <td colSpan={2}>
                <b></b>
              </td>
              <td>
                <b></b>
              </td>
            </tr>
            <tr>
              <td>
                <small>Balance</small>
              </td>
              <td colSpan={2}>
                <b></b>
              </td>
              <td>
                <b></b>
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="sign">
          <div>
            Approved By
            <hr />
          </div>
          <div>
            Stock
            <hr />
          </div>
          <div>
            The Seller
            <hr />
          </div>
          <div>
            Customer
            <hr />
          </div>
        </div>
      </div>
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
