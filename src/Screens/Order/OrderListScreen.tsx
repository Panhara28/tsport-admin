/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { TsContent } from '../../components/Custom/TsContent';
import { groupOrder } from '../../libs/groupOrder';
//@ts-ignore
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { BtnIcon } from '../../components/Form/ButtonIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { useRouter } from 'next/router';

const QUERY = gql`
  query orderList($status: [OrderStatus]) {
    orderList(status: $status)
  }
`;

function TabOrder({ tab, setTab }: { tab: any; setTab: any }) {
  return (
    <Nav tabs>
      <NavItem>
        <NavLink
          href="#"
          onClick={() => {
            setTab('ORDER_RECEIVED');
          }}
          active={tab === 'ORDER_RECEIVED'}
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
        >
          Pick Up
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="#"
          onClick={() => {
            setTab('RETURN');
          }}
          active={tab === 'RETURN'}
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
  const { data, loading } = useQuery(QUERY, {
    variables: {
      status: tab === 'DELIVERY' ? ['READY_TO_DELIVERY', 'ORDER_DELIVERY'] : [tab],
    },
  });

  if (loading) {
    return (
      <TsContent title="Order Management">
        <div></div>
      </TsContent>
    );
  }

  const orders = groupOrder(data && data.orderList);

  return (
    <TsContent title="Order Management">
      <TabOrder tab={tab} setTab={setTab} />
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
                        }}
                      >
                        <span>
                          <b>Order</b>
                          <span>#{x.id}</span>
                        </span>
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
                          <b style={{ width: '6rem' }}>Total Price</b>
                          <b style={{ marginRight: 'auto' }}>:</b>
                          <b style={{ marginRight: '0.25rem' }}>${x.total.toFixed(2)}</b>
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
                <Table>
                  <thead>
                    <tr>
                      <th>Item</th>
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
                            <Menu
                              menuButton={
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                  }}
                                >
                                  <MenuButton className="btn btn-link btn-sm">
                                    <FontAwesomeIcon icon={faEllipsisH} />
                                  </MenuButton>
                                </div>
                              }
                            >
                              <MenuItem>
                                <small>Order Revived</small>
                              </MenuItem>
                              <MenuItem>
                                <small>Order Processing</small>
                              </MenuItem>
                              <MenuItem>
                                <small>Ready to Delivery</small>
                              </MenuItem>
                              <MenuItem>
                                <small>Order Delivery</small>
                              </MenuItem>
                              <MenuItem>
                                <small>Confirm Pick up</small>
                              </MenuItem>
                              <MenuItem>
                                <small>Return</small>
                              </MenuItem>
                            </Menu>
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
      )}
    </TsContent>
  );
}
