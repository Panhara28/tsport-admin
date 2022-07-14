import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';

export function CreateUserScreen() {
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb breadcrumbItem="Create user" title={setting.title} />
          <hr />
          <Row>
            <Col md={9}>
              <Card>
                <CardBody></CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
