import { gql, useQuery } from '@apollo/client';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
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

type GeneralDepartmentListDashboardScreenProps = {
  generalDepartmentId?: number;
};

const GeneralDepartmentListDashboardScreen = ({ generalDepartmentId }: GeneralDepartmentListDashboardScreenProps) => {
  const { data, loading } = useQuery(QUERY, {
    variables: {
      filter: {
        parent_id: generalDepartmentId,
        type: 'GENERAL_DEPARTMENT',
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
                  <Card style={{ height: 'calc(100% - 1.25rem)' }}>
                    <CardBody>
                      <DashboardCard
                        key={item?.id}
                        title={item?.name}
                        count={item?.count}
                        link={`/hr/dashboard/general-department/${generalDepartmentId}/department/${item?.id}`}
                        icon={faHouseUser}
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

export default GeneralDepartmentListDashboardScreen;
