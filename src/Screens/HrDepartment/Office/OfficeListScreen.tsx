import { useMutation, useQuery } from '@apollo/client';
import { faAngleLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
import { Card } from 'reactstrap';
import { Table } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import Swal from 'sweetalert2';
import { Breadcrumb } from '../../../components/Common/Breadcrumb';
import { CustomPagination } from '../../../components/Paginations';
import { SEO } from '../../../components/SEO';
import Layout from '../../../components/VerticalLayout';
import { setting } from '../../../libs/settings';

const QUERY = gql`
  query hrDepartmentList($branch_level: Int) {
    hrDepartmentList(branch_level: $branch_level)
  }
`;

const REMOVE_DEPARTMENT = gql`
  mutation removeHrDepartment($id: Int!) {
    removeHrDepartment(id: $id)
  }
`;

export function OfficeListScreen() {
  const router = useRouter();

  const { data, loading } = useQuery(QUERY, {
    variables: {
      branch_level: 2,
      pagination: {
        page: router.query.page ? Number(router.query.page) : 1,
        size: 10,
      },
    },
  });

  const [removeHrDepartment] = useMutation(REMOVE_DEPARTMENT, { refetchQueries: ['hrDepartmentList'] });

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

          removeHrDepartment({
            variables: {
              id: id,
            },
          });
        }
      });
  };

  return (
    <>
      <SEO
        title="Office List"
        description={`
                  Design & Develop  by Moc Software Development Team
                `}
        image=""
      />
      <Layout>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb breadcrumbItem="Office list" title={setting.title} />
            <hr />
            <Row>
              <Col md={9}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Link href={`/hr/offices/create`}>
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
                <Card>
                  <CardBody>
                    <Table className="table-centered table-nowrap mb-0" hover striped>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.hrDepartmentList.map((item: any) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>
                                <Link href={`/hr/offices/${item?.id}/edit`}>
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
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                  {/* <CustomPagination
                    total={data?.adminUserList?.pagination?.total}
                    currentPage={data?.adminUserList?.pagination?.current}
                    size={data?.adminUserList?.pagination?.size}
                    limit={10}
                  /> */}
                </Card>
              </Col>
              <Col md={3}>
                <Card>
                  <CardBody>
                    <h6>Filter</h6>
                    <hr />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Layout>
    </>
  );
}
