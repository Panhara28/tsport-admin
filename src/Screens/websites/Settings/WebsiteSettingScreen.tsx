import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import XForm from '../../../components/Form/XForm';
import { CreateUpdateForm } from '../../../components/GraphQL/CreateUpdateForm';
import { Layout } from '../../../components/Layout';
import { Title } from '../../../components/Title';
import { WebsiteSettingSidebar } from '../WebsiteSettingSidebar';

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

export const WebsiteSettingScreen = () => {
  const router = useRouter();
  const { data } = useQuery<any>(QUERY, { variables: { id: Number(router.query.id) } });

  return (
    <Layout>
      <Container>
        <Row className="mt-4 mx-4">
          <Col>
            <Title title="Website setting" />
          </Col>
        </Row>
        <Row className="mx-4">
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
    </Layout>
  );
};
