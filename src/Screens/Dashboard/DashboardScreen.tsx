import { gql, useQuery } from '@apollo/client';
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
import { useRouter } from 'next/router';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { format_dashboard_gender_count } from './functions/format_dashboard_gender_count';

const ReactApexChart: any = dynamic(() => import('react-apexcharts'), { ssr: false });

const QUERY = gql`
  query hrDepartmentUsersCount {
    hrDepartmentUsersCount

    genderDashboardCount {
      total_male
      total_female
    }
  }
`;

const DashboardScreen = () => {
  const router = useRouter();
  const { data, loading } = useQuery(QUERY);

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
                        link={`/hr/dashboard/general-department/${item?.id}`}
                        icon={faLandmark}
                      />
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>

          <hr></hr>
          <Row>
            <Col md={6}>
              <Card>
                <CardBody>
                  <h5 className="mb-5">Total employees based on gender</h5>
                  <ReactApexChart
                    options={format_dashboard_gender_count(data?.genderDashboardCount).options}
                    series={format_dashboard_gender_count(data?.genderDashboardCount).series}
                    type="bar"
                    height={450}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default DashboardScreen;
