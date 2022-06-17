import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import XForm from '../../components/Form/XForm';
import { WebsiteSettingSidebar } from './WebsiteSettingSidebar';
import Select from 'react-select';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Layout from '../../components/VerticalLayout';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { setting } from '../../libs/settings';

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

const MUTATION = gql`
  mutation adminAddPeopleToWebsite($websiteId: Int!, $input: [UserInputId]) {
    adminAddPeopleToWebsite(websiteId: $websiteId, input: $input)
  }
`;

export function AddPeopleToWebsiteScreen() {
  const router = useRouter();
  const [adminAddPeopleToWebsite] = useMutation(MUTATION, {
    onCompleted: data => {
      if (data.adminAddPeopleToWebsite) {
        toastr.success('User has been add successfully');
      }
    },
    onError: error => {
      toastr.error(error.message);
    },
  });
  const [input, setInput]: any[] = useState([]);
  const { data, loading } = useQuery(QUERY);

  if (loading || !data) return <div>Loading...</div>;

  const items: any[] = [];
  data.adminUserList.data.map((item: any) => {
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
      adminAddPeopleToWebsite({
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
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title={setting.title} breadcrumbItem="Add People" />
          <hr />
          <Row>
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
      </div>
    </Layout>
  );
}
