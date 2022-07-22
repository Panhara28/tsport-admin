import { gql, useQuery } from '@apollo/client';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import { Row } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Table } from 'reactstrap';
import { Col } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import { DashboardCard } from '../../components/Dashboard/DashboardCard';
import XForm from '../../components/Form/XForm';
import BiographyForm from '../../components/PrintForm/BiographyForm/BiographyForm';
import ContractForm from '../../components/PrintForm/ContractForm/ContractForm';
import CVForm from '../../components/PrintForm/CVForm/CVForm';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';
import { CustomModal } from './OfficeListDashboardScreen.styled';

const QUERY = gql`
  query hrDepartmentUsersCount($filter: HrDepartmentUsersCountFilter) {
    hrDepartmentUsersCount(filter: $filter)
  }
`;

const HR_EMPLOYEE_QUERY = gql`
  query hrDepartmentUsersCount($filter: HrDepartmentUsersCountFilter) {
    hrDepartmentUsersCount(filter: $filter)
  }
`;

type OfficeListDashboardScreenProps = {
  departmentId?: number;
  generalDepartmentId?: number;
  officeId?: number;
};

function RenderBiographyFormModal({ info, isShow, setIsShow }: any) {
  return (
    <CustomModal dialogClassName="modal-90w" show={isShow === info?.id} onHide={() => setIsShow(0)}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <BiographyForm info={info} />
      </Modal.Body>
    </CustomModal>
  );
}

function RenderContactFormModal({ info, isShowContractForm, setIsShowContractForm }: any) {
  return (
    <CustomModal
      dialogClassName="modal-90w"
      show={isShowContractForm === info?.id}
      onHide={() => setIsShowContractForm(0)}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <ContractForm info={info} />
      </Modal.Body>
    </CustomModal>
  );
}

function RenderCVFormModal({ info, isShowCVForm, setIsShowCVForm }: any) {
  return (
    <CustomModal dialogClassName="modal-90w" show={isShowCVForm === info?.id} onHide={() => setIsShowCVForm(0)}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <CVForm info={info} />
      </Modal.Body>
    </CustomModal>
  );
}

const RenderHrEmployeeList = ({ officeId, filterOfficerName }: any) => {
  const [isShow, setIsShow] = useState(0);
  const [isShowContractForm, setIsShowContractForm] = useState(0);
  const [isShowCVForm, setIsShowCVForm] = useState(0);

  const { data, loading } = useQuery(QUERY, {
    variables: {
      filter: {
        parent_id: officeId,
        type: 'OFFICE',
        officerName: filterOfficerName,
      },
    },
  });

  if (!data || loading) return <></>;

  return (
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
                    <div className="d-flex">
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Forms <FontAwesomeIcon icon={faChevronDown} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => setIsShow(item?.id)}>ជីវប្រវត្តិសង្ខេប</Dropdown.Item>
                          <Dropdown.Item onClick={() => setIsShowContractForm(item?.id)}>កិច្ចសន្យា</Dropdown.Item>
                          <Dropdown.Item onClick={() => setIsShowCVForm(item?.id)}>ប្រវត្តិរូបសង្ខេប</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      <Link href={`/hr/officers/${item?.id}/edit`}>
                        <a style={{ marginLeft: 10 }} className="btn btn-primary">
                          Edit
                        </a>
                      </Link>
                    </div>
                    <RenderBiographyFormModal info={item} isShow={isShow} setIsShow={setIsShow} />
                    <RenderContactFormModal
                      info={item}
                      isShowContractForm={isShowContractForm}
                      setIsShowContractForm={setIsShowContractForm}
                    />
                    <RenderCVFormModal info={item} isShowCVForm={isShowCVForm} setIsShowCVForm={setIsShowCVForm} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

const OfficeListDashboardScreen = ({ departmentId, generalDepartmentId, officeId }: OfficeListDashboardScreenProps) => {
  const [filterOfficerName, setFilterOfficerName] = useState(undefined);

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
                  <Card style={{ height: 'calc(100% - 1.25rem)' }}>
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
              <RenderHrEmployeeList officeId={officeId} filterOfficerName={filterOfficerName} />
            </Col>
            <Col md={3}>
              <Card>
                <CardBody>
                  <h6>Filter</h6>
                  <hr />
                  <label>Search by Officer Name</label>
                  <XForm.Text value={filterOfficerName} onChange={(e: any) => setFilterOfficerName(e?.target?.value)} />
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
