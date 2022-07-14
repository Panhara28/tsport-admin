import { useQuery } from '@apollo/client';
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
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import { CustomPagination } from '../../components/Paginations';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';

const QUERY = gql`
  query adminUserList($pagination: PaginationInput) {
    adminUserList(pagination: $pagination) {
      data {
        id
        fullname
      }
      pagination {
        current
        size
        total
      }
    }
  }
`;

export function UserListScreen() {
  const router = useRouter();
  const { data, loading } = useQuery(QUERY, {
    variables: {
      pagination: {
        page: 1,
        size: 10,
      },
    },
  });
  if (loading || !data) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb breadcrumbItem="User list" title={setting.title} />
          <hr />
          <Row>
            <Col md={9}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link href={`/hr/users/create`}>
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
                        <th>Fullname</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.adminUserList.data.map((item: any) => {
                        return (
                          <tr>
                            <td>{item.id}</td>
                            <td>{item.fullname}</td>
                            <td>
                              <Link href={`/hr/users/${item.id}/edit`}>
                                <a style={{ marginLeft: 10 }}>Edit</a>
                              </Link>
                              <Link href="#">
                                <a style={{ marginLeft: 10 }}>Assign Role</a>
                              </Link>
                              <Link href="#">
                                <a style={{ marginLeft: 10 }}>Remove</a>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
                <CustomPagination
                  total={data?.adminUserList.pagination.total}
                  currentPage={data?.adminUserList.pagination.current}
                  size={data?.adminUserList.pagination.size}
                  isMedia={false}
                />
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
  );
}
