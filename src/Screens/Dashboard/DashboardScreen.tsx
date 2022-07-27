import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
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
import { Button } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

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

const CREATE_MUTATION = gql`
  mutation createHrDepartment($input: HrDepartmentInput) {
    createHrDepartment(input: $input)
  }
`;

type RenderAddGeneralDepartmentProps = {
  show: boolean;
  setShow: any;
};

const RenderAddGeneralDepartment = ({ show, setShow }: RenderAddGeneralDepartmentProps) => {
  const [createHrDepartment] = useMutation(CREATE_MUTATION, {
    onCompleted: data => {
      if (data) {
        toastr.success('General Department Added Successfully!');
        setShow(false);
      }
    },
    refetchQueries: ['hrDepartmentUsersCount'],
  });
  let nameInput: any;

  const onHandleCreate = (e: any) => {
    e.preventDefault();

    createHrDepartment({
      variables: {
        input: {
          parent_id: 0,
          name: nameInput?.value,
        },
      },
    });
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>Add General Department</Modal.Header>
        <Modal.Body>
          <input
            ref={node => (nameInput = node)}
            className="form-control mb-4"
            placeholder="Enter general department name..."
          />
          <Button className="btn-success" onClick={(e: any) => onHandleCreate(e)}>
            Create
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

const DashboardScreen = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
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

          <RenderAddGeneralDepartment show={show} setShow={setShow} />

          <Button className="mb-4 btn-success" onClick={() => setShow(true)}>
            Add General Department
          </Button>

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
