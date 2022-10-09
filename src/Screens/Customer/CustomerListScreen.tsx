import { useMutation, useQuery } from '@apollo/client';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { TsContent } from '../../components/Custom/TsContent';
import { CustomPagination } from '../../components/Paginations';
import toastr from 'toastr';

const QUERY = gql`
  query customerList($offset: Int, $limit: Int, $phone: String) {
    customerList(offset: $offset, limit: $limit, phone: $phone) {
      data {
        id
        fullname
        phone
        address
        profile
        type
        username
        discount
        published
      }
      pagination {
        current
        size
        total
      }
    }
  }
`;

const MUTATION = gql`
  mutation publishCustomer($id: Int!) {
    publishCustomer(id: $id)
  }
`;

export function CustomerListScreen() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const { data } = useQuery(QUERY, {
    variables: {
      offset,
      limit,
    },
  });
  const [publishCustomer] = useMutation(MUTATION, {
    refetchQueries: ['customerList'],
    onCompleted: res => {
      if (res.publishCustomer) {
        toastr.success('Customer active was changed.');
      } else {
        toastr.danger('Somthing wrong...');
      }
    },
  });

  useEffect(() => {
    if (process.browser) {
      const query = new URLSearchParams(window.location.search);

      if (query.get('page')) {
        setOffset((Number(query.get('page')) - 1) * limit);
      }
    }
  });

  const onClickPublish = (id: number) => {
    const x = window.confirm('Are you sure want update active customer?');
    if (!!x) {
      publishCustomer({
        variables: {
          id: Number(id),
        },
      });
    }
  };

  return (
    <TsContent title="Customer List">
      <Link href={'/customer/create'}>
        <a className="btn btn-sm btn-primary">Register new customer</a>
      </Link>
      <br />
      <br />
      {data && (
        <Card>
          <CardBody>
            <Table responsive className="table-centered table-nowrap mb-0" hover striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Customer Type</th>
                  <th></th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.customerList.data.map((x: any) => {
                  return (
                    <tr key={x.id}>
                      <td>
                        <small>{x.id}</small>
                      </td>
                      <td>
                        <b>{x.fullname}</b>
                        <br />
                        <small>{x.username}</small>
                      </td>
                      <td>
                        <b>Phone: {x.phone}</b>
                        <br />
                        <small>Address: {x.address}</small>
                      </td>
                      <td>
                        <b style={{ textTransform: 'uppercase' }}>{x.type}</b>
                        <br />
                        {/* {x.type !== 'default' && <small>Discount: ${x.discount}</small>} */}
                      </td>
                      <td>
                        {x.published ? (
                          <button className="btn btn-success btn-sm" onClick={() => onClickPublish(x.id)}>
                            Yes
                          </button>
                        ) : (
                          <button className="btn btn-danger btn-sm" onClick={() => onClickPublish(x.id)}>
                            No
                          </button>
                        )}
                      </td>
                      <td>
                        <Link href={'/customer/edit/' + x.id}>
                          <a className="btn btn-sm btn-primary">Edit</a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
          <CustomPagination
            total={data.customerList.pagination.total}
            currentPage={
              offset > 0
                ? Math.ceil(data.customerList.pagination.current / limit)
                : data.customerList.pagination.current
            }
            size={data.customerList.pagination.size}
            limit={limit}
          />
        </Card>
      )}
    </TsContent>
  );
}
