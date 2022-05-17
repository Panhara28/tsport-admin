import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../../components/Common/Breadcrumb';
import Layout from '../../../components/VerticalLayout';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const MUTATION = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password)
  }
`;

export function ChangePasswordScreen() {
  const [password, setPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);

  const [changePassword, { loading }] = useMutation(MUTATION, {
    onCompleted: data => {
      if (data.changePassword) {
        toastr.success('Your password has been changed');
        localStorage.removeItem('token');
        window.location.replace('/');
      }
    },
  });

  const onHandleChange = (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toastr.error('Password Does Not Match!');
      return;
    } else {
      changePassword({
        variables: {
          password,
        },
      });
    }
  };

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Change password" />
          <hr />
          <Row className="mb-4">
            <Col xl="4">
              <Card className="card h-100">
                <CardBody>
                  <Form onSubmit={e => onHandleChange(e)}>
                    <Form.Group>
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="New password"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirmation password"
                        value={confirmPassword}
                        onChange={(e: any) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                      Change Password
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
