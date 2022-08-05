import { useQuery } from '@apollo/client';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { TsContent } from '../../components/Custom/TsContent';
import { CustomPagination } from '../../components/Paginations';

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
      }
      pagination {
        current
        size
        total
      }
    }
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
            <Table className="table-centered table-nowrap mb-0" hover striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Customer Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.customerList.data.map((x: any) => {
                  return (
                    <tr key={x.id}>
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
                        {x.type !== 'default' && <small>Discount: ${x.discount}</small>}
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
            currentPage={data.customerList.pagination.current}
            size={data.customerList.pagination.size}
            limit={10}
          />
        </Card>
      )}
    </TsContent>
  );
}
