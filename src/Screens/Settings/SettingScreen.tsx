import Link from 'next/link';
import { CardBody } from 'reactstrap';
import { Col } from 'reactstrap';
import { Card } from 'reactstrap';
import { ListGroup } from 'react-bootstrap';
import { Container } from 'reactstrap';
import { Row } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';
import { SettingSideBar } from './SettingSideBar';

export function SettingScreen() {
  return (
    <Layout>
      <div className="page-content">
        <Breadcrumb breadcrumbItem="Settings" title={setting.title} />
        <hr />
        <Container fluid>
          <Row>
            <Col md={3}>
              <SettingSideBar />
            </Col>
            <Col md={9}>
              <Card>
                <CardBody>
                  <h5>Setting</h5>
                  <hr />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
