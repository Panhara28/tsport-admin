import { gql, useMutation, useQuery } from '@apollo/client';
import { faPlug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Layout } from '../../components/Layout';
import { Title } from '../../components/Title';
import style from './create-websites.module.scss';
import { WebsiteSettingSidebar } from './WebsiteSettingSidebar';

const QUERY = gql`
  query installedPluginList($websiteId: Int!) {
    installedPluginList(websiteId: $websiteId) {
      pluginId
      pluginName
    }
  }
`;

const MUTATION = gql`
  mutation uninstallPlugin($websiteId: Int!, $pluginId: Int!) {
    uninstallPlugin(websiteId: $websiteId, pluginId: $pluginId)
  }
`;

export function InstalledPluginWebsiteScreen() {
  const router = useRouter();
  const [uninstallPlugin] = useMutation(MUTATION, {
    refetchQueries: ['installedPluginList'],
  });
  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId: Number(router.query.id),
    },
  });
  if (loading) return <div>Loading...</div>;

  const onUninstallPlugin = (pluginId: number) => {
    uninstallPlugin({
      variables: {
        websiteId: Number(router.query.id),
        pluginId: Number(pluginId),
      },
    });
  };

  let renderPluginInstalled;
  if (data?.installedPluginList?.length > 0) {
    renderPluginInstalled = (
      <>
        {data.installedPluginList.map((item: any) => {
          return (
            <Col md={4} className="mb-3">
              <div className={style.mocPluginCard}>
                <div className={style.mocPluginCardHeader}>
                  <FontAwesomeIcon icon={faPlug} />
                </div>
                <div className={style.mocPluginCardTitle}>{item.pluginName}</div>
                <div className={style.mocPluginCardSubtitle}>
                  The User Experience Designer position exists to create compelling and digital user experience through
                  excellent design.
                </div>
                <div className={style.mocPluginCardButtons}>
                  <div
                    className={style.mocPluginCardButton + ' ' + style.mocPluginCardButtonUninstall}
                    onClick={() => onUninstallPlugin(item.pluginId)}
                  >
                    Uninstall
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </>
    );
  } else {
    renderPluginInstalled = <div>No plugin installed</div>;
  }
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
            <h6 className="mb-4">Installed plugins</h6>
            <Row>{renderPluginInstalled}</Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
