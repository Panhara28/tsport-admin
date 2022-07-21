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
import Button from '../../components/Form/Button';
import { CustomPagination } from '../../components/Paginations';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';

const QUERY = gql`
  query hrEmployeeList($pagination: PaginationInput) {
    hrEmployeeList(pagination: $pagination) {
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

export function HrEmployeeListScreen() {
  const router = useRouter();

  const { data, loading } = useQuery(QUERY, {
    variables: {
      pagination: {
        page: router.query.page ? Number(router.query.page) : 1,
        size: 10,
      },
    },
  });

  if (loading || !data) return <div>Loading...</div>;

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
                      {data.hrEmployeeList.data.map((item: any) => {
                        return (
                          <tr key={item.id}>
                            <td>{item?.id}</td>
                            <td>{item?.fullname}</td>
                            <td>
                              <Link href={`/hr/officers/${item?.id}/edit`}>
                                <a style={{ marginLeft: 10 }} className="btn btn-primary">
                                  Edit
                                </a>
                              </Link>
                              {/* <Link href={`/hr/users/${item?.id}/role`}>
                                <a style={{ marginLeft: 10 }} className="btn btn-info">
                                  Assign Role
                                </a>
                              </Link>
                              <Link href="#">
                                <a style={{ marginLeft: 10 }} className="btn btn-danger">
                                  Remove
                                </a>
                              </Link> */}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
                <CustomPagination
                  total={data?.hrEmployeeList?.pagination?.total}
                  currentPage={data?.hrEmployeeList?.pagination?.current}
                  size={data?.hrEmployeeList?.pagination?.size}
                  limit={10}
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
