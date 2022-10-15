import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import moment from 'moment';
import { useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { CardBody } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';
import { DownloadExcel } from './downloadexcel';

const QUERY_REPORT = gql`
  query query($start: String, $end: String, $offset: Int = 0, $limit: Int = 10) {
    orderReport(start: $start, end: $end, offset: $offset, limit: $limit) {
      id
      order_id
      order_uuid
      qty
      price
      discount
      amount
      total
      status
      product
      customer
    }
  }
`;

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const now = new Date();
const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

export function OrderReportScreen() {
  const [startInput, setStartInput] = useState(moment(firstDay).format('YYYY-MM-DD'));
  const [endInput, setEndInput] = useState(moment(lastDay).format('YYYY-MM-DD'));
  const [start, setStart] = useState(moment(firstDay).format('YYYY-MM-DD'));
  const [end, setEnd] = useState(moment(lastDay).format('YYYY-MM-DD'));
  const { data, loading } = useQuery(QUERY_REPORT, {
    variables: {
      start,
      end,
      offset: 0,
      limit: 1000000,
    },
  });

  if (loading && !data) return <div></div>;

  const onClickReset = () => {
    setStartInput(moment(firstDay).format('YYYY-MM-DD'));
    setEndInput(moment(lastDay).format('YYYY-MM-DD'));
    setStart(moment(firstDay).format('YYYY-MM-DD'));
    setEnd(moment(lastDay).format('YYYY-MM-DD'));
  };

  const onClickFilter = () => {
    setStart(moment(startInput).format('YYYY-MM-DD'));
    setEnd(moment(endInput).format('YYYY-MM-DD'));
  };

  return (
    <Layout>
      <div className="page-content" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <Breadcrumb breadcrumbItem="Order Report" title={setting.title} />
        <br />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            value={startInput}
            onChange={e => setStartInput(e.currentTarget.value)}
            type="date"
            className="form-control form-control-sm"
            style={{ width: 250 }}
          />
          <i className="fa fa-play" style={{ marginLeft: '1rem', marginRight: '1rem' }}></i>
          <input
            value={endInput}
            onChange={e => setEndInput(e.currentTarget.value)}
            type="date"
            className="form-control form-control-sm"
            style={{ width: 250 }}
          />
          <button
            onClick={onClickFilter}
            className="btn btn-sm btn-primary"
            style={{ marginLeft: '1rem', marginRight: '1rem' }}
          >
            Filter
          </button>
          <button onClick={onClickReset} className="btn btn-sm btn-danger" style={{ marginRight: '1rem' }}>
            Reset
          </button>
          <DownloadExcel
            data={data.orderReport.map((x: any) => {
              return {
                'Customer Name': x.customer.display,
                'Customer Number': '+855' + x.customer.phone,
                'Product Code': x.product.code,
                'Product Stock': x.product.stock,
                'Order ID': x.order_id,
                'Order UUID': x.order_uuid,
                'Order Status': x.status,
                Price: currency.format(x.price),
                Qty: x.qty,
                Amount: currency.format(x.amount),
                Total: currency.format(x.total),
              };
            })}
            start={start}
            end={end}
          />
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <Card>
              <CardBody>
                <Table responsive className="table-centered table-nowrap mb-0" hover striped>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Order #</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Amount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.orderReport.map((x: any) => {
                      return (
                        <tr key={x.id}>
                          <td>
                            <small>{x.customer.display}</small>
                            <br />
                            <small>+855{x.customer.phone}</small>
                          </td>
                          <td>
                            <div style={{ display: 'flex' }}>
                              <img
                                src={x.product.picture}
                                alt=""
                                style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
                              />
                              <div style={{ marginLeft: 7 }}>
                                <small>{x.product.code}</small>
                                <br />
                                <small>Stock: {x.product.stock}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <small>#{x.order_id}</small>
                            <br />
                            <small>UUID: {x.order_uuid}</small>
                            <br />
                            <small className="badge bg-primary rounded-pill">{x.status}</small>
                          </td>
                          <td>
                            <small>{currency.format(x.price)}</small>
                          </td>
                          <td>
                            <small>{x.qty}</small>
                          </td>
                          <td>
                            <small>{currency.format(x.amount)}</small>
                          </td>
                          <td>
                            <small>{currency.format(x.total)}</small>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
