import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Notiflix from 'notiflix';
import { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AuthContext from '../../../../../src/components/Authentication/AuthContext';
import { Breadcrumb } from '../../../../../src/components/Common/Breadcrumb';
import XForm from '../../../../../src/components/Form/XForm';
import { CreateUpdateForm } from '../../../../../src/components/GraphQL/CreateUpdateForm';
import Layout from '../../../../../src/components/VerticalLayout';
import { WebsiteSettingSidebar } from '../../../../../src/Screens/websites/WebsiteSettingSidebar';

const QUERY = gql`
  query website($id: Int!) {
    website(id: $id) {
      id
      name
      description
    }
  }
`;

const MUTATION_CREATE = gql`
  mutation createWebsite($input: WebsiteInput) {
    createWebsite(input: $input)
  }
`;

const MUTATION_UPDATE = gql`
  mutation updateWebsite($id: Int!, $input: WebsiteInput) {
    updateWebsite(id: $id, input: $input)
  }
`;

function FormBody({ update, defaultValues }: any) {
  const [name, setName] = useState(defaultValues?.name || '');
  const [description, setDescription] = useState(defaultValues?.description || '');
  const onSave = () => {
    update({
      name,
      description,
    });
  };
  return (
    <>
      <XForm.Text label="Website name" value={name} onChange={e => setName(e.currentTarget.value)} />
      <XForm.TextArea label="Description" value={description} onChange={e => setDescription(e.currentTarget.value)} />
      <XForm.Footer>
        <XForm.Button onClick={onSave}>Save</XForm.Button>
      </XForm.Footer>
    </>
  );
}

export default function SettingPage() {
  const router = useRouter();
  const { me } = useContext(AuthContext);
  if (me.roleName !== 'Site Administrator') {
    Notiflix.Notify.failure("You don't have permission!");
    router.push('/');
  }
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Website Setting" />
          <hr />
          <Row>
            <Col md={3} style={{ borderRight: '1px solid #ccc', height: '100vh' }}>
              <WebsiteSettingSidebar />
            </Col>
            <Col md={9}>
              <h6>Edit Website</h6>
              <CreateUpdateForm
                body={FormBody}
                update={MUTATION_UPDATE}
                create={MUTATION_CREATE}
                query={QUERY}
                id={Number(router.query.id)}
                createReturned={'/brand_list/list'}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
