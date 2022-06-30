import React, { useState } from 'react';
import { Button, Card, Col, Nav, Row } from 'react-bootstrap';
import { Container } from 'reactstrap';
import Image from 'next/image';
import style from './overview.module.scss';
import ReactApexChart from 'react-apexcharts';

export default function Overview() {
  const [state, setState] = useState({
    series: [
      {
        name: 'Desktops',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
    },
  });

  return (
    <div className={style.main}>
      <Container fluid>
        <div className={style.app_content}>
          <Row>
            <Col md={12} xl={12}>
              <Card className={style.card}>
                <Card.Body>
                  <Card.Text>Nav</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} xl={4}>
              <Card className={style.card}>
                <Card.Body>
                  <h5>Congratulations 🎉 John!</h5>
                  <p className={`${style.txt_p} card-text font-small-3`}> You have won gold medal </p>
                  <h3 className={`${style.txt_price} mb-75 mt-2 pt-50`}>
                    <a href="#">$99.99k</a>
                  </h3>
                  <Button className={style.btn_view}> View Sales </Button>
                  <img
                    className={style.image_p1}
                    src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-4/img/badge.0fa134b5.svg"
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} xl={8}>
              <Card className={style.card}>
                <Card.Body>
                  <Card.Text>
                    <h5>Statistics</h5>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <Row>
                <Col md={3} lg={6}>
                  <Card className={style.card}>
                    <Card.Body>
                      <Card.Text>
                        <h5>Orders</h5>
                        <h3 className="font-weight-bolder mb-1">2.76k</h3>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} lg={6}>
                  <Card className={style.card}>
                    <Card.Body>
                      <Card.Text>
                        <h5>Profit</h5>
                        <h3 className="font-weight-bolder mb-1">6,92k</h3>
                        {/* <ReactApexChart options={state.options} series={state.series} type="line" height={350} /> */}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={12}>
                  <Card className={style.card}>
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>Some quick example text to build on the card title and make up the bulk</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col lg={8}>
              <Card className={style.card}>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>Some quick example text to build on the card title and make up the bulk</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
