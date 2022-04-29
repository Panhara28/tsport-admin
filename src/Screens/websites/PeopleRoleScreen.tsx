import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import XForm from '../../components/Form/XForm';
import Layout from '../../components/VerticalLayout';
import style from './create-websites.module.scss';
import { RenderRoleModal } from './RenderRoleModal';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const QUERY = gql`
  query adminRoleList($websiteId: Int!, $userId: Int!) {
    adminRoleList(websiteId: $websiteId) {
      data {
        id
        name
      }
    }

    adminHasRole(websiteId: $websiteId, userId: $userId) {
      id
      name
    }
  }
`;

const MUTATION = gql`
  mutation adminAssignRoleToUser($userId: Int!, $websiteId: Int!, $roleId: Int!) {
    adminAssignRoleToUser(userId: $userId, websiteId: $websiteId, roleId: $roleId)
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

export function PeopleRoleScreen() {
  const router = useRouter();
  const [read, setRead] = useState<boolean>(false);
  const [write, setWrite] = useState<boolean>(false);
  const [modified, setModified] = useState<boolean>(false);
  const [selected, setSelected] = useState(undefined);
  const [adminAssignRoleToUser] = useMutation(MUTATION);
  const [show, setShow] = useState<boolean>(false);
  const [roleId, setRoleId] = useState<any>(undefined);

  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId: Number(router.query.id),
      userId: Number(router.query.peopleId),
    },
    onCompleted: data => {
      setSelected(data.adminHasRole.id);
    },
  });

  if (loading || !data) return <div>Loading...</div>;

  const onValueChange = (e: any) => {
    setSelected(e.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = (roldId: number) => {
    setShow(true);
    setRoleId(roldId);
  };

  const onSaveRole = () => {
    adminAssignRoleToUser({
      variables: {
        userId: Number(router.query.peopleId),
        websiteId: Number(router.query.id),
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
      <Layout>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Add People" />
            <hr />
            <Row>
              <Col md={8}>
                <Card>
                  <CardBody>
                    <Table responsive striped hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.adminRoleList?.data.map((role: any) => {
                          return (
                            <tr>
                              <td>{role.id}</td>
                              <td>{role.name}</td>
                              <td>
                                <input
                                  type="radio"
                                  value={role.id}
                                  onChange={e => onValueChange(e)}
                                  checked={Number(selected) === role.id}
                                />
                                <span onClick={() => handleShow(role.id)} className={style.mocPluginCardButtonWarning}>
                                  Manage Access
                                </span>
                              </td>
                            </tr>
                          );
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
      <RenderRoleModal
        show={show}
        setRead={setRead}
        setModified={setModified}
        setWrite={setWrite}
        handleClose={handleClose}
        roleId={roleId}
        read={read}
        write={write}
        modified={modified}
        websiteId={Number(router.query.id)}
      />
    </>
  );
}
