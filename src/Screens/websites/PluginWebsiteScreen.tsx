import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Layout } from '../../components/Layout';
import { Title } from '../../components/Title';
import style from './create-websites.module.scss';
import { WebsiteSettingSidebar } from './WebsiteSettingSidebar';

export function PluginWebsiteScreen() {
  return (
    <Layout>
      <Container>
        <Row className="mt-4 mx-4">
          <Col>
            <Title title="Website setting" />
          </Col>
        </Row>
        <Row className="mx-4">
          <Col md={3} style={{ borderRight: '1px solid #ccc' }}>
            <WebsiteSettingSidebar />
          </Col>
          <Col md={9}></Col>
        </Row>
      </Container>
    </Layout>
  );
}
