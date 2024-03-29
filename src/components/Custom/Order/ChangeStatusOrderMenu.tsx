/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext } from 'react';
//@ts-ignore
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';
import AuthContext from '../../Authentication/AuthContext';

export enum OrderStatus {
  ORDER_RECEIVED = 0,
  ORDER_PROCESSING = 1,
  READY_TO_DELIVERY = 2,
  ORDER_DELIVERY = 3,
  CONFIRM_PICK_UP = 4,
  RETURN = 5,
}

export enum OrderStatusColor {
  secondary = 0,
  info = 1,
  Secondary = 2,
  warning = 3,
  success = 4,
  danger = 5,
}

const MUTATION = gql`
  mutation changeOrderStatus($status: OrderStatus!, $orderItemId: Int!, $note: String, $fee: String) {
    changeOrderStatus(orderItemId: $orderItemId, status: $status, note: $note, fee: $fee)
  }
`;

export function ChangeStatusOrderMenu({
  currentStatus,
  id,
  onError,
  onCompleted,
}: {
  currentStatus: OrderStatus;
  id: number;
  onError: any;
  onCompleted: any;
}) {
  const { me } = useContext(AuthContext);
  const [changeOrderStatus] = useMutation(MUTATION, {
    refetchQueries: ['orderList'],
    onError: err => onError(err.message),
    onCompleted,
  });

  const onClickOrderStatus = (status: string) => {
    if (status === 'RETURN') {
      const x = window.prompt('Why did you want return?');

      if (x) {
        changeOrderStatus({
          variables: {
            status,
            orderItemId: Number(id),
            note: x,
          },
        });
      }

      return;
    }

    if (status === 'ORDER_DELIVERY') {
      const x = window.prompt('Input delivery fee ($)');

      if (x) {
        if (!isNaN(Number(x))) {
          changeOrderStatus({
            variables: {
              status,
              orderItemId: Number(id),
              fee: String(x),
            },
          });
        }
      }

      return;
    }

    changeOrderStatus({
      variables: {
        status,
        orderItemId: Number(id),
        note: '',
      },
    });
  };

  if (!me.access.modify && !me.access.write) {
    return <div></div>;
  }

  return (
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
      {/* {currentStatus !== OrderStatus.ORDER_RECEIVED && (
        <MenuItem onClick={() => onClickOrderStatus('ORDER_RECEIVED')}>
          <small>Order Revived</small>
        </MenuItem>
      )} */}
      {currentStatus === OrderStatus.ORDER_RECEIVED && (
        <MenuItem onClick={() => onClickOrderStatus('ORDER_PROCESSING')}>
          <small>Order Processing</small>
        </MenuItem>
      )}
      {currentStatus === OrderStatus.ORDER_PROCESSING && (
        <MenuItem onClick={() => onClickOrderStatus('READY_TO_DELIVERY')}>
          <small>Ready to Delivery</small>
        </MenuItem>
      )}
      {/* {currentStatus === OrderStatus.READY_TO_DELIVERY && (
        <MenuItem onClick={() => onClickOrderStatus('ORDER_DELIVERY')}>
          <small>Order Delivery</small>
        </MenuItem>
      )} */}
      {currentStatus === OrderStatus.ORDER_DELIVERY && (
        <MenuItem onClick={() => onClickOrderStatus('CONFIRM_PICK_UP')}>
          <small>Confirm Pick up</small>
        </MenuItem>
      )}
      {currentStatus === OrderStatus.CONFIRM_PICK_UP && (
        <MenuItem onClick={() => onClickOrderStatus('RETURN')}>
          <small>Return</small>
        </MenuItem>
      )}
    </Menu>
  );
}
