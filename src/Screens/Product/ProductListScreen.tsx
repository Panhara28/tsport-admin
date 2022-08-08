/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import React, { useState } from 'react';
import { Badge } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Table } from 'reactstrap';
import { Card } from 'reactstrap';
import { TsContent } from '../../components/Custom/TsContent';
import { CustomPagination } from '../../components/Paginations';

const QUERY = gql`
  query productList($offset: Int = 0, $limit: Int = 10) {
    productList(offset: $offset, limit: $limit)
  }
`;

export function ProductListScreen() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const { data } = useQuery(QUERY, {
    variables: {
      offset,
      limit,
    },
  });

  return (
    <TsContent title="Product List">
      <Link href={'/product/create'}>
        <a className="btn btn-sm btn-primary">Upload product</a>
      </Link>
      <br />
      <br />
      {data && (
        <Card>
          <CardBody>
            <Table className="table-centered table-nowrap mb-0" hover striped>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Code</th>
                  <th>SKU</th>
                  <th className="text-center">Stock</th>
                  <th className="text-center">Published</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.productList.data.map((x: any) => {
                  return (
                    <tr key={x.id}>
                      <td>
                        <div style={{ display: 'flex' }}>
                          <img
                            src={x.picture}
                            alt=""
                            style={{ width: 75, height: 75, borderRadius: 4, objectFit: 'cover' }}
                          />
                          <div style={{ marginLeft: 10 }}>
                            <span>{x.title}</span>
                            <br />
                            <small className="text-success">${x.price}</small>
                            <br />
                            <small>Discount: {x.discount || 0}%</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <b>{x.code}</b>
                      </td>
                      <td>
                        <small>Color: {x.color}</small>
                        <br />
                        <small>Size: {x.size}</small>
                      </td>
                      <td className="text-center">
                        <b>{x.stock}</b>
                      </td>
                      <td className="text-center">
                        <Badge color={x.published ? 'success' : 'danger'}>{x.published ? 'Yes' : 'No'}</Badge>
                      </td>
                      <td className="text-center">
                        <Link href={'/product/edit/' + x.id}>
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
            total={data.productList.pagination.total}
            currentPage={data.productList.pagination.current}
            size={data.productList.pagination.size}
            limit={10}
          />
        </Card>
      )}
    </TsContent>
  );
}
