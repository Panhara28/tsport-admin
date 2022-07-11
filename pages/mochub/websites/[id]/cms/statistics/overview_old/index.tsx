import React, { useState } from 'react';
import { Button, Card, Col, Nav, Row } from 'react-bootstrap';
import { Container } from 'reactstrap';
import Image from 'next/image';
import style from './overview.module.scss';
import dynamic from 'next/dynamic';
import { area, balanceData, lineData } from '../../../../../../../src/libs/data';
import { MapChart } from '../../../../../../../src/components/ApexCharts/MapChart';
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

const automationServices = [
  {
    title: "Cambodia",
    link: "https://www.businessregistration.moc.gov.kh",
    image: "cambodia.png",
    vol: "300k",
  },
  {
    title: "Thailand",
    link: "https://www.businessregistration.moc.gov.kh",
    image: "Thai.png",
    vol: "300k",
  },
  {
    title: "China",
    link: "https://www.businessregistration.moc.gov.kh",
    image: "china.png",
    vol: "300k",
  },
  {
    title: "Laos",
    link: "https://www.businessregistration.moc.gov.kh",
    image: "laos.png",
    vol: "600k",
  },
  {
    title: "United State",
    link: "https://www.businessregistration.moc.gov.kh",
    image: "united-states.png",
    vol: "30M",
  },
  {
    title: "Brunei",
    link: "https://www.businessregistration.moc.gov.kh",
    image: "brunei-darussalam.png",
    vol: "254k",
  },
  {
    title: "Cambodia",
    link: "https://www.businessregistration.moc.gov.kh",
    image: "cambodia.png",
    vol: "300k",
  },
  {
    title: "Thailand",
    link: "https://www.businessregistration.moc.gov.kh",
    image: "Thai.png",
    vol: "300k",
  },
  {
    title: "China",
    link: "https://www.businessregistration.moc.gov.kh",
    image: "china.png",
    vol: "300k",
  },
  {
    title: "Laos",
    link: "https://www.businessregistration.moc.gov.kh",
    image: "laos.png",
    vol: "600k",
  },
  {
    title: "United State",
    link: "https://www.businessregistration.moc.gov.kh",
    image: "united-states.png",
    vol: "30M",
  },
  {
    title: "Brunei",
    link: "https://www.businessregistration.moc.gov.kh",
    image: "brunei-darussalam.png",
    vol: "254k",
  },
];

type Props = {
  title?: string;
  link?: string;
  image?: string;
  vol?: string;
};

function AutomationItem({ title, image, link, vol }: Props) {
  return (
    <a rel="noreferrer" href={link} target="_blank">
      <Card className={style.card_country}>
        <Card.Body>
          <div>
            <Image
              src={`/images/${image}`}
              width={50}
              height={50}
              alt="flag"
            />
            <h3 className={style.country_name}>{title}</h3>
            <span className={style.txt_vol}>
              Vol: <span>{vol}</span>
            </span>
          </div>
        </Card.Body>
      </Card>
    </a>
  );
}

export default function Overview() {
  const [state, setState]: any = useState({});

  return (
    <div className={style.main}>
      <div className={style.app_content}>
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
          <Col md={6} xl={6}> 
            <h4 className={style.txt_title}>Export</h4>
            <Card className={style.card}>
              <Card.Body>
                <div className="d-flex">
                  <OwlCarousel className="owl-carousel owl-theme" {...options}>
                  {automationServices.map((item: any, key: number) => {
                    return (
                      <AutomationItem
                        key={key}
                        title={item.title}
                        link={item.link}
                        image={item.image}
                        vol={item.vol}
                      />
                    );
                  })}
                  </OwlCarousel>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} xl={6}> 
            <h4 className={style.txt_title}>Export</h4>
            <Card className={style.card}>
              <Card.Body>
                <div className="d-flex">
                  <OwlCarousel className="owl-carousel owl-theme" {...options}>
                  {automationServices.map((item: any, key: number) => {
                    return (
                      <AutomationItem
                        key={key}
                        title={item.title}
                        link={item.link}
                        image={item.image}
                        vol={item.vol}
                      />
                    );
                  })}
                  </OwlCarousel>
                </div>
              </Card.Body>
            </Card>
          </Col>          
        </Row>

        <Row>
          <Col md={6} xl={6}>
            <Row>
              <Col md={4}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text font-small-3`}>Export VPY</p>
                    <span className={style.txt_country__vol}>
                      Vol: <span>1690M</span>
                    </span>
                    <ReactApexChart options={lineData.options} series={lineData.series} />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text font-small-3`}>Import VPY</p>
                    <span className={style.txt_country__vol}>
                      Vol: <span>1690M</span>
                    </span>
                    <ReactApexChart options={area.options} series={area.series} />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text font-small-3`}>Balance VPY</p>
                    <span className={style.txt_country__vol}>
                      Vol: <span>1690M</span>
                    </span>
                    <ReactApexChart options={balanceData.options} series={balanceData.series} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text font-small-3`}>Export VPY</p>
                    <span className={style.txt_country__vol}>
                      Vol: <span>1690M</span>
                    </span>
                    <ReactApexChart options={lineData.options} series={lineData.series} />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text font-small-3`}>Import VPY</p>
                    <span className={style.txt_country__vol}>
                      Vol: <span>1690M</span>
                    </span>
                    <ReactApexChart options={area.options} series={area.series} />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text font-small-3`}>Balance VPY</p>
                    <span className={style.txt_country__vol}>
                      Vol: <span>1690M</span>
                    </span>
                    <ReactApexChart options={balanceData.options} series={balanceData.series} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col md={6} xl={6}>
            <Card className={style.card}>
              <Card.Body>
                <Card.Text>
                  <p className={`${style.txt_p} card-text font-small-3`}>Total Import volumn</p>
                  <span className={style.txt_country__vol}>By Country</span>
                  <div className={style.content_btn__zoom}>
                    <Button className={style.btn_zoom} onClick={() => setZoom(prev => prev + 0.1)}>
                      +
                    </Button>
                    <Button className={style.btn_zoom} onClick={() => setZoom(prev => prev - 0.1)}>
                      -
                    </Button>
                  </div>
                  <div className={style.map_chart}>
                    <MapChart />
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
function setZoom(arg0: (prev: any) => any): void {
  throw new Error('Function not implemented.');
}
