import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import XForm from '../../components/Form/XForm';
import { Layout } from '../../components/Layout';
import { Title } from '../../components/Title';
import { WebsiteSettingSidebar } from './WebsiteSettingSidebar';
import Select from 'react-select';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const QUERY = gql`
  query userList {
    userList {
      data {
        id
        fullname
      }
    }
  }
`;

const MUTATION = gql`
  mutation addPeopleToWebsite($websiteId: Int!, $input: [UserInputId]) {
    addPeopleToWebsite(websiteId: $websiteId, input: $input)
  }
`;
export function AddPeopleToWebsiteScreen() {
  const router = useRouter();
  const [addPeopleToWebsite] = useMutation(MUTATION, {
    onError: error => {
      console.log(error);
    },
  });
  const [input, setInput]: any[] = useState([]);
  const { data, loading } = useQuery(QUERY);

  if (loading || !data) return <div>Loading...</div>;

  const items: any[] = [];
  data.userList.data.map((item: any) => {
    items.push({
      label: item.fullname,
      value: item.id,
    });
  });
  const dataInput: any[] = [];

  input.map((item: any) => {
    dataInput.push({
      userId: item.value,
    });
  });

  const onAddPeople = () => {
    if (dataInput.length > 0) {
      addPeopleToWebsite({
        variables: {
          websiteId: Number(router.query.id),
          input: dataInput,
        },
      });
    } else {
      alert('No!');
    }
  };

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
            <Form.Label>Name</Form.Label>
            <Select
              onChange={e => {
                setInput(Array.isArray(e) ? e : []);
              }}
              isMulti
              name="colors"
              options={items}
              className="basic-multi-select"
              classNamePrefix="select"
            />
            <XForm.Footer>
              <XForm.Button onClick={onAddPeople} style={{ fontSize: 12 }}>
                Add People
              </XForm.Button>
            </XForm.Footer>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
