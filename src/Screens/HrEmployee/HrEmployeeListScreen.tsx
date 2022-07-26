/* eslint-disable @next/next/no-img-element */
import { useMutation, useQuery } from '@apollo/client';
import { faAngleLeft, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql } from 'apollo-boost';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
import { Card } from 'reactstrap';
import { Table } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import Button from '../../components/Form/Button';
import XForm from '../../components/Form/XForm';
import { CustomPagination } from '../../components/Paginations';
import BiographyForm from '../../components/PrintForm/BiographyForm/BiographyForm';
import ContractForm from '../../components/PrintForm/ContractForm/ContractForm';
import CVForm from '../../components/PrintForm/CVForm/CVForm';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';
import { CustomModal, CustomTableContainer } from './HrEmployeeListScreen.styled';
import Swal from 'sweetalert2';

const QUERY = gql`
  query hrEmployeeList($pagination: PaginationInput, $filter: HrEmployeeFilter) {
    hrEmployeeList(pagination: $pagination, filter: $filter) {
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
        current
        size
        total
      }
    }
  }
`;

const REMOVE_HR_EMPLOYEE = gql`
  mutation removeHrEmployee($id: Int!) {
    removeHrEmployee(id: $id)
  }
`;

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

const RenderHrEmployeeList = ({ filterOfficerName }: any) => {
  const router = useRouter();

  const [isShow, setIsShow] = useState(0);
  const [isShowContractForm, setIsShowContractForm] = useState(0);
  const [isShowCVForm, setIsShowCVForm] = useState(0);

  const [removeHrEmployee] = useMutation(REMOVE_HR_EMPLOYEE, { refetchQueries: ['hrEmployeeList'] });

  const { data, loading } = useQuery(QUERY, {
    variables: {
      pagination: {
        page: router.query.page ? Number(router.query.page) : 1,
        size: 10,
      },
      filter: {
        officerName: filterOfficerName,
      },
    },
  });

  if (loading || !data) return <div>Loading...</div>;

  const onHandleRemoveHrDepartment = (e: any, id: number) => {
    e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-2',
        cancelButton: 'btn btn-danger',
      },
      // buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Accept to continue deletion?',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Deny',
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            text: 'Your selection has been deleted.',
            icon: 'success',
            timer: 1500,
          });

          removeHrEmployee({
            variables: {
              id: id,
            },
          });
        }
      });
  };

  return (
    <Card>
      <CardBody>
        <CustomTableContainer>
          <Table className="table-centered table-nowrap mb-0" hover striped>
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
              {data?.hrEmployeeList?.data.map((item: any) => {
                return (
                  <tr key={item?.id}>
                    <td>
                      <div onClick={() => setIsShow(item?.id)}>
                        <img
                          className="profile_picture"
                          src={item?.profile ? item.profile : '/icons/profile.png'}
                          alt="profile"
                        />
                      </div>
                    </td>
                    <td>{item?.fullname}</td>
                    <td>{item?.gender}</td>
                    <td>{item?.phoneNumber}</td>
                    <td>{item?.email}</td>
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
                        <Link href="#">
                          <a
                            className="btn btn-danger "
                            style={{ marginLeft: 10 }}
                            onClick={e => onHandleRemoveHrDepartment(e, item?.id)}
                          >
                            Remove
                          </a>
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
              })}
            </tbody>
          </Table>
        </CustomTableContainer>
      </CardBody>
      <CustomPagination
        total={data?.hrEmployeeList?.pagination?.total}
        currentPage={data?.hrEmployeeList?.pagination?.current}
        size={data?.hrEmployeeList?.pagination?.size}
        limit={10}
      />
    </Card>
  );
};

export function HrEmployeeListScreen() {
  const router = useRouter();
  const [filterOfficerName, setFilterOfficerName] = useState(undefined);

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb breadcrumbItem="Officers list" title={setting.title} />
          <hr />
          <Row>
            <Col md={9}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link href={`/hr/officers/create`}>
                  <a className="btn btn-primary mb-3">
                    <FontAwesomeIcon icon={faPlus} /> Add new
                  </a>
                </Link>
                <Link href="#">
                  <a className="btn btn-danger mb-3" style={{ marginLeft: 10 }} onClick={() => router.back()}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Back
                  </a>
                </Link>
              </div>

              <RenderHrEmployeeList filterOfficerName={filterOfficerName} />
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
}
