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
  query pluginList {
    pluginList {
      data {
        id
        name
      }
    }
  }
`;

const MUTATION = gql`
  mutation addPluginToWebsite($websiteId: Int!, $input: PluginInputId) {
    addPluginToWebsite(websiteId: $websiteId, input: $input)
  }
`;
export function InstallPluginWebsiteScreen() {
  const router = useRouter();
  const [addPluginToWebsite] = useMutation(MUTATION, {
    refetchQueries: ['installedPluginList'],
    onCompleted: data => {
      router.push(`/mochub/websites/${router.query.id}/installed`);
    },
    onError: error => {
      console.log(error.message);
    },
  });

  const { data, loading } = useQuery(QUERY);

  if (loading) return <div>Loading...</div>;

  const onAddPluginToWebsite = (pluginId: number) => {
    addPluginToWebsite({
      variables: {
        websiteId: Number(router.query.id),
        input: {
          pluginId,
        },
      },
    });
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
            <h6 className="mb-4">All plugins</h6>
            <Row>
              {data?.pluginList?.data?.map((item: any) => {
                return (
                  <Col md={4} className="mb-3">
                    <div className={style.mocPluginCard}>
                      <div className={style.mocPluginCardHeader}>
                        <FontAwesomeIcon icon={faPlug} />
                      </div>
                      <div className={style.mocPluginCardTitle}>{item.name}</div>
                      <div className={style.mocPluginCardSubtitle}>
                        The User Experience Designer position exists to create compelling and digital user experience
                        through excellent design.
                      </div>
                      <div className={style.mocPluginCardButtons}>
                        <div
                          className={style.mocPluginCardButton + ' ' + style.mocPluginCardButtonInstall}
                          onClick={() => onAddPluginToWebsite(item.id)}
                        >
                          Install Now
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
