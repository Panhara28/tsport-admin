import React, { useState } from 'react';
import { Button, Card, Col, Nav, Row } from 'react-bootstrap';
import { Container } from 'reactstrap';
import Image from 'next/image';
import style from './overview.module.scss';
import dynamic from 'next/dynamic';
import { area, balanceData, country_selection, lineData } from '../../../../../../../src/libs/data';
import { MapChart } from '../../../../../../../src/components/ApexCharts/MapChart';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
const ReactApexChart: any = dynamic(() => import('react-apexcharts'), { ssr: false });

const OwlCarousel: any = dynamic(import('react-owl-carousel3'));

const options: any = {
  loop: true,
  dots: false,
  nav: false,
  smartSpeed: 700,
  margin: 20,
  autoplayHoverPause: true,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};

type Props = {
  options: any;
  selected: any[];
};

export default function Overview(Props: any) {
  const [state, setState]: any = useState({});

  return (
    <div className={style.main}>
      <div className={style.app_content}>
        <Row className="mt-2">
          <Col md={12} lg={12}>
            <Image src="/logo/moclogo.webp" width={376} height={120} alt="menu-icon" layout={'fixed'} />
          </Col>
        </Row>
        <Row>
          <Col md={12} xl={12}>
            <Card className={style.card}>
              <Card.Body className={style.top_nav}>
                <Card.Text>
                  <div className="d-flex">
                    <div className={style.menu_bar}>
                      <Image src="/icons/menu.png" width={27} height={27} alt="menu-icon" layout={'fixed'} />
                    </div>
                    <div>
                      <Button className={`${style.btn_filter} ${style.active}`}>Overview</Button>
                      <Button className={style.btn_filter}>By Country</Button>
                      <Button className={style.btn_filter}>By Product</Button>
                      <Button className={style.btn_filter}>By Trimester</Button>
                      <Button className={style.btn_filter}>By Semester</Button>
                      <Button className={style.btn_filter}>By Year</Button>
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12} xl={12}>
            <Card className={style.card}>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <Select options={Props.country_selection} placeholder="Select Country" value="" />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={3}>
                    <DatePicker
                      selected=""
                      className="form-control"
                      placeholderText="Start Date"
                      dateFormat="dd/mm/yyyy"
                    />
                  </Col>
                  <Col md={3}>
                    <DatePicker
                      selected=""
                      className="form-control"
                      placeholderText="End Date"
                      dateFormat="dd/mm/yyyy"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6} xl={6}>
            <Card className={style.card}>
              <Card.Body>
                <Card.Text>Graph Testing</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={6}>
            <Row>
              <Col md={6}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text font-small-3`}>Export</p>
                    <span className={style.txt_country__vol}>
                      Vol: <span>$1690M</span>
                    </span>
                    {/* <ReactApexChart options={area.options} series={area.series} /> */}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text font-small-3`}>Import</p>
                    <span className={style.txt_country__vol}>
                      Vol: <span>$1690M</span>
                    </span>
                    {/* <ReactApexChart options={balanceData.options} series={balanceData.series} /> */}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text font-small-3`}>Export</p>
                    <span className={style.txt_country__vol}>
                      Bal: <span>$1690M</span>
                    </span>
                    {/* <ReactApexChart options={area.options} series={area.series} /> */}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text font-small-3`}>Import</p>
                    <span className={style.txt_country__vol}>
                      Bal: <span>$1690M</span>
                    </span>
                    {/* <ReactApexChart options={balanceData.options} series={balanceData.series} /> */}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Card className={style.card}>
              <Card.Body>
                <p className={`${style.txt_p} card-text font-small-3`}>Export</p>
                <span className={style.txt_country__vol}>
                  Qty: <span>$1690M</span>
                </span>
                {/* <ReactApexChart options={area.options} series={area.series} /> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className={style.card}>
              <Card.Body>
                <p className={`${style.txt_p} card-text font-small-3`}>Import</p>
                <span className={style.txt_country__vol}>
                  Qty: <span>1690M</span>
                </span>
                {/* <ReactApexChart options={balanceData.options} series={balanceData.series} /> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className={style.card}>
              <Card.Body>
                <p className={`${style.txt_p} card-text font-small-3`}>Product Export</p>
                <span className={style.txt_country__vol}>
                  <span>169</span>
                </span>
                {/* <ReactApexChart options={balanceData.options} series={balanceData.series} /> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className={style.card}>
              <Card.Body>
                <p className={`${style.txt_p} card-text font-small-3`}>Product Import</p>
                <span className={style.txt_country__vol}>
                  <span>169</span>
                </span>
                {/* <ReactApexChart options={balanceData.options} series={balanceData.series} /> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Container></Container>
    </div>
  );
}
function setZoom(arg0: (prev: any) => any): void {
  throw new Error('Function not implemented.');
}
