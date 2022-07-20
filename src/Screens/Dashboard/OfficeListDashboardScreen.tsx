import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { Row } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Table } from 'reactstrap';
import { Col } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import { DashboardCard } from '../../components/Dashboard/DashboardCard';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';

const QUERY = gql`
  query hrDepartmentUsersCount($filter: HrDepartmentUsersCountFilter) {
    hrDepartmentUsersCount(filter: $filter)
  }
`;

type OfficeListDashboardScreenProps = {
  departmentId?: number;
  generalDepartmentId?: number;
  officeId?: number;
};

const OfficeListDashboardScreen = ({ departmentId, generalDepartmentId, officeId }: OfficeListDashboardScreenProps) => {
  const { data, loading } = useQuery(QUERY, {
    variables: {
      filter: {
        parent_id: officeId,
        type: 'OFFICE',
      },
    },
  });

  if (!data || loading) return <></>;

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            title={setting.title}
            breadcrumbItem={
              data?.hrDepartmentUsersCount?.parent?.name ? data?.hrDepartmentUsersCount?.parent?.name : 'Dashboard'
            }
          />
          <hr />
          <Row>
            {data?.hrDepartmentUsersCount?.data?.map((item: any) => {
              return (
                <Col md={3}>
                  <Card>
                    <CardBody>
                      <DashboardCard key={item?.id} title={item?.name} count={item?.count} />
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col md={9}>
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
                      {data?.hrDepartmentUsersCount?.totalUsers?.map((item: any) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.fullname}</td>
                            <td>
                              <Link href={`/hr/officers/${item?.id}/edit`}>
                                <a style={{ marginLeft: 10 }} className="btn btn-primary">
                                  Edit
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
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default OfficeListDashboardScreen;
