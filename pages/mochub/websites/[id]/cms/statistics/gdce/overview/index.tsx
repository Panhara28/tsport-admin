import React, { useState } from 'react';
import { Button, Card, Col, Nav, Row } from 'react-bootstrap';
import { Container } from 'reactstrap';
import Image from 'next/image';
import style from './overview.module.scss';
import dynamic from 'next/dynamic';
import { area, balanceData, lineData } from '../../../../../../../../src/libs/data';
import { MapChart } from '../../../../../../../../src/components/ApexCharts/MapChart';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import GDCELoadingScreen from '../../../../../../../../src/Screens/websites/Cms/Statistics/GDCE/GDCELoadingScreen';

const QUERY = gql`
  query importExportTopTenCountryVolume {
    importExportTopTenCountryVolume {
      data {
        imports {
          country
          country_name
          volume
        }
        exports {
          country
          country_name
          volume
        }
      }
    }
  }
`;

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
      items: 3,
    },
  },
};
export default function Overview() {
  const [state, setState]: any = useState({});
  const router = useRouter();

  const { data, loading } = useQuery(QUERY);

  if (!data || loading) return <GDCELoadingScreen />;

  function valueFormat(num: any) {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
      return num;
    }
    let si = [
      { v: 1e3, s: 'K' },
      { v: 1e6, s: 'M' },
      { v: 1e9, s: 'B' },
      { v: 1e12, s: 'T' },
      { v: 1e15, s: 'P' },
      { v: 1e18, s: 'E' },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s;
  }

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
                      <Button className={`${style.btn_filter} ${style.active}`}>
                        <Link href={`/mochub/websites/${router?.query?.id}/cms/statistics/gdce/overview`}>
                          <a>Overview</a>
                        </Link>
                      </Button>
                      <Button className={style.btn_filter}>
                        <Link href={`/mochub/websites/${router?.query?.id}/cms/statistics/gdce/overview/country`}>
                          <a>By Country</a>
                        </Link>
                      </Button>
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
                    {data?.importExportTopTenCountryVolume?.data?.exports?.map((item: any, idx: number) => {
                      return (
                        <Card className={style.card_country} key={item?.country}>
                          <Card.Body>
                            <div>
                              <p className={style.txt_vol}>
                                Rank: <span>{idx + 1}</span>
                              </p>
                              <h3 className={style.country_name}>{item?.country_name}</h3>
                              <p className={style.txt_vol}>
                                Total: <span>{valueFormat(Number(item?.volume))}</span>
                              </p>
                            </div>
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </OwlCarousel>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={6}>
            <h4 className={style.txt_title}>Import</h4>
            <Card className={style.card}>
              <Card.Body>
                <div className="d-flex">
                  <OwlCarousel className="owl-carousel owl-theme" {...options}>
                    {data?.importExportTopTenCountryVolume?.data?.imports?.map((item: any, idx: number) => {
                      return (
                        <Card className={style.card_country} key={item?.country}>
                          <Card.Body>
                            <div>
                              <p className={`${style.country_rank}`}>
                                Rank: <span>{idx + 1}</span>
                              </p>
                              <h3 className={style.country_name}>{item?.country_name}</h3>
                              <p className={style.txt_vol}>
                                Total: <span>{valueFormat(Number(item?.volume))}</span>
                              </p>
                            </div>
                          </Card.Body>
                        </Card>
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
      <Container></Container>
    </div>
  );
}
function setZoom(arg0: (prev: any) => any): void {
  throw new Error('Function not implemented.');
}
