/* eslint-disable @next/next/no-img-element */
import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import XForm from '../../components/Form/XForm';
import { useState } from 'react';
import BiographyForm from '../../components/PrintForm/BiographyForm/BiographyForm';
import { Modal, Dropdown, Table } from 'react-bootstrap';
import { CustomModal, CustomTableContainer } from './SearchScreen.styled';
import ContractForm from '../../components/PrintForm/ContractForm/ContractForm';
import CVForm from '../../components/PrintForm/CVForm/CVForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import classes from './report.module.scss';
import { CustomPagination } from '../../components/Paginations';
import { useRouter } from 'next/router';
import { SEO } from '../../components/SEO';

const QUERY = gql`
  query employeeReport($pagination: PaginationInput, $filter: EmployeeReportFilter) {
    employeeReport(pagination: $pagination, filter: $filter) {
      data {
        id
        username
        fullname
        fullname_en
        profile
        phoneNumber
        status
        email
        gender
        nationality
        dob
        district
        commune
        education_level
        passport_id
        national_id
        position_level
        position_description
        unit
        department_id
        general_department_id
        contact_city_or_province
        province
        homeNo
        streetNo
        village_or_group
        contact_district
        contact_village
        contact_commune
        officer_id
        office_id
      }
      pagination {
        total
        size
        current
      }
    }
  }
`;

const HR_DEPARTMENT = gql`
  query hrDepartmentList($branch_level: Int, $parent_id: Int) {
    hrDepartmentList(branch_level: $branch_level, parent_id: $parent_id)
  }
`;

const GeneralDepartmentSelect = ({ generalDepartmentId, setGeneralDepartmentId }: any) => {
  const { data, loading } = useQuery(HR_DEPARTMENT, {
    variables: {
      branch_level: 0,
    },
  });

  if (!data || loading) return <></>;

  return (
    <XForm.Select
      label="Select General Department"
      value={generalDepartmentId}
      items={[
        {
          text: 'Choose one of the following',
          value: undefined,
        },
        ...data?.hrDepartmentList?.map((x: any) => {
          return {
            text: x?.name,
            value: x?.id,
          };
        }),
      ]}
      onChange={(e: any) => setGeneralDepartmentId(e.target.value)}
    />
  );
};

const DepartmentSelect = ({ generalDepartmentId, departmentId, setDepartmentId }: any) => {
  const { data, loading } = useQuery(HR_DEPARTMENT, {
    variables: {
      branch_level: 1,
      parent_id: Number(generalDepartmentId),
    },
  });

  if (!data || loading) return <></>;

  return (
    <XForm.Select
      label="Select Department"
      value={departmentId}
      onChange={(e: any) => setDepartmentId(e?.target?.value)}
      items={[
        {
          text: 'Choose one of the following',
          value: undefined,
        },
        ...data?.hrDepartmentList?.map((x: any) => {
          return {
            text: x?.name,
            value: x?.id,
          };
        }),
      ]}
    />
  );
};

const OfficeSelect = ({ departmentId, officeId, setOfficeId }: any) => {
  const { data, loading } = useQuery(HR_DEPARTMENT, {
    variables: {
      branch_level: 2,
      parent_id: Number(departmentId),
    },
  });

  if (!data || loading) return <></>;

  return (
    <XForm.Select
      label="Select Office"
      value={officeId}
      onChange={(e: any) => setOfficeId(e.target.value)}
      items={[
        {
          text: 'Choose one of the following',
          value: undefined,
        },
        ...data?.hrDepartmentList?.map((x: any) => {
          return {
            text: x?.name,
            value: x?.id,
          };
        }),
      ]}
    />
  );
};

type RenderReportProps = {
  generalDepartmentId?: number;
  departmentId?: number;
  officeId?: number;
  officerName?: string;
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

function RenderReport({ generalDepartmentId, departmentId, officeId, officerName }: RenderReportProps) {
  const router = useRouter();
  const [isShow, setIsShow] = useState(0);
  const [isShowContractForm, setIsShowContractForm] = useState(0);
  const [isShowCVForm, setIsShowCVForm] = useState(0);

  const { data, loading } = useQuery(QUERY, {
    variables: {
      pagination: {
        page: router.query.page ? Number(router.query.page) : 1,
        size: 10,
      },
      filter: {
        generalDepartmentId,
        departmentId,
        officeId,
        officerName,
      },
    },
  });

  if (loading || !data) return <div>Loading...</div>;

  return (
    <Card>
      <CardBody>
        <CustomTableContainer>
          <Table striped responsive bordered hover>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Fullname</th>
                <th>Gender</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.employeeReport.data?.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="d-flex justify-content-center mt-5">
                      <img src="/dashboard-no-data.png" width="600px" />
                    </div>
                  </td>
                </tr>
              ) : (
                data.employeeReport.data.map((item: any) => {
                  return (
                    <tr key={item?.id}>
                      <td>
                        <td>
                          <div className={classes.profile} onClick={() => setIsShow(item?.id)}>
                            <img
                              className="profile_picture"
                              src={item?.profile ? item.profile : '/icons/profile.png'}
                              alt="profile"
                              style={{ width: '50px', height: '50px' }}
                            />
                          </div>
                        </td>
                      </td>
                      <td>{item?.fullname}</td>
                      <td>{item?.gender}</td>
                      <td>{item?.phoneNumber}</td>
                      <td>{item?.email}</td>
                      <td>
                        <div className="d-flex" style={{ gap: 15 }}>
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
                            <a className="btn btn-primary">Edit</a>
                          </Link>
                        </div>
                      </td>
                      <RenderBiographyFormModal info={item} isShow={isShow} setIsShow={setIsShow} />
                      <RenderContactFormModal
                        info={item}
                        isShowContractForm={isShowContractForm}
                        setIsShowContractForm={setIsShowContractForm}
                      />
                      <RenderCVFormModal info={item} isShowCVForm={isShowCVForm} setIsShowCVForm={setIsShowCVForm} />
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </CustomTableContainer>
      </CardBody>
      <CustomPagination
        total={data?.employeeReport?.pagination?.total}
        currentPage={data?.employeeReport?.pagination?.current}
        size={data?.employeeReport?.pagination?.size}
        limit={10}
      />
    </Card>
  );
}

export function SearchScreen() {
  const [departmentId, setDepartmentId] = useState('');
  const [generalDepartmentId, setGeneralDepartmentId] = useState('');
  const [officeId, setOfficeId] = useState('');
  const [officerName, setOfficerName] = useState('');

  return (
    <>
      <SEO
        title="Reports"
        description={`
                  Design & Develop  by Moc Software Development Team
                `}
        image=""
      />
      <Layout>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb breadcrumbItem="Search" title={setting.title} />
            <hr />
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={3}>
                        <GeneralDepartmentSelect
                          generalDepartmentId={generalDepartmentId}
                          setGeneralDepartmentId={setGeneralDepartmentId}
                        />
                      </Col>
                      <Col md={3}>
                        <DepartmentSelect
                          departmentId={departmentId}
                          setDepartmentId={setDepartmentId}
                          generalDepartmentId={generalDepartmentId}
                        />
                      </Col>
                      <Col md={3}>
                        <OfficeSelect officeId={officeId} setOfficeId={setOfficeId} departmentId={departmentId} />
                      </Col>
                      <Col md={3}>
                        <label className={classes.label_txt}>Search</label>
                        <input
                          className="form-control"
                          value={officerName}
                          onChange={e => setOfficerName(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <RenderReport
                  generalDepartmentId={Number(generalDepartmentId)}
                  departmentId={Number(departmentId)}
                  officeId={Number(officeId)}
                  officerName={officerName}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </Layout>
    </>
  );
}
