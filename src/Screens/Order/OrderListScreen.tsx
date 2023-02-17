/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
import { useMutation, useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { TsContent } from '../../components/Custom/TsContent';
import { groupOrder } from '../../libs/groupOrder';
import { BtnIcon } from '../../components/Form/ButtonIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { useRouter } from 'next/router';
import {
  ChangeStatusOrderMenu,
  OrderStatus,
  OrderStatusColor,
} from '../../components/Custom/Order/ChangeStatusOrderMenu';
import { Badge } from 'reactstrap';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import dynamic from 'next/dynamic';

// const DraftProduct = dynamic(() => import('../../components/Custom/Product/DraftProduct'), {
//   ssr: false,
// });

const PrintInvoice: any = dynamic(() => import('./PrintInvoice'), { ssr: false });

const QUERY = gql`
  query orderList($status: [OrderStatus]) {
    orderList(status: $status)
  }
`;

const MUTATION = gql`
  mutation changeOrderStatus($status: OrderStatus!, $orderItemId: Int!, $note: String, $fee: String) {
    changeOrderStatus(orderItemId: $orderItemId, status: $status, note: $note, fee: $fee)
  }
`;

function TabOrder({ tab, setTab }: { tab: any; setTab: any }) {
  return (
    <Nav pills>
      <NavItem>
        <NavLink
          href="#"
          onClick={() => {
            setTab('ORDER_RECEIVED');
          }}
          active={tab === 'ORDER_RECEIVED'}
          className={tab === 'ORDER_RECEIVED' ? 'bg-secondary' : ''}
        >
          Received
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="#"
          onClick={() => {
            setTab('ORDER_PROCESSING');
          }}
          active={tab === 'ORDER_PROCESSING'}
          className={tab === 'ORDER_PROCESSING' ? 'bg-info' : ''}
        >
          Processing
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="#"
          onClick={() => {
            setTab('DELIVERY');
          }}
          active={tab === 'DELIVERY'}
          className={tab === 'DELIVERY' ? 'bg-warning' : ''}
        >
          Delivery
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="#"
          onClick={() => {
            setTab('CONFIRM_PICK_UP');
          }}
          active={tab === 'CONFIRM_PICK_UP'}
          className={tab === 'CONFIRM_PICK_UP' ? 'bg-success' : ''}
        >
          Confirm
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="#"
          onClick={() => {
            setTab('RETURN');
          }}
          active={tab === 'RETURN'}
          className={tab === 'RETURN' ? 'bg-danger' : ''}
        >
          Return
        </NavLink>
      </NavItem>
    </Nav>
  );
}

export function OrderListScreen() {
  const [select, setSelect] = useState(0);
  const [tab, setTab] = useState('ORDER_RECEIVED');
  const [print, setPrint] = useState(null);
  const [timer, setTimer] = useState('');
  const [err, setErr] = useState(null);
  const { data, loading } = useQuery(QUERY, {
    variables: {
      status: tab === 'DELIVERY' ? ['READY_TO_DELIVERY', 'ORDER_DELIVERY'] : [tab],
    },
  });
  const [changeOrderStatus] = useMutation(MUTATION, {
    refetchQueries: ['orderList'],
    // onError: err => onError(err.message),
    // onCompleted,
  });

  if (loading) {
    return (
      <TsContent title="Order Management">
        <div></div>
      </TsContent>
    );
  }

  const orders = groupOrder(data && data.orderList);

  const onClickSetToDelivery = (id: number) => {
    const x = window.prompt('Input delivery fee ($)');

    if (x) {
      if (!isNaN(Number(x))) {
        changeOrderStatus({
          variables: {
            status: 'ORDER_DELIVERY',
            orderItemId: Number(id),
            fee: String(x),
          },
        });
      }
    }

    return;
  };

  return (
    <TsContent title="Order Management">
      <ToastContainer position="top-end" className="p-3" style={{ marginTop: '5%' }}>
        <Toast show={!!err} onClose={() => setErr(null)} autohide delay={3000} bg="danger">
          <Toast.Body>
            <small className="text-light">{err}</small>
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <TabOrder
        tab={tab}
        setTab={(e: any) => {
          setTab(e);
          setPrint(null);
        }}
      />
      <br />
      {orders.length > 0 && (
        <div className="row">
          <div className="col-md-3">
            <div>
              {orders.map((x, i) => {
                return (
                  <Card
                    style={{ cursor: 'pointer' }}
                    key={x.id}
                    color={select === i ? 'primary' : 'light'}
                    outline
                    onClick={() => setSelect(i)}
                  >
                    <CardBody style={{ padding: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          padding: '0.75rem 1.25rem',
                          borderStyle: 'solid',
                          borderBottomWidth: 1,
                          borderTopWidth: 0,
                          borderLeftWidth: 0,
                          borderRightWidth: 0,
                          borderColor: 'rgb(229,231,235)',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>
                          <b>Order</b>
                          <span>#{x.id}</span>
                        </span>
                        {x.status === 'READY_TO_DELIVERY' ? (
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => onClickSetToDelivery(x.details[0].id)}
                          >
                            Process Delivery
                          </button>
                        ) : (
                          <span>
                            <b>Customer</b> #{x.customer.phone ? x.customer.phone : x.customer.display}
                          </span>
                        )}
                      </div>
                      <div style={{ padding: '0.75rem 1.25rem' }}>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ width: '6rem' }}>Order Date</span>
                          <span style={{ marginRight: 'auto' }}>:</span>
                          <span style={{ marginRight: '0.25rem' }}>{x.date}</span>
                        </p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ width: '6rem' }}>Quantity</span>
                          <span style={{ marginRight: 'auto' }}>:</span>
                          <span style={{ marginRight: '0.25rem' }}>{x.qty}</span>
                        </p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <b style={{ width: '6rem' }}>Amount</b>
                          <b style={{ marginRight: 'auto' }}>:</b>
                          <b style={{ marginRight: '0.25rem' }}>${x.amount.toFixed(2)}</b>
                        </p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <b style={{ width: '6rem' }}>Delivery Fee</b>
                          <b style={{ marginRight: 'auto' }}>:</b>
                          <b style={{ marginRight: '0.25rem' }}>${x.fee.toFixed(2)}</b>
                        </p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <b style={{ width: '6rem' }}>Total Price</b>
                          <b style={{ marginRight: 'auto' }}>:</b>
                          <b style={{ marginRight: '0.25rem' }}>${Number(x.total + x.fee).toFixed(2)}</b>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="col-md-9">
            <Card>
              <CardBody style={{ padding: 0 }}>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>
                        Item <span style={{ textDecoration: 'underline' }}>Order #{orders[select].id}</span>
                      </th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Amount</th>
                      <th className="text-center">Total Price</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders[select].details.map((x: any) => {
                      return (
                        <tr key={x.id}>
                          <td>
                            <div style={{ display: 'flex' }}>
                              <img
                                src={x.sku.image}
                                alt=""
                                style={{ width: 64, height: 64, borderRadius: 5, objectFit: 'cover' }}
                              />
                              <div style={{ marginLeft: 10 }}>
                                <small style={{ marginRight: 5 }}>
                                  <b>{x.product.title}</b>
                                </small>
                                <small style={{ textTransform: 'capitalize' }}>
                                  ({x.sku.color}, {x.sku.size})
                                </small>
                                <br />
                                <small>{x.order_uuid}</small>
                                <br />
                                <small>
                                  <b className="text-success">${x.price}</b>
                                </small>
                              </div>
                            </div>
                          </td>
                          <td className="text-center" style={{ alignItems: 'center', position: 'relative' }}>
                            <small
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 120,
                              }}
                            >
                              <Badge color={OrderStatusColor[x.status]} pill>
                                {OrderStatus[x.status]}
                              </Badge>
                              <br />
                              {tab === 'RETURN' && <small className="text-danger">{x.return_reason}</small>}
                            </small>
                          </td>
                          <td className="text-center" style={{ alignItems: 'center', position: 'relative' }}>
                            <small
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              {x.qty}
                            </small>
                          </td>
                          <td className="text-center" style={{ alignItems: 'center', position: 'relative' }}>
                            <small
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              ${x.amount}
                            </small>
                          </td>
                          <td className="text-center" style={{ alignItems: 'center', position: 'relative' }}>
                            <small
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              ${x.total}
                            </small>
                          </td>
                          <td className="text-center" style={{ alignItems: 'center', position: 'relative' }}>
                            <ChangeStatusOrderMenu
                              onCompleted={() => setSelect(0)}
                              currentStatus={x.status}
                              id={x.id}
                              onError={setErr}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={6} className="text-right">
                        {print && timer && <PrintInvoice data={print} timer={timer} />}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              setPrint(orders[select]);
                              setTimer(new Date().getTime().toString());
                            }}
                          >
                            Print Invoice
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </TsContent>
  );
}
