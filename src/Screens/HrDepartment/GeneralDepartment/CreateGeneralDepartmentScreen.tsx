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
import useTranslation from 'next-translate/useTranslation';

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
  const { t } = useTranslation();
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
          <h4>{t('general_departments:create_general_department.information')}</h4>
          <hr />
          <Col md={6}>
            <XForm.Text
              label={t('general_departments:create_general_department.general_department_name')}
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
              <XForm.Button type="submit" style={{ padding: '1.3em', backgroundColor: '#5b73e8' }}>
                {t('general_departments:create_general_department.save_btn')}
              </XForm.Button>
              <Link href="#">
                <a className="btn btn-danger " style={{ marginLeft: 10 }} onClick={() => router.back()}>
                  {t('general_departments:create_general_department.cancel_btn')}
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
  const { t } = useTranslation();
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
        <h4>{t('general_departments:create_general_department.information')}</h4>
        <hr />
        <Col md={6}>
          <XForm.Text
            label={t('general_departments:create_general_department.general_department_name')}
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
            <XForm.Button type="submit">{t('general_departments:create_general_department.save_btn')}</XForm.Button>
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
  const { t } = useTranslation();
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
            <Breadcrumb
              breadcrumbItem={t('general_departments:create_general_department.title')}
              title={setting.title}
            />
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
