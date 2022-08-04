import { gql, useMutation, useQuery } from '@apollo/client';
import { faChevronDown, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Dropdown, Modal, Table } from 'react-bootstrap';
import { Row } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Button } from 'reactstrap';
import { Col } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import { DashboardCard } from '../../components/Dashboard/DashboardCard';
import XForm from '../../components/Form/XForm';
import { CustomPagination } from '../../components/Paginations';
import BiographyForm from '../../components/PrintForm/BiographyForm/BiographyForm';
import ContractForm from '../../components/PrintForm/ContractForm/ContractForm';
import CVForm from '../../components/PrintForm/CVForm/CVForm';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';
import { CustomModal, CustomTableContainer } from './DashboardScreen.styled';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useAuthContext } from '../../components/Authentication/AuthContext';
import useTranslation from 'next-translate/useTranslation';

const QUERY = gql`
  query hrDepartmentUsersCount($filter: HrDepartmentUsersCountFilter, $pagination: PaginationInput) {
    hrDepartmentUsersCount(filter: $filter, pagination: $pagination)
  }
`;

const CREATE_MUTATION = gql`
  mutation createHrDepartment($input: HrDepartmentInput) {
    createHrDepartment(input: $input)
  }
`;

type DepartmentListDashboardScreenProps = {
  departmentId?: number;
  generalDepartmentId?: number;
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

const RenderHrEmployeeList = ({ departmentId, filterOfficerName }: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isShow, setIsShow] = useState(0);
  const [isShowContractForm, setIsShowContractForm] = useState(0);
  const [isShowCVForm, setIsShowCVForm] = useState(0);

  const { data, loading } = useQuery(QUERY, {
    variables: {
      filter: {
        parent_id: departmentId,
        type: 'DEPARTMENT',
        officerName: filterOfficerName,
      },
      pagination: {
        page: router.query.page ? Number(router.query.page) : 1,
        size: 10,
      },
    },
  });

  if (!data || loading) return <></>;

  return (
    <Card>
      <CardBody>
        <CustomTableContainer>
          <Table className="table-centered table-nowrap mb-0" hover striped>
            <thead>
              <tr>
                <th>{t('dashboard:dashboard.table.profile')}</th>
                <th>{t('dashboard:dashboard.table.fullname')}</th>
                <th>{t('dashboard:dashboard.table.gender')}</th>
                <th>{t('dashboard:dashboard.table.phone_number')}</th>
                <th>{t('dashboard:dashboard.table.email')}</th>
                <th>{t('dashboard:dashboard.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {data?.hrDepartmentUsersCount?.totalUsers?.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="d-flex justify-content-center mt-5">
                      <img src="/dashboard-no-data.png" width="600px" />
                    </div>
                  </td>
                </tr>
              ) : (
                data?.hrDepartmentUsersCount?.totalUsers?.map((item: any) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <div onClick={() => setIsShow(item?.id)} style={{ borderRadius: '50%', overflow: 'hidden' }}>
                          <Image
                            className="profile_picture"
                            src={item?.profile ? item.profile : '/icons/profile.png'}
                            alt="profile"
                            layout="responsive"
                            width={512}
                            height={512}
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
                              {t('dashboard:dashboard.table.forms')} <FontAwesomeIcon icon={faChevronDown} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => setIsShow(item?.id)}>ជីវប្រវត្តិសង្ខេប</Dropdown.Item>
                              <Dropdown.Item onClick={() => setIsShowContractForm(item?.id)}>កិច្ចសន្យា</Dropdown.Item>
                              <Dropdown.Item onClick={() => setIsShowCVForm(item?.id)}>ប្រវត្តិរូបសង្ខេប</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>

                          <Link href={`/hr/officers/${item?.id}/edit`}>
                            <a style={{ marginLeft: 10 }} className="btn btn-primary">
                              {t('dashboard:dashboard.table.edit')}
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
                })
              )}
            </tbody>
          </Table>
        </CustomTableContainer>
      </CardBody>
      <CustomPagination
        total={data?.hrDepartmentUsersCount?.pagination?.total}
        currentPage={data?.hrDepartmentUsersCount?.pagination?.current}
        size={data?.hrDepartmentUsersCount?.pagination?.size}
        limit={10}
      />
    </Card>
  );
};

type RenderAddOfficeProps = {
  show: boolean;
  setShow: any;
  parent_id: number;
  parent_name: string;
};

const RenderAddOffice = ({ show, setShow, parent_id, parent_name }: RenderAddOfficeProps) => {
  const [createHrDepartment] = useMutation(CREATE_MUTATION, {
    onCompleted: data => {
      if (data) {
        toastr.success('Office Added Successfully!');
        setShow(false);
      }
    },
    onError: (error: any) => {
      if (error?.message) {
        toastr.error(error?.message);
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
          parent_id: parent_id,
          name: nameInput?.value,
        },
      },
    });
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>Add Office To {parent_name}</Modal.Header>
        <Modal.Body>
          <input ref={node => (nameInput = node)} className="form-control mb-4" placeholder="Enter office name..." />
          <Button className="btn-success" onClick={(e: any) => onHandleCreate(e)}>
            Create
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

const DepartmentListDashboardScreen = ({ departmentId, generalDepartmentId }: DepartmentListDashboardScreenProps) => {
  const { t } = useTranslation();
  const { me } = useAuthContext();
  const [filterOfficerName, setFilterOfficerName] = useState(undefined);
  const [show, setShow] = useState(false);

  const { data, loading } = useQuery(QUERY, {
    variables: {
      filter: {
        parent_id: departmentId,
        type: 'DEPARTMENT',
      },
    },
  });

  if (!data || loading) return <></>;

  if (data?.hrDepartmentUsersCount?.data?.length === 0) {
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

            <RenderAddOffice
              show={show}
              setShow={setShow}
              parent_id={Number(departmentId)}
              parent_name={data?.hrDepartmentUsersCount?.parent?.name}
            />

            <div className="d-flex flex-column align-items-center  mt-5">
              <img src="/dashboard-no-data.png" width="600px" />

              {me?.access?.officeWrite ? (
                <Button className="mb-4 btn-success" onClick={() => setShow(true)}>
                  {t('dashboard:dashboard.add_office')}
                </Button>
              ) : (
                undefined
              )}
            </div>
          </Container>
        </div>
      </Layout>
    );
  }

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

          <RenderAddOffice
            show={show}
            setShow={setShow}
            parent_id={Number(departmentId)}
            parent_name={data?.hrDepartmentUsersCount?.parent?.name}
          />

          {me?.access?.departmentWrite ? (
            <Button className="mb-4 btn-success" onClick={() => setShow(true)}>
              {t('dashboard:dashboard.add_office')}
            </Button>
          ) : (
            undefined
          )}

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
                        link={`/hr/dashboard/general-department/${generalDepartmentId}/department/${departmentId}/office/${item?.id}`}
                        icon={faNetworkWired}
                      />
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {data?.hrDepartmentUsersCount?.totalUsers?.length > 0 ? (
            <>
              <hr />

              <Row>
                <Col md={9}>
                  <RenderHrEmployeeList departmentId={departmentId} filterOfficerName={filterOfficerName} />
                </Col>
                <Col md={3}>
                  <Card>
                    <CardBody>
                      <h6>{t('common:filter_card.title')}</h6>
                      <hr />
                      <label>{t('common:filter_card.filter_label')}</label>
                      <XForm.Text
                        value={filterOfficerName}
                        onChange={(e: any) => setFilterOfficerName(e?.target?.value)}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </>
          ) : (
            undefined
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default DepartmentListDashboardScreen;
