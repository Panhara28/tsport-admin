import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { Breadcrumb } from '../../../components/Common/Breadcrumb';
import XForm from '../../../components/Form/XForm';
import { CreateUpdateForm } from '../../../components/GraphQL/CreateUpdateForm';
import Layout from '../../../components/VerticalLayout';
import { WebsiteSettingSidebar } from '../WebsiteSettingSidebar';

const CREATE_MUTATION = gql`
  mutation adminCreateUser($input: UserInput) {
    adminCreateUser(input: $input)
  }
`;

const UPDATE_MUTATION = gql`
  mutation adminUpdateUser($id: Int!, $input: UserInput) {
    adminUpdateUser(id: $id, input: $input)
  }
`;

const QUERY = gql`
  query adminUserDetail($id: Int!) {
    adminUserDetail(id: $id) {
      id
      fullname
      username
    }
  }
`;

type Props = {
  peopleEditId?: number;
};

function FormBodyCreate({ update, defaultValues }: any) {
  const [fullname, setFullName] = useState(defaultValues?.fullname || '');
  const [username, setUsername] = useState(defaultValues?.username || '');
  const [password, setPassword] = useState(defaultValues?.password || '');

  const onSave = () => {
    update({
      fullname,
      username,
      password,
    });
  };

  return (
    <>
      <Row>
        <h4>Security Info</h4>
        <Col md={6}>
          <XForm.Text label="Username" value={username} onChange={e => setUsername(e.currentTarget.value)} />
        </Col>
        <Col md={6}>
          <XForm.Text
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </Col>
      </Row>
      <Row>
        <h4>User Info</h4>
        <Col md={6}>
          <XForm.Text label="Fullname" value={fullname} onChange={e => setFullName(e.currentTarget.value)} />
        </Col>
      </Row>
      <Row>
        <Col>
          <XForm.Footer>
            <XForm.Button onClick={onSave}>Save</XForm.Button>
          </XForm.Footer>
        </Col>
      </Row>
    </>
  );
}

const FormBodyEdit = ({ update, defaultValues }: any) => {
  const [fullname, setFullName] = useState(defaultValues?.fullname || '');
  const [username, setUsername] = useState(defaultValues?.username || '');
  const [password, setPassword] = useState(defaultValues?.password || '');

  const onSave = () => {
    update({
      fullname,
      username,
      password,
    });
  };

  return (
    <>
      <Row>
        <h4>User Info</h4>
        <Col md={6}>
          <XForm.Text label="Fullname" value={fullname} onChange={e => setFullName(e.currentTarget.value)} />
        </Col>
      </Row>
      <Row>
        <Col>
          <XForm.Footer>
            <XForm.Button onClick={onSave}>Save</XForm.Button>
          </XForm.Footer>
        </Col>
      </Row>
    </>
  );
};

export function AddPeopleToSystemScreen({ peopleEditId }: Props) {
  const router = useRouter();
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Create user" />
          <hr />
          <Row>
            <Col md={3} style={{ borderRight: '1px solid #ccc', height: '100vh' }}>
              <WebsiteSettingSidebar />
            </Col>
            <Col md={9}>
              <Card>
                <CardBody>
                  <CreateUpdateForm
                    body={!peopleEditId ? FormBodyCreate : FormBodyEdit}
                    update={UPDATE_MUTATION}
                    create={CREATE_MUTATION}
                    query={QUERY}
                    id={Number(peopleEditId)}
                    createReturned={`/mochub/websites/${router.query.id}/add-people`}
                    refectQuery="userList"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
