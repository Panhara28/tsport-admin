import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import Layout from '../../components/VerticalLayout';
import style from './create-websites.module.scss';
import { WebsiteSettingSidebar } from './WebsiteSettingSidebar';

export function PluginWebsiteScreen() {
  return (
    <Layout>
      <Container>
        <Row>
          <Col md={3} style={{ borderRight: '1px solid #ccc' }}>
            <WebsiteSettingSidebar />
          </Col>
          <Col md={9}></Col>
        </Row>
      </Container>
    </Layout>
  );
}
