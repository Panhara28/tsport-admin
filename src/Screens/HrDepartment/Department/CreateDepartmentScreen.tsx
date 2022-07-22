import { gql, useQuery } from '@apollo/client';
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
      parent_id
    }
  }
`;

const GENERAL_DEPARTMENT_QUERY = gql`
  query hrDepartmentList($branch_level: Int) {
    hrDepartmentList(branch_level: $branch_level)
  }
`;

const GeneralDepartmentSelect = ({ generalDepartment, setGeneralDepartment }: any) => {
  const { data, loading } = useQuery(GENERAL_DEPARTMENT_QUERY, {
    variables: {
      branch_level: 0,
    },
  });

  if (!data || loading) return <></>;

  const options = data?.hrDepartmentList?.map((x: any) => {
    return {
      text: x?.name,
      value: x?.id,
    };
  });

  return (
    <XForm.Select
      label="Select General Department"
      items={options}
      onChange={(x: any) => setGeneralDepartment(x.target.value)}
      value={generalDepartment}
    />
  );
};

const FormBodyCreate = ({ update, defaultValues }: any) => {
  const [name, setName] = useState(defaultValues?.name || '');
  const [generalDepartment, setGeneralDepartment] = useState(defaultValues?.parent_id || '');

  const onHandleSubmit = (e: any) => {
    e.preventDefault();

    const input = {
      name: name,
      parent_id: Number(generalDepartment),
    };

    update({
      ...input,
    });

    setName('');
  };

  return (
    <Form onSubmit={onHandleSubmit}>
      <Row>
        <h4>Information</h4>
        <hr />
        <Col md={6}>
          <XForm.Text label="Department" value={name} name="name" onChange={e => setName(e.currentTarget.value)} />
        </Col>
        <Col md={6}>
          <GeneralDepartmentSelect generalDepartment={generalDepartment} setGeneralDepartment={setGeneralDepartment} />
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
  );
};

const FormBodyEdit = ({ update, defaultValues }: any) => {
  const [name, setName] = useState(defaultValues?.name || '');
  const [generalDepartment, setGeneralDepartment] = useState(defaultValues?.parent_id || '');

  const onHandleSubmit = (e: any) => {
    e.preventDefault();

    const x: any = e.target;

    const input = {
      name: name,
      parent_id: Number(generalDepartment),
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
          <XForm.Text label="Department" value={name} name="name" onChange={e => setName(e.currentTarget.value)} />
        </Col>
        <Col md={6}>
          <GeneralDepartmentSelect generalDepartment={generalDepartment} setGeneralDepartment={setGeneralDepartment} />
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
  );
};

type Props = {
  userEditId?: number;
};

export function CreateDepartmentScreen({ userEditId }: Props) {
  const router = useRouter();
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb breadcrumbItem="Department" title={setting.title} />
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
  );
}
