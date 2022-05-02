import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { WebsiteSettingSidebar } from './WebsiteSettingSidebar';
import style from './create-websites.module.scss';
import { gql, useQuery } from '@apollo/client';
import Layout from '../../components/VerticalLayout';
import { CustomTable } from '../../components/Table/CustomTable';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import { Table } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';

const QUERY = gql`
  query addedPeopleList($websiteId: Int!) {
    addedPeopleList(websiteId: $websiteId) {
      userId
      fullName
    }
  }
`;

export function PeopleScreen() {
  const router = useRouter();

  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId: Number(router.query.id),
    },
  });

  if (loading || !data) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="All People" />
          <hr />
          <Row>
            <Col md={3} style={{ borderRight: '1px solid #ccc', height: '100vh' }}>
              <WebsiteSettingSidebar />
            </Col>
            <Col md={9}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <h6 className="mb-4"></h6>
                <Link href={`/mochub/websites/${router.query.id}/add-people`}>
                  <a className={style.mocAddPeopleButton}>Add People</a>
                </Link>
                {/* <Button style={{ background: 'rgb(0, 82, 204)' }}>Add People</Button> */}
              </div>
              <Card>
                <CardBody>
                  <Table className="table-centered table-nowrap mb-0" hover striped>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Fullname</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.addedPeopleList.map((item: any) => {
                        return (
                          <tr>
                            <td>{item.userId}</td>
                            <td>{item.fullName}</td>
                            <td>
                              <Link href={`/mochub/websites/${router.query.id}/people/${item.userId}/edit`}>
                                <a className="btn btn-info">Edit Info</a>
                              </Link>
                              <Link href={`/mochub/websites/${router.query.id}/people/add-role/${item.userId}`}>
                                <a className="btn btn-primary" style={{ marginLeft: 15 }}>
                                  Assign role
                                </a>
                              </Link>
                              <Link href={`/mochub/websites/${router.query.id}/people/add-plugin/${item.userId}`}>
                                <a className="btn btn-secondary" style={{ marginLeft: 15 }}>
                                  Manage Plugin
                                </a>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>

              {/* <CustomTable data={data?.addedPeopleList} websiteId={Number(router.query.id)} /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
