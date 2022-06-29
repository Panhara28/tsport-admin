import { Card, Col, Row } from 'react-bootstrap';
import OverviewScreen from '../../../../../../../src/Screens/websites/Cms/Statistics/Overview/OverviewScreen';
import style from './overview.module.scss';

export default function Overview() {
  return (
    <>
      <div className={style.app_content}>
        <Row>
          <Col md={6} xl={4}>
            <Card className={style.card}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={8}>
            <Card className={style.card}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={4}></Col>
        </Row>
      </div>
    </>
  );
}
