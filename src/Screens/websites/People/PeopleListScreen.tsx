import { gql, useQuery } from '@apollo/client';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Title } from '../../../components/Title';
import Layout from '../../../components/VerticalLayout';

const QUERY = gql`
  query adminUserList {
    adminUserList {
      data {
        id
        fullname
      }
    }
  }
`;

export const PeopleListScreen = () => {
  const { data, loading } = useQuery(QUERY);
  if (loading || !data) return <div>Loading...</div>;
  return (
    <Layout>
      <Container>
        <Row className="mx-4 mt-4">
          <Col>
            <Title title="People">
              <Link href="/mochub/people/create">
                <a style={{ marginLeft: 10 }}>
                  <FontAwesomeIcon icon={faPlusCircle} />
                </a>
              </Link>
            </Title>
          </Col>
        </Row>
        <Row className="mx-4">
          <Col md={8}>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fullname</th>
                </tr>
              </thead>
              <tbody>
                {data.adminUserList.data.map((item: any) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.fullname}</td>
                      <td>
                        <Link href={`/mochub/people/create/${item.id}/`}>
                          <a>Edit</a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
