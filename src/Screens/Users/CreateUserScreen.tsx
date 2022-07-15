import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import XForm from '../../components/Form/XForm';
import { CreateUpdateForm } from '../../components/GraphQL/CreateUpdateForm';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';

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

const FormBodyCreate = ({ update, defaultValues }: any) => {
  const [fullname, setFullName] = useState(defaultValues?.fullname || '');
  const [username, setUsername] = useState(defaultValues?.username || '');
  const [password, setPassword] = useState(defaultValues?.password || '');
  const onHandleSubmit = (e: any) => {
    e.preventDefault();

    const input = {
      username: username,
      password: password,
      fullname: fullname,
    };

    update({
      ...input,
    });
  };

  return (
    <Form onSubmit={onHandleSubmit}>
      <Row>
        <h4>Information</h4>
        <hr />
        <Col md={12}>
          <XForm.Text
            label="Fullname"
            value={fullname}
            name="fullname"
            onChange={e => setFullName(e.currentTarget.value)}
          />
        </Col>
      </Row>
      <Row>
        <h4>Sercurity</h4>
        <hr />
        <Col md={6}>
          <XForm.Text
            label="Username"
            value={username}
            name="username"
            onChange={e => setUsername(e.currentTarget.value)}
          />
        </Col>
        <Col md={6}>
          <XForm.Text
            label="Password"
            value={password}
            name="password"
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col md={6}>
          <XForm.Footer>
            <XForm.Button type="submit">Save</XForm.Button>
          </XForm.Footer>
        </Col>
      </Row>
    </Form>
  );
};

const FormBodyEdit = ({ update, defaultValues }: any) => {
  const [fullname, setFullName] = useState(defaultValues?.fullname || '');
  const [username, setUsername] = useState(defaultValues?.username || '');
  const [password, setPassword] = useState(defaultValues?.password || '');
  const onHandleSubmit = (e: any) => {
    e.preventDefault();

    const x: any = e.target;

    const input = {
      username: username,
      password: password,
      fullname: fullname,
    };

    update({
      input,
    });
  };
  return (
    <Form onSubmit={onHandleSubmit}>
      <Row>
        <h4>Information</h4>
        <hr />
        <Col md={12}>
          <XForm.Text
            label="Fullname"
            value={fullname}
            name="fullname"
            onChange={e => setFullName(e.currentTarget.value)}
          />
        </Col>
      </Row>
      <Row>
        <h4>Sercurity</h4>
        <hr />
        <Col md={6}>
          <XForm.Text
            label="Username"
            value={username}
            name="username"
            onChange={e => setUsername(e.currentTarget.value)}
          />
        </Col>
        <Col md={6}>
          <XForm.Text
            label="Password"
            value={password}
            name="password"
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col md={6}>
          <XForm.Footer>
            <XForm.Button type="submit">Save</XForm.Button>
          </XForm.Footer>
        </Col>
      </Row>
    </Form>
  );
};

type Props = {
  userEditId?: number;
};

export function CreateUserScreen({ userEditId }: Props) {
  const router = useRouter();
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb breadcrumbItem="Create user" title={setting.title} />
          <hr />
          <Row>
            <Col md={9}>
              <Card>
                <CardBody>
                  <CreateUpdateForm
                    body={!userEditId ? FormBodyCreate : FormBodyEdit}
                    update={UPDATE_MUTATION}
                    create={CREATE_MUTATION}
                    query={QUERY}
                    id={Number(userEditId)}
                    createReturned={`/hr/users/`}
                    refectQuery="adminUserList"
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
