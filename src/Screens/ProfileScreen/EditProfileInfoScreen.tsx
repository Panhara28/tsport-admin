import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import XForm from '../../components/Form/XForm';
import Layout from '../../components/VerticalLayout';
import AuthContext from '../../components/Authentication/AuthContext';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { setting } from '../../libs/settings';
import { SingleUpload } from '../../components/SingleUpload';

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-bottom-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '2000',
  hideDuration: '2000',
  timeOut: '2000',
  extendedTimeOut: '2000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

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
      phoneNumber
      email
      profile_picture
    }
  }
`;

type Props = {
  peopleEditId?: number;
};

const FormBodyEdit = ({ update, defaultValues }: any) => {
  const [fullname, setFullName] = useState(defaultValues?.fullname || '');
  const [username, setUsername] = useState(defaultValues?.username || '');

  const [image, setImage]: any = useState(defaultValues?.profile_picture || undefined);

  const onSave = (e: any) => {
    e.preventDefault();

    const x: any = e.target;

    const input = {
      username: username,
      fullname: fullname,
      email: x.email?.value,
      phoneNumber: x.phoneNumber?.value,
    };

    update({
      ...input,
    });
  };

  return (
    <Form onSubmit={onSave}>
      <Row>
        <Col md={12}>
          <h4>Profile</h4>
          <SingleUpload image={image} setImage={setImage} width="150" height="150" />
        </Col>
      </Row>

      <Row className="mt-4">
        <h4>Security Info</h4>
        <Col md={6}>
          <XForm.Text label="Username" value={username} onChange={e => setUsername(e.currentTarget.value)} />
        </Col>
      </Row>
      <Row>
        <h4>User Info</h4>
        <hr />
        <Col md={6}>
          <XForm.Text label="Fullname" value={fullname} onChange={e => setFullName(e.currentTarget.value)} />
        </Col>
      </Row>

      <Row>
        <h4>Contact Info</h4>

        <Col md={6}>
          <XForm.Text
            label="Phone Number"
            type="text"
            name="phoneNumber"
            placeholder="Example: 095477325"
            defaultValue={defaultValues?.phoneNumber}
          />
        </Col>

        <Col md={6}>
          <XForm.Text label="Email (If any)" type="text" name="email" defaultValue={defaultValues?.email} />
        </Col>
      </Row>

      <Row>
        <Col>
          <XForm.Footer>
            <XForm.Button type="submit">Save</XForm.Button>
          </XForm.Footer>
        </Col>
      </Row>
    </Form>
  );
};

export default function EditProfileInfoScreen({ peopleEditId }: Props) {
  const router = useRouter();
  const { me } = useContext(AuthContext);

  const [updateProfile] = useMutation(UPDATE_MUTATION, {
    onCompleted: data => {
      if (data) {
        toastr.success('Profile Updated!');
      }
    },
  });

  const update = (input: any) => {
    updateProfile({
      variables: {
        input,
        id: me?.id,
      },
    });
  };

  const { data, loading } = useQuery(QUERY, {
    variables: {
      id: me?.id,
    },
  });

  if (!data || loading) return <></>;

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title={setting.title} breadcrumbItem="Edit Info" />
          <hr />
          <Row>
            <Col md={9}>
              <Card>
                <CardBody>
                  <FormBodyEdit defaultValues={data?.adminUserDetail} update={update} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
