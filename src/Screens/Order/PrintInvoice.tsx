/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import react, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
//@ts-ignore
import { createPortal } from 'react-dom';
import { gql, useQuery } from '@apollo/client';

const QUERY = gql`
query settings{
  settings{
    id
    options{
      khrvalue
    }
  }
}
`

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

const currencyUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const currencyKHR = new Intl.NumberFormat('kh-KH', {
  style: 'currency',
  currency: 'KHR',
});

function PrintInternal({ data, timer }: { data: any; timer: string }, mainRef: any) {
  const { data: setting, loading } = useQuery(QUERY, {
    fetchPolicy: 'no-cache'
  });
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
  const khrvalue = setting ? Number(setting.settings.options.khrvalue) : 4000
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
              <table className="table_product">
                <tbody>
                  <tr>
                    <td>
                      <small>អតិថិជន/custoemr</small>
                    </td>
                    <td>
                      <small>{data.customer.display}</small>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small>អាស័យដ្ឋាន/Address</small>
                    </td>
                    <td>
                      <small>{data.details[0].address}</small>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small>លេខទូរស័ព្ទ/Telephone</small>
                    </td>
                    <td>
                      <small>+855{data.customer.phone}</small>
                    </td>
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
          <tbody>
            <tr>
              <td>
                <small>ល.រ</small>
                <br />
                <small>No</small>
              </td>
              <td>
                <small>លេខកូដ</small>
                <br />
                <small>Barcode</small>
              </td>
              <td>
                <small>បរិយាយ</small>
                <br />
                <small>Description</small>
              </td>
              <td style={{ width: 100 }}>
                <small>ទំហំ-ពណ៏</small>
                <br />
                <small>Size-Color</small>
              </td>
              <td>
                <small>បរិមាណ</small>
                <br />
                <small>Quantity</small>
              </td>
              <td style={{ width: 150 }}>
                <small>តម្លៃឯកតា</small>
                <br />
                <small>Unit Price</small>
              </td>
              <td style={{ width: 150 }}>
                <small>តម្លៃចុះហើយ</small>
                <br />
                <small>After Dis</small>
              </td>
              <td style={{ width: 150 }}>
                <small>តម្លៃសរុប</small>
                <br />
                <small>Amount</small>
              </td>
            </tr>
            {data.details.map((x: any, i: any) => {
              return (
                <tr key={x.id}>
                  <td>
                    <small>{i + 1}</small>
                  </td>
                  <td>
                    <small>{x.sku.barcode}</small>
                  </td>
                  <td>
                    <small>{x.product.title}</small>
                  </td>
                  <td>
                    <small>Size: {x.sku.size}</small>
                    <br />
                    <small>Color: {x.sku.color}</small>
                  </td>
                  <td>
                    <small>{x.qty}</small>
                  </td>
                  <td>
                    <b>
                      <small>{currencyUSD.format(Number(x.price || 0))}</small>
                    </b>
                  </td>
                  <td>
                    <b>
                      <small>{currencyUSD.format(Number(x.total) / Number(x.qty))}</small>
                    </b>
                  </td>
                  <td>
                    <b>
                      <small>{currencyUSD.format(x.total)}</small>
                    </b>
                  </td>
                </tr>
              );
            })}
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
                <b>
                  <small>{currencyKHR.format(Number(data.amount) * khrvalue)}</small>
                </b>
              </td>
              <td>
                <b>
                  <small>{currencyUSD.format(data.amount)}</small>
                </b>
              </td>
            </tr>
            <tr>
              <td>
                <small>Discount</small>
              </td>
              <td colSpan={2}>
                <b>
                  <small>{currencyKHR.format((Number(data.total) - Number(data.amount)) * khrvalue)}</small>
                </b>
              </td>
              <td>
                <b>
                  <small>{currencyUSD.format(Number(data.total) - Number(data.amount))}</small>
                </b>
              </td>
            </tr>
            <tr>
              <td>
                <small>After Discount</small>
              </td>
              <td colSpan={2}>
                <b>
                  <small>{currencyKHR.format(Number(data.total) * khrvalue)}</small>
                </b>
              </td>
              <td>
                <b>
                  <small>{currencyUSD.format(data.total)}</small>
                </b>
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
          </tbody>
        </table>
        <div className="sign">
          <div>
            <small style={{ whiteSpace: 'nowrap' }}>អនុម័តដោយ/Approved By</small>
            <hr />
          </div>
          <div>
            <small>ផ្នែកឃ្លាំង/Stock</small>
            <hr />
          </div>
          <div>
            <small>ផ្នែកលក់/The Seller</small>
            <hr />
          </div>
          <div>
            <small>អតិថិជន/Customer</small>
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
