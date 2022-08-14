import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import XForm from '../../components/Form/XForm';
import Layout from '../../components/VerticalLayout';
// import style from './create-websites.module.scss';
import { RenderRoleModal } from './RenderRoleModal';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { SEO } from '../../components/SEO';

const QUERY = gql`
  query adminRoleList($userId: Int!) {
    adminRoleList {
      data {
        id
        name
      }
    }

    adminHasRole(userId: $userId) {
      id
      name
    }
  }
`;

const MUTATION = gql`
  mutation adminAssignRoleToUser($userId: Int!, $roleId: Int!) {
    adminAssignRoleToUser(userId: $userId, roleId: $roleId)
  }
`;

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-bottom-center',
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

type Props = {
  userEditId?: number;
};

export function AssignUserRoleScreen({ userEditId }: Props) {
  const router = useRouter();

  const [selected, setSelected] = useState(undefined);
  const [adminAssignRoleToUser] = useMutation(MUTATION);
  const [show, setShow] = useState<number>(0);

  const { data, loading } = useQuery(QUERY, {
    variables: {
      userId: Number(userEditId),
    },
    onCompleted: data => {
      setSelected(data.adminHasRole.id);
    },
  });

  if (loading || !data) return <div>Loading...</div>;

  const onValueChange = (e: any) => {
    setSelected(e.target.value);
  };

  const handleClose = () => setShow(0);
  const handleShow = (roleId: number) => {
    setShow(roleId);
    // setRoleId(roldId);
  };

  const onSaveRole = () => {
    adminAssignRoleToUser({
      variables: {
        userId: Number(router.query.userEditId),
        roleId: Number(selected),
      },
      onCompleted: data => {
        if (data.adminAssignRoleToUser) {
          toastr.success('Assign role has been successfully');
        }
      },
    });
  };

  return (
    <>
      <SEO
        title="Assign Role"
        description={`
                  Design & Develop  by Codehub Software Development Team
                `}
        image=""
      />
      <Layout>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Assign Role" />
            <hr />
            <Row>
              <Col md={8}>
                <Card>
                  <CardBody>
                    <Table responsive striped hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.adminRoleList?.data.map((role: any) => {
                          if (role?.name !== 'Default') {
                            return (
                              <tr key={role?.id}>
                                <td>{role.name}</td>
                                <td>
                                  <input
                                    type="radio"
                                    value={role.id}
                                    onChange={e => onValueChange(e)}
                                    checked={Number(selected) === role.id}
                                  />
                                  <span
                                    onClick={() => handleShow(role.id)}
                                    className="btn btn-primary"
                                    style={{ marginLeft: 10 }}
                                  >
                                    Manage Access
                                  </span>
                                </td>
                                <RenderRoleModal show={show} handleClose={handleClose} roleId={Number(role.id)} />
                              </tr>
                            );
                          }
                        })}
                      </tbody>
                    </Table>
                    <XForm.Footer>
                      <XForm.Button onClick={onSaveRole}>Save</XForm.Button>
                    </XForm.Footer>
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
