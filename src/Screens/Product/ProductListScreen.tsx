/* eslint-disable @next/next/no-img-element */
import { useMutation, useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CardBody, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Table } from 'reactstrap';
import { Card } from 'reactstrap';
import { TsContent } from '../../components/Custom/TsContent';
import { CustomPagination } from '../../components/Paginations';
import toastr from 'toastr';
import { useAuthContext } from '../../components/Authentication/AuthContext';
import XForm from '../../components/Form/XForm';

const QUERY = gql`
  query productList($offset: Int = 0, $limit: Int = 10, $filter: FilterProduct) {
    productList(offset: $offset, limit: $limit, filter: $filter)
  }
`;

const MUTATION = gql`
  mutation publishProduct($id: Int!) {
    publishProduct(id: $id)
  }
`;

const MU = gql`
  mutation setProductPinDefault($id: Int!) {
    setProductPinDefault(id: $id)
  }
`;

function ShowStock({ modal, toggle, value }: { modal: boolean; toggle: () => void; value: any }) {
  return (
    <Modal isOpen={modal} toggle={toggle} fullscreen>
      <ModalHeader toggle={toggle}>
        {value && value.title}
      </ModalHeader>
      <ModalBody>
        <Table responsive className="table-centered table-nowrap mb-0" hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Barcode</th>
              <th>Color</th>
              <th>Size</th>
              <th>Qty</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {value &&
              value.sku.map((x: any, i: any) => {
                return (
                  <tr key={i}>
                    <td>
                      <img src={x.image} alt="" style={{ width: 75, height: 'auto', objectFit: 'contain' }} />
                    </td>
                    <td>{x.barcode}</td>
                    <td>{x.color}</td>
                    <td>{x.size}</td>
                    <td>{x.qty}</td>
                    <td>{x.stock}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  )
}

export function ProductListScreen() {
  const [modal, setModal] = useState(false);
  const [index, setindex] = useState(-1);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const { me } = useAuthContext();
  const { data } = useQuery(QUERY, {
    variables: {
      offset,
      limit,
      filter: {
        search: search ? String(search) : null
      }
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

  const [setProductPinDefault] = useMutation(MU, {
    refetchQueries: ['productList'],
    onCompleted: res => {
      if (res.setProductPinDefault) {
        toastr.success('Product was change pin default.');
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

  const onClickPin = (id: number) => {
    const x = window.confirm('Are you sure want mark pin default product?');
    if (!!x) {
      setProductPinDefault({
        variables: {
          id: Number(id),
        },
      });
    }
  };

  const toggle = () => setModal(!modal);

  return (
    <TsContent title="Product List">
      <ShowStock modal={modal} toggle={toggle} value={data ? data.productList.data.find((f: any) => f.id === index) : null} />
      {me.roleId < 3 && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Link href={'/product/create'}>
              <a className="btn btn-sm btn-primary">Upload product</a>
            </Link>
          </div>
          <div style={{ width: 300 }}>
            <XForm.Text value={searchInput} onChange={e => {
              setSearchInput(e.currentTarget.value);
              if (e.currentTarget.value === '') {
                setSearch('');
              }
            }} onKeyDown={e => e.keyCode === 13 && setSearch(searchInput)} placeholder='Search title or product code...' />
          </div>
        </div>
      )}
      <br />
      <br />
      {data && (
        <Card>
          <CardBody>
            <Table responsive className="table-centered table-nowrap mb-0" hover striped>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>{`Product Code (ID)`}</th>
                  <th>{`Stock Keeping Units (SKUs)`}</th>
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
                          {x.pin_default ? <i className="fas fa-map-pin" style={{ marginRight: 5 }}></i> : ''}
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
                          <button
                            disabled={me.roleId > 2}
                            className="btn btn-success btn-sm"
                            onClick={() => onClickPublish(x.id)}
                          >
                            Yes
                          </button>
                        ) : (
                          <button
                            disabled={me.roleId > 2}
                            className="btn btn-danger btn-sm"
                            onClick={() => onClickPublish(x.id)}
                          >
                            No
                          </button>
                        )}
                        {/* <Badge color={x.published ? 'success' : 'danger'}>{x.published ? 'Yes' : 'No'}</Badge> */}
                      </td>
                      <td className="text-center">
                        {me.roleId < 3 && (
                          <>
                            <Link href={'/product/edit/' + x.id}>
                              <a className="btn btn-sm btn-primary">Edit</a>
                            </Link>{' '}
                            <button className="btn btn-sm btn-warning" style={{ marginRight: 5 }} onClick={() => {
                              setindex(x.id)
                              toggle();
                            }}>
                              Stock
                            </button>
                            {x.pin_default ? (
                              <button className="btn btn-sm btn-danger ml-2 mr-2" onClick={() => onClickPin(x.id)}>
                                Unpin Default
                              </button>
                            ) : (
                              <button className="btn btn-sm btn-info ml-2 mr-2" onClick={() => onClickPin(x.id)}>
                                Pin Default
                              </button>
                            )}
                          </>
                        )}
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
