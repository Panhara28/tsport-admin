/* eslint-disable @next/next/no-img-element */
import { useMutation, useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Badge } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Table } from 'reactstrap';
import { Card } from 'reactstrap';
import { TsContent } from '../../components/Custom/TsContent';
import { CustomPagination } from '../../components/Paginations';
import toastr from 'toastr';

const QUERY = gql`
  query productList($offset: Int = 0, $limit: Int = 10) {
    productList(offset: $offset, limit: $limit)
  }
`;

const MUTATION = gql`
  mutation publishProduct($id: Int!) {
    publishProduct(id: $id)
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
  const [publishProduct] = useMutation(MUTATION, {
    refetchQueries: ['productList'],
    onCompleted: res => {
      if (res.publishProduct) {
        toastr.success('Product was change status publish.');
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
    const x = window.confirm('Are you sure want update publish product?');
    if (!!x) {
      publishProduct({
        variables: {
          id: Number(id),
        },
      });
    }
  };

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
                        {x.published ? (
                          <button className="btn btn-success btn-sm" onClick={() => onClickPublish(x.id)}>
                            Yes
                          </button>
                        ) : (
                          <button className="btn btn-danger btn-sm" onClick={() => onClickPublish(x.id)}>
                            No
                          </button>
                        )}
                        {/* <Badge color={x.published ? 'success' : 'danger'}>{x.published ? 'Yes' : 'No'}</Badge> */}
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
            currentPage={
              offset > 0 ? Math.ceil(data.productList.pagination.current / limit) : data.productList.pagination.current
            }
            size={data.productList.pagination.size}
            limit={limit}
          />
        </Card>
      )}
    </TsContent>
  );
}
