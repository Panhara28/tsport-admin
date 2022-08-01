import { gql } from '@apollo/client';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
import { Card } from 'reactstrap';
import { Label } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../../components/Common/Breadcrumb';
import XForm from '../../../components/Form/XForm';
import { CreateUpdateForm } from '../../../components/GraphQL/CreateUpdateForm';
import { SEO } from '../../../components/SEO';
import { SingleUpload } from '../../../components/SingleUpload';
import Layout from '../../../components/VerticalLayout';
import { setting } from '../../../libs/settings';

const CREATE_MUTATION = gql`
  mutation createHrDepartment($input: HrDepartmentInput) {
    createHrDepartment(input: $input)
  }
`;

const UPDATE_MUTATION = gql`
  mutation updateHrDepartment($id: Int!, $input: HrDepartmentInput) {
    updateHrDepartment(id: $id, input: $input)
  }
`;

const QUERY = gql`
  query hrDepartment($id: Int!) {
    hrDepartment(id: $id) {
      id
      name
    }
  }
`;

const FormBodyCreate = ({ update, defaultValues }: any) => {
  const [name, setName] = useState(defaultValues?.name || '');

  const onHandleSubmit = (e: any) => {
    e.preventDefault();

    const input = {
      name: name,
      parent_id: 0,
    };

    update({
      ...input,
    });

    setName('');
  };

  return (
    <>
      <SEO
        title="General Department"
        description={`
                  Design & Develop  by Moc Software Development Team
                `}
        image=""
      />
      <Form onSubmit={onHandleSubmit}>
        <Row>
          <h4>Informationss</h4>
          <hr />
          <Col md={6}>
            <XForm.Text
              label="General Department"
              value={name}
              name="name"
              onChange={e => setName(e.currentTarget.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col></Col>
          <Col md={6}>
            <XForm.Footer>
              <XForm.Button type="submit" style={{ padding: '1.3em' }}>
                Save
              </XForm.Button>
              <Link href="#">
                <a className="btn btn-danger " style={{ marginLeft: 10 }} onClick={() => router.back()}>
                  Cancel
                </a>
              </Link>
            </XForm.Footer>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const FormBodyEdit = ({ update, defaultValues }: any) => {
  const [name, setName] = useState(defaultValues?.name || '');

  const onHandleSubmit = (e: any) => {
    e.preventDefault();

    const x: any = e.target;

    const input = {
      name: name,
      parent_id: 0,
    };

    update({
      input: input,
    });
  };
  return (
    <Form onSubmit={onHandleSubmit}>
      <Row>
        <h4>Information</h4>
        <hr />
        <Col md={6}>
          <XForm.Text
            label="General Department"
            value={name}
            name="name"
            onChange={e => setName(e.currentTarget.value)}
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

export function CreateGeneralDepartmentScreen({ userEditId }: Props) {
  const router = useRouter();
  return (
    <>
      <SEO
        title="Dashboard"
        description={`
                  Design & Develop  by Moc Software Development Team
                `}
      />
      <Layout>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb breadcrumbItem="General Department" title={setting.title} />
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
                      refectQuery="adminUserList"
                    />
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
