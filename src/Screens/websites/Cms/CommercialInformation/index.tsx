import { gql, useQuery } from '@apollo/client';
import { faAngleLeft, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Col, Container, Row, Table, Modal } from 'react-bootstrap';
import moment from 'moment';
import { CustomPagination } from '../../../../components/Paginations';
import Select, { StylesConfig } from 'react-select';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StatusOption, statusOptions } from '../../../../libs/ReactSelectColor';
import Layout from '../../../../components/VerticalLayout';
import { Breadcrumb } from '../../../../components/Common/Breadcrumb';
import { Card, CardBody, CardTitle, Label } from 'reactstrap';
import AuthContext from '../../../../components/Authentication/AuthContext';
import { ReadFileExcel } from '../../../../hook/readExcelFile';

const QUERY = gql`
  query newsList($filter: FilterNews, $pagination: PaginationInput!, $websiteId: Int!) {
    newsList(filter: $filter, pagination: $pagination, websiteId: $websiteId) {
      data {
        id
        title
        created_at
      }
      pagination {
        total
        size
        current
      }
    }
  }
`;

export function CommercialInformationScreen() {
  const { me } = useContext(AuthContext);
  const router = useRouter();

  const fileInputRef = useRef<any>();

  const [commercialType, setCommercialType] = useState<string | undefined>('Imports');

  const [uploadFile, setUploadFile] = useState<any>(undefined);

  const [isPreview, setIsPreview] = useState<any>(undefined);

  const onHandleCommercialType = (e: any, type?: string) => {
    e?.preventDefault();

    setCommercialType(type);
  };

  const onHandleInputChange = async (e: any) => {
    const res = new Promise(r => {
      ReadFileExcel(e.target.files[0], callback => {
        r(callback);
      });
    });
    const data = await res;

    setUploadFile(data);
  };

  // if (loading || !data) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Commercial Information" />
          <hr />
          <Row>
            <Col md={12}>
              <div style={{ display: 'flex' }}>
                {/* <Link href={`/mochub/websites/${router.query.id}/cms/news/create`}> */}
                <a
                  className={`btn ${commercialType === 'Imports' ? 'btn-primary' : 'btn-secondary'}  mb-3`}
                  onClick={e => {
                    onHandleCommercialType(e, 'Imports');
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} /> Import
                </a>
                {/* </Link> */}

                {/* <Link href={`/mochub/websites/${router.query.id}/cms/news/create`}> */}
                <a
                  className={`btn ${commercialType === 'Exports' ? 'btn-primary' : 'btn-secondary'} mb-3`}
                  style={{ marginLeft: 10 }}
                  onClick={e => {
                    onHandleCommercialType(e, 'Exports');
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} /> Export
                </a>
                {/* </Link> */}
                {/* <Link href="#">
                  <a className="btn btn-danger mb-3" style={{ marginLeft: 10 }} onClick={() => router.back()}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Back
                  </a>
                </Link> */}
              </div>
            </Col>

            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">{commercialType} Action</CardTitle>
                  <hr />
                  <Label>Search by name</Label>
                  <input
                    className="form-control mb-3"
                    placeholder="Search..."
                    // onChange={(e: any) => setSearchByName(e.currentTarget.value)}
                    // defaultValue={searchByName}
                    autoFocus
                  />

                  <input
                    type="file"
                    style={{ visibility: 'hidden', position: 'absolute' }}
                    ref={fileInputRef}
                    onChange={e => onHandleInputChange(e)}
                  />
                  {!uploadFile ? (
                    <Button variant="success" onClick={() => fileInputRef.current.click()}>
                      Upload
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={() => setIsPreview(true)}>
                      Preview
                    </Button>
                  )}
                  {/* <Label>Filter by status</Label>
                  <Select
                    options={statusOptions}
                    onChange={onSelectStatus}
                    value={filterStatus}
                    styles={colourStyles}
                  /> */}
                </CardBody>
              </Card>
            </Col>

            <Modal show={isPreview} onHide={() => setIsPreview(false)} size="xl">
              <Modal.Header closeButton>Upload {commercialType}</Modal.Header>

              <Modal.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>year</th>
                      <th>month</th>
                      <th>destination_country</th>
                      <th>hs_code</th>
                      <th>net_weight_kgm</th>
                      <th>supplementary_unit</th>
                      <th>quantity</th>
                      <th>custom_value_khr</th>
                      <th>custom_value_usd</th>
                      <th>type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadFile
                      ? uploadFile?.map((x: any, idx: number) => {
                          return (
                            <tr key={idx}>
                              <td>{x['Year']}</td>
                              <td>{x['Month']}</td>
                              <td>{x['Destination Country']}</td>
                              <td>{x['HS8 Code']}</td>
                              <td>{x['Net Weight Kgm']}</td>
                              <td>{x['Supplementary Unit']}</td>
                              <td>{x['Quantity']}</td>
                              <td>{x['Customs Value KHR']}</td>
                              <td>{x['Customs Value USD']}</td>
                              <td>{commercialType}</td>
                            </tr>
                          );
                        })
                      : undefined}
                  </tbody>
                </Table>
              </Modal.Body>
            </Modal>

            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">All {commercialType}</CardTitle>
                  <div className="table-responsive">
                    <Table className="table-centered table-nowrap mb-0" hover striped>
                      <thead className="table-light">
                        <tr>
                          <th>year</th>
                          <th>month</th>
                          <th>destination_country</th>
                          <th>hs_code</th>
                          <th>net_weight_kgm</th>
                          <th>supplementary_unit</th>
                          <th>quantity</th>
                          <th>custom_value_khr</th>
                          <th>custom_value_usd</th>
                          <th>hs2</th>
                          <th>hs4</th>
                          <th>hs6</th>
                          <th>type</th>
                          <th>actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {data?.newsList.data.map((item: any) => {
                          return (
                            <>
                              <tr>
                                <td>{item.id}</td>
                                <td
                                  style={{
                                    whiteSpace: 'break-spaces',
                                    width: '70%',
                                  }}
                                >
                                  {item.title}
                                </td>
                                <td>{moment(Number(item.created_at)).format('DD, MMM YYYY')}</td>
                                <td>
                                  <Link href={`/mochub/websites/${router.query.id}/cms/news/${item.id}/edit`}>
                                    <a
                                      className="btn btn-primary btn-sm btn-rounded waves-effect waves-light"
                                      style={{ marginRight: 12 }}
                                    >
                                      <FontAwesomeIcon icon={faEdit} /> Edit
                                    </a>
                                  </Link>
                                </td>
                              </tr>
                            </>
                          );
                        })} */}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                {/* <CustomPagination
                  total={data.newsList.pagination.total}
                  currentPage={data.newsList.pagination.current}
                  size={data.newsList.pagination.size}
                  limit={10}
                /> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
