/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import moment from 'moment';
import Link from 'next/link';
import { Table } from 'react-bootstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';

const QUERY = gql`
  query summaryReport($start: String, $end: String) {
    summaryReport(start: $start, end: $end)
  }
`;

const dummy = [
  {
    id: 'total_order',
    text: 'Total Order',
    bg: 'bg-primary',
  },
  {
    id: 'total_sell',
    text: 'Total Sells',
    bg: 'bg-success',
  },
  {
    id: 'total_return',
    text: 'Total Return',
    bg: 'bg-danger',
  },
  {
    id: 'order_pending',
    text: 'Order Pending',
    bg: 'bg-warning',
  },
  {
    id: 'order_process',
    text: 'Order Processing',
    bg: 'bg-info',
  },
  {
    id: 'order_delivered',
    text: 'Order Delivered',
    bg: 'bg-secondary',
  },
  {
    id: 'customers',
    text: 'Customer',
  },
  {
    id: 'users',
    text: 'User',
  },
  {
    id: 'products',
    text: 'of products',
  },
];

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
      product
      customer
    }

    customerReport(start: $start, end: $end, offset: $offset, limit: $limit)
    productReport(start: $start, end: $end, offset: $offset, limit: $limit)
  }
`;

const now = new Date();
const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function ReportList() {
  const { data, loading } = useQuery(QUERY_REPORT, {
    variables: {
      start: moment(firstDay).format('YYYY-MM-DD'),
      end: moment(lastDay).format('YYYY-MM-DD'),
      offset: 0,
      limit: 5,
    },
  });

  if (loading || !data) return <div></div>;

  return (
    <div className="row">
      <div className="col-md-6">
        <Card>
          <CardBody>
            <Table responsive className="table-centered table-nowrap mb-0" hover>
              <thead>
                <tr>
                  <th colSpan={3}>
                    Order from {moment(firstDay).format('YYYY-MM-DD')} to {moment(lastDay).format('YYYY-MM-DD')}
                  </th>
                  <th style={{ textAlign: 'right' }}>
                    <Link href={'/report/order'}>
                      <a className="btn btn-sm btn-primary">Show more</a>
                    </Link>
                  </th>
                </tr>
                <tr>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Unit</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.orderReport.map((x: any) => {
                  return (
                    <tr key={x.id}>
                      <td>
                        <small>{x.customer.display}</small>
                      </td>
                      <td>
                        <img
                          src={x.product.picture}
                          alt=""
                          style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: 3 }}
                        />
                      </td>
                      <td>
                        <small>{x.qty}</small>
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
      <div className="col-md-6">
        <Card>
          <CardBody>
            <Table responsive className="table-centered table-nowrap mb-0" hover>
              <thead>
                <tr>
                  <th colSpan={3}>
                    Customer from {moment(firstDay).format('YYYY-MM-DD')} to {moment(lastDay).format('YYYY-MM-DD')}
                  </th>
                  <th style={{ textAlign: 'right' }}>
                    <Link href={'/report/order'}>
                      <a className="btn btn-sm btn-primary">Show more</a>
                    </Link>
                  </th>
                </tr>
                <tr>
                  <th>Customer</th>
                  <th className="text-center">Type</th>
                  <th className="text-center">Completed</th>
                  <th className="text-center">Return</th>
                </tr>
              </thead>
              <tbody>
                {data.customerReport.map((x: any) => {
                  return (
                    <tr key={x.id}>
                      <td>
                        <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                          {x.profile && (
                            <img
                              src={x.profile}
                              alt=""
                              style={{ width: 30, height: 30, objectFit: 'cover', marginRight: 7, borderRadius: '50%' }}
                            />
                          )}
                          <div>
                            <small>{x.display}</small>
                            <br />
                            <small className="text-muted">+855{x.phone}</small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <small style={{ textTransform: 'uppercase' }}>{x.type}</small>
                      </td>
                      <td className="text-center">
                        <small>{currency.format(x.order_complete)}</small>
                        <br />
                        <small>Unit: {x.unit_complete}</small>
                      </td>
                      <td className="text-center">
                        <small>{currency.format(x.order_return)}</small>
                        <br />
                        <small>Unit: {x.unit_return}</small>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
      <div className="col-md-12">
        <Card>
          <CardBody>
            <Table responsive className="table-centered table-nowrap mb-0" hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th className="text-center">Stock</th>
                  <th className="text-center">Order</th>
                  <th className="text-center">Return</th>
                </tr>
              </thead>
              <tbody>
                {data.productReport.map((x: any) => {
                  return (
                    <tr key={x.id}>
                      <td>
                        <img
                          src={x.picture}
                          alt=""
                          style={{ width: 30, height: 30, objectFit: 'cover', marginRight: 7, borderRadius: 3 }}
                        />
                      </td>
                      <td>
                        <small>{x.title}</small>
                        <br />
                        <small className="text-primary">CODE: {x.code}</small>
                      </td>
                      <td>
                        <small>{currency.format(x.price)}</small>
                        <br />
                        <small>Hold Sale: {currency.format(x.price_hold_sale)}</small>
                        <br />
                        <small>Premium Price: {currency.format(x.price_premium)}</small>
                      </td>
                      <td>
                        <small>{x.discount}%</small>
                        <br />
                        <small>Hold Sale: {x.discount_hold_sale}%</small>
                        <br />
                        <small>Premium Discount: {x.discount_premium}%</small>
                      </td>
                      <td className="text-center">
                        <small>{x.stock}</small>
                      </td>
                      <td className="text-center">
                        <small>{currency.format(x.order_complete)}</small>
                        <br />
                        <small>Unit: {x.unit_complete}</small>
                      </td>
                      <td className="text-center">
                        <small>{currency.format(x.order_return)}</small>
                        <br />
                        <small>Unit: {x.unit_return}</small>
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
  );
}

export function DashboardScreen() {
  const { data, loading } = useQuery(QUERY);

  if (loading) return <div></div>;

  return (
    <Layout>
      <div className="page-content">
        <Breadcrumb breadcrumbItem="Dashboard" title={setting.title} />
        <hr />
        {data && (
          <div className="row">
            {dummy.map(x => {
              if (x.id === 'customers' || x.id === 'users') {
                return (
                  <div className="col-md-4" key={x.id}>
                    <div className={`card ${x.bg}`} style={{ height: 134, borderRadius: 7 }}>
                      <div className="card-body grow text-center">
                        <div>
                          <div
                            className="text-mute m-0 value"
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                          >
                            <span className="text-primary">
                              {' '}
                              <i className={`fa fa-${x.id === 'users' ? 'user-secret' : 'user'}`}></i>{' '}
                              {data.summaryReport[x.id].active}
                            </span>
                            <span>~</span>
                            <span className="text-danger">
                              {' '}
                              <i className={`fa fa-${x.id === 'users' ? 'user-injured' : 'user-times'}`}></i>(
                              {data.summaryReport[x.id].inactive})
                            </span>
                          </div>
                          <h6 className="text-mute m-0 label">{x.text}</h6>
                          {/* <h6 className='text-mute m-0 label'>{x.text}:</h6>
                          <h6 className='text-mute m-0 label'>- Active: #{data.summaryReport[x.id].active}</h6>
                          <h6 className='text-mute m-0 label'>- Inactive: #{data.summaryReport[x.id].inactive}</h6> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (x.id === 'products') {
                return (
                  <div className="col-md-4" key={x.id}>
                    <div className={`card ${x.bg}`} style={{ height: 134, borderRadius: 7 }}>
                      <div className="card-body grow text-center">
                        <div>
                          <h3 className="text-primary m-0 value">
                            #{data.summaryReport[x.id]} {x.text}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div className="col-md-4" key={x.id}>
                  <div className={`card ${x.bg}`} style={{ height: 134, borderRadius: 7 }}>
                    <div className="card-body grow text-center">
                      <div>
                        <h3 className="text-light m-0 value">{currency.format(data.summaryReport[x.id])}</h3>
                        <h6 className="text-light m-0 label">{x.text}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <ReportList />
      </div>
    </Layout>
  );
}
