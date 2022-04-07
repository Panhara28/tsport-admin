import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import XForm from '../../components/Form/XForm';
import { Layout } from '../../components/Layout';
import { Title } from '../../components/Title';

const QUERY = gql`
  query adminRoleList($websiteId: Int!, $userId: Int!) {
    adminRoleList(websiteId: $websiteId) {
      data {
        id
        name
      }
    }

    adminHasRole(websiteId: $websiteId, userId: $userId) {
      id
      name
    }
  }
`;

const MUTATION = gql`
  mutation adminAssignRoleToUser($userId: Int!, $websiteId: Int!, $roleId: Int!) {
    adminAssignRoleToUser(userId: $userId, websiteId: $websiteId, roleId: $roleId)
  }
`;

export function PeopleRoleScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState(undefined);
  const [adminAssignRoleToUser] = useMutation(MUTATION);

  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId: Number(router.query.id),
      userId: Number(router.query.peopleId),
    },
    onCompleted: data => {
      setSelected(data.adminHasRole.id);
    },
  });

  if (loading || !data) return <div>Loading...</div>;

  const onValueChange = (e: any) => {
    setSelected(e.target.value);
  };

  const onSaveRole = () => {
    adminAssignRoleToUser({
      variables: {
        userId: Number(router.query.peopleId),
        websiteId: Number(router.query.id),
        roleId: Number(selected),
      },
    });
  };

  return (
    <Layout>
      <Container>
        <Row className="mt-4 mx-4">
          <Col>
            <Title title="Role setting" />
          </Col>
        </Row>
        <Row className="mt-4 mx-4">
          <Col md={8}>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {data?.adminRoleList?.data.map((role: any) => {
                  return (
                    <tr>
                      <td>{role.id}</td>
                      <td>{role.name}</td>
                      <td>
                        <input
                          type="radio"
                          value={role.id}
                          onChange={e => onValueChange(e)}
                          checked={Number(selected) === role.id}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <XForm.Footer>
              <XForm.Button onClick={onSaveRole}>Save</XForm.Button>
            </XForm.Footer>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
