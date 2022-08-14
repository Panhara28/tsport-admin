import { useQuery } from '@apollo/client';
import { faAngleLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
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
import { SEO } from '../../components/SEO';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';

const QUERY = gql`
  query adminUserList($pagination: PaginationInput, $filter: UserFilter) {
    adminUserList(pagination: $pagination, filter: $filter) {
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

const RenderUserList = ({ filterFullname }: any) => {
  const router = useRouter();

  const { data, loading } = useQuery(QUERY, {
    variables: {
      pagination: {
        page: router.query.page ? Number(router.query.page) : 1,
        size: 10,
      },
      filter: {
        fullname: filterFullname,
      },
    },
  });

  if (loading || !data) return <div>Loading...</div>;

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
            {data.adminUserList.data.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="d-flex justify-content-center mt-5">
                    <img src="/dashboard-no-data.png" width="600px" />
                  </div>
                </td>
              </tr>
            ) : (
              data.adminUserList.data.map((item: any) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.fullname}</td>
                    <td>
                      <Link href={`/hr/users/${item?.id}/edit`}>
                        <a style={{ marginLeft: 10 }} className="btn btn-primary">
                          Edit
                        </a>
                      </Link>
                      <Link href={`/hr/users/${item?.id}/role`}>
                        <a style={{ marginLeft: 10 }} className="btn btn-info">
                          Assign Role
                        </a>
                      </Link>
                      <Link href="#">
                        <a style={{ marginLeft: 10 }} className="btn btn-danger">
                          Remove
                        </a>
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </CardBody>
      <CustomPagination
        total={data?.adminUserList?.pagination?.total}
        currentPage={data?.adminUserList?.pagination?.current}
        size={data?.adminUserList?.pagination?.size}
        limit={10}
      />
    </Card>
  );
};

export function UserListScreen() {
  const router = useRouter();
  const [filterFullname, setFilterFullname] = useState(undefined);

  return (
    <>
      <SEO
        title="User List"
        description={`
                  Design & Develop  by Codehub Software Development Team
                `}
        image=""
      />
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
                <RenderUserList filterFullname={filterFullname} />
              </Col>
              <Col md={3}>
                <Card>
                  <CardBody>
                    <h6>Filter</h6>
                    <hr />
                    <label>Search by Fullname</label>
                    <XForm.Text value={filterFullname} onChange={(e: any) => setFilterFullname(e?.target?.value)} />
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
