import { gql, useQuery } from '@apollo/client';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Row } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
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

type DepartmentListDashboardScreenProps = {
  departmentId?: number;
  generalDepartmentId?: number;
};

const DepartmentListDashboardScreen = ({ departmentId, generalDepartmentId }: DepartmentListDashboardScreenProps) => {
  const { data, loading } = useQuery(QUERY, {
    variables: {
      filter: {
        parent_id: departmentId,
        type: 'DEPARTMENT',
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
                      <DashboardCard
                        key={item?.id}
                        title={item?.name}
                        count={item?.count}
                        link={`/hr/dashboard/${generalDepartmentId}/department/${departmentId}/office/${item?.id}`}
                        icon={faNetworkWired}
                      />
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default DepartmentListDashboardScreen;
