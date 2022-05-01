import { useQuery } from '@apollo/client';
import { faAngleLeft, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql } from 'apollo-boost';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CardBody } from 'reactstrap';
import { CardTitle } from 'reactstrap';
import { Card } from 'reactstrap';
import { Table } from 'reactstrap';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../../../components/Common/Breadcrumb';
import { CustomPagination } from '../../../../components/Paginations';
import Layout from '../../../../components/VerticalLayout';

const QUERY = gql`
  query newsCategoryList($websiteId: Int!, $pagination: PaginationInput) {
    newsCategoryList(websiteId: $websiteId, pagination: $pagination) {
      data {
        id
        name
        created_at
      }
      pagination {
        total
        size
        current
      }
    }
  }
`;

export function CategoryListScreen() {
  const router = useRouter();
  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId: Number(router.query.id),
      pagination: {
        page: 1,
        size: 10,
      },
    },
  });
  if (loading || !data) return <>Loading...</>;
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="News Category" />
          <hr />
          <Row>
            <Col md={9}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link href={`/mochub/websites/${router.query.id}/cms/news-category/create`}>
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
                  <CardTitle className="h4 mb-4">All news categories</CardTitle>
                  <div className="table-responsive">
                    <Table className="table-centered table-nowrap mb-0" hover striped>
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Created At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.newsCategoryList.data.map((item: any) => {
                          return (
                            <>
                              <tr>
                                <td>{item.id}</td>
                                <td
                                  style={{
                                    whiteSpace: 'break-spaces',
                                    width: '70%',
                                  }}
                                >
                                  {item.name}
                                </td>
                                <td>{moment(Number(item.created_at)).format('DD, MMM YYYY')}</td>
                                <td>
                                  <Link href={`/mochub/websites/${router.query.id}/cms/news-category/${item.id}/edit`}>
                                    <a
                                      className="btn btn-primary btn-sm btn-rounded waves-effect waves-light"
                                      style={{ marginRight: 12 }}
                                    >
                                      <FontAwesomeIcon icon={faEdit} /> Edit
                                    </a>
                                  </Link>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                <CustomPagination
                  total={data.newsCategoryList.pagination.total}
                  currentPage={data.newsCategoryList.pagination.current}
                  size={data.newsCategoryList.pagination.size}
                  limit={10}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
