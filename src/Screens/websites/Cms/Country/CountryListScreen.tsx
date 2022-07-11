import { useQuery } from '@apollo/client';
import { faAngleLeft, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql } from 'apollo-boost';
import moment from 'moment';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import { CardBody } from 'reactstrap';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { Table } from 'reactstrap';
import { CardTitle } from 'reactstrap';
import { Card } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../../../components/Common/Breadcrumb';
import { CustomPagination } from '../../../../components/Paginations';
import Layout from '../../../../components/VerticalLayout';
import { setting } from '../../../../libs/settings';

const QUERY = gql`
  query countryList($websiteId: Int!, $pagination: PaginationInput) {
    countryList(websiteId: $websiteId, pagination: $pagination) {
      data {
        id
        countryName {
          kh
          en
        }
        code
      }
      pagination {
        total
        size
        current
      }
    }
  }
`;

export const CountryListScreen = () => {
  const router = useRouter();
  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId: Number(router.query.id),
      pagination: {
        page: 1,
        size: 300,
      },
    },
  });

  if (loading || !data) return <>Loading...</>;

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title={setting.title} breadcrumbItem="Country" />
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
                          <th>Country Name</th>
                          <th>Code</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.countryList.data.map((item: any) => {
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
                                  {item.countryName.en}
                                </td>
                                <td>{item.code}</td>
                                <td>
                                  <Link href={`/mochub/websites/${router.query.id}/cms/country/${item.id}/edit`}>
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
                  total={data.countryList.pagination.total}
                  currentPage={data.countryList.pagination.current}
                  size={data.countryList.pagination.size}
                  limit={10}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};
