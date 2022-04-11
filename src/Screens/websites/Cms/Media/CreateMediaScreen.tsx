import { Row } from 'reactstrap';
import { Card } from 'reactstrap';
import { Col } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../../../components/Common/Breadcrumb';
import Layout from '../../../../components/VerticalLayout';

export function CreateMediaScreen() {
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Upload new media" />
          <hr />
          <Row>
            <Col md={12}>
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
