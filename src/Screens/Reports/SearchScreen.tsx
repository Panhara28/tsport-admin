import Select from 'react-select';
import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Table } from 'react-bootstrap';
import { Card } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import Link from 'next/link';

const QUERY = gql`
  query employeeReport($pagination: PaginationInput, $filter: EmployeeReportFilter) {
    employeeReport(pagination: $pagination, filter: $filter) {
      data {
        fullname
        email
        profile
        gender
        phoneNumber
      }
    }
  }
`;

function RenderReport() {
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
    <>
      {data.employeeReport.data.map((item: any) => {
        return (
          <tr>
            <td>{item.profile}</td>
            <td>{item.fullname}</td>
            <td>{item.gender}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.email}</td>
            <td>
              <Link href="#">
                <a className="btn btn-primary">Edit</a>
              </Link>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export function SearchScreen() {
  return (
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
                      <Select />
                    </Col>
                    <Col md={3}>
                      <Select />
                    </Col>
                    <Col md={3}>
                      <Select />
                    </Col>
                    <Col md={3}>
                      <input className="form-control" />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardBody>
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
                      <RenderReport />
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
