import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Title } from '../../components/Title';
import style from './create-websites.module.scss';
import Notiflix from 'notiflix';
import { RenderPluginAccessModal } from './RenderPluginAccessModal';
import Layout from '../../components/VerticalLayout';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { setting } from '../../libs/settings';

const QUERY = gql`
  query installedPluginList($websiteId: Int!) {
    installedPluginList(websiteId: $websiteId) {
      pluginId
      pluginName
    }
  }
`;

const MUTATION = gql`
  mutation installPluginToUser($websiteId: Int!, $pluginId: Int!, $userId: Int!) {
    installPluginToUser(websiteId: $websiteId, pluginId: $pluginId, userId: $userId)
  }
`;

export function PeoplePluginScreen() {
  const [show, setShow] = useState(false);
  const [pluginId, setPluginId] = useState<any>(undefined);
  const [read, setRead] = useState<boolean>(false);
  const [write, setWrite] = useState<boolean>(false);
  const [modified, setModified] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);

  const router = useRouter();
  const [installPluginToUser] = useMutation(MUTATION, {
    onCompleted: data => {
      if (data.installPluginToUser) {
        Notiflix.Notify.success('Plugin Installed');
      }
    },
    onError: error => {
      Notiflix.Notify.failure(error.message);
    },
  });

  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId: Number(router.query.id),
    },
  });
  if (loading || !data) return <div>Loading...</div>;

  const onAddPluginToUser = (pluginId: number) => {
    installPluginToUser({
      variables: {
        websiteId: Number(router.query.id),
        pluginId,
        userId: Number(router.query.peopleId),
      },
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = (pluginId: number) => {
    setShow(true);
    setPluginId(pluginId);
  };

  return (
    <>
      <Layout>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb title={setting.title} breadcrumbItem="News" />
            <hr />
            <Row>
              <Col md={8}>
                <Card>
                  <CardBody>
                    <Table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.installedPluginList?.map((plug: any) => {
                          return (
                            <tr>
                              <td>{plug.pluginId}</td>
                              <td>{plug.pluginName}</td>
                              <td>
                                <span
                                  onClick={() => onAddPluginToUser(plug.pluginId)}
                                  className={'mr-3 ' + style.mocPluginCardButtonInstall}
                                >
                                  Install
                                </span>
                                <span
                                  onClick={() => handleShow(plug.pluginId)}
                                  className={'mr-3 ' + style.mocPluginCardButtonWarning}
                                >
                                  Manage Access
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Layout>
      <RenderPluginAccessModal
        show={show}
        pluginId={pluginId}
        read={read}
        write={write}
        modified={modified}
        remove={remove}
        setRead={setRead}
        setWrite={setWrite}
        setModified={setModified}
        setRemove={setRemove}
        handleClose={handleClose}
        websiteId={Number(router.query.id)}
        userId={Number(router.query.peopleId)}
      />
    </>
  );
}
