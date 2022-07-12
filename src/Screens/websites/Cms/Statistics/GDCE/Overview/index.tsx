import React, { useState } from 'react';
import { Button, Card, Col, Nav, Row } from 'react-bootstrap';
import { Container } from 'reactstrap';
import Image from 'next/image';
import style from './overview.module.scss';
import dynamic from 'next/dynamic';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { Label } from 'reactstrap';
import moment from 'moment';
import { useQuery, gql } from '@apollo/client';
import { format_imports_exports } from './functions/format_imports_exports';
import { barData } from './data';
import { format_imports_exports_bar } from './functions/format_imports_exports_bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons';
import GDCELoadingScreen from '../GDCELoadingScreen';
import { useRouter } from 'next/router';
import Link from 'next/link';

const QUERY = gql`
  query gdceByCountryReport($filter: GDCEByCountryReportFilters) {
    gdceByCountryReport(filter: $filter) {
      imports_total
      exports_total
      imports_total_qty
      exports_total_qty
      volume_total
      balance_total
      importsEachYear {
        year
        value
      }
      exportsEachYear {
        year
        value
      }
      volumeEachYear {
        year
        volume
      }
      balanceEachYear {
        year
        balance
      }
      importsList {
        origin_country
        custom_value_usd
        hs_code
        quantity
      }
      exportsList {
        destination_country
        custom_value_usd
        hs_code
        quantity
      }
      country_name
      country_image
    }

    statCountriesList {
      data {
        id
        code
        country_name
        country_name_kh
      }
    }
  }
`;

const ReactApexChart: any = dynamic(() => import('react-apexcharts'), { ssr: false });

const OwlCarousel: any = dynamic(import('react-owl-carousel3'));

export default function GDCEOverview() {
  const [chartType, setChartType] = useState(1);
  const [filterData, setFilterData] = useState(3);
  const [startDate, setStartDate] = useState(new Date(2019, 1, 0));
  const [endDate, setEndDate] = useState(new Date(2022, 1, 0));
  const [countries, setCountries] = useState<any>({
    label: 'China',
    value: 'CN',
  });

  const router = useRouter();

  const { data, loading } = useQuery(QUERY, {
    variables: {
      filter: {
        from: moment(startDate).format('YYYY'),
        to: moment(endDate).format('YYYY'),
        country: countries?.value,
      },
    },
  });

  if (!data || loading) return <GDCELoadingScreen />;

  function commafy(num: string) {
    let str = num.split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }

  const countriesOptions = data.statCountriesList.data.map((x: any) => {
    return {
      label: x?.country_name,
      value: x?.code,
    };
  });

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
                      <Button className={`${style.btn_filter} `}>
                        <Link href={`/mochub/websites/${router?.query?.id}/cms/statistics/gdce/overview`}>
                          <a>Overview</a>
                        </Link>
                      </Button>
                      <Button className={`${style.btn_filter} ${style.active}`}>
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
          <Col md={12} xl={12}>
            <Card className={style.card}>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Label>Select Country</Label>
                    <Select
                      options={countriesOptions}
                      placeholder="Select Country"
                      value={countries}
                      onChange={data => setCountries(data)}
                    />
                  </Col>
                  <Col md={4}>
                    <Label>Start Date</Label>
                    <DatePicker
                      selected={startDate}
                      className="form-control"
                      placeholderText="Start Date"
                      showYearPicker
                      onChange={(date: Date) => setStartDate(date)}
                      dateFormat="yyyy"
                    />
                  </Col>
                  <Col md={4}>
                    <Label>End Date</Label>
                    <DatePicker
                      selected={endDate}
                      className="form-control"
                      placeholderText="End Date"
                      showYearPicker
                      dateFormat="yyyy"
                      onChange={(date: Date) => setEndDate(date)}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={7} xl={7}>
            <Card className={style.card}>
              <Card.Body>
                <p className={`${style.txt_p} card-text`}>Yearly Imports/Exports Volumes</p>

                <div className="d-flex mb-4">
                  <Button
                    className={`${style.chart_type_btn} ${chartType === 1 ? style.chart_type_btn_active : ''}`}
                    onClick={() => setChartType(1)}
                  >
                    <FontAwesomeIcon icon={faChartLine} />
                  </Button>
                  <Button
                    className={`${style.chart_type_btn} ${chartType === 2 ? style.chart_type_btn_active : ''}`}
                    style={{ marginLeft: '10px' }}
                    onClick={() => setChartType(2)}
                  >
                    <FontAwesomeIcon icon={faChartBar} />
                  </Button>
                </div>

                <div className="d-flex mb-4" style={{ justifyContent: 'flex-end' }}>
                  <Button className={`${style.chart_type_btn} `} onClick={() => setFilterData(0)}>
                    All
                  </Button>
                  <Button
                    className={`${style.chart_type_btn} `}
                    onClick={() => setFilterData(2)}
                    style={{ marginLeft: '10px' }}
                  >
                    Imports
                  </Button>
                  <Button
                    className={`${style.chart_type_btn} `}
                    style={{ marginLeft: '10px' }}
                    onClick={() => setFilterData(1)}
                  >
                    Exports
                  </Button>
                </div>
                {chartType === 1 && (
                  <ReactApexChart
                    options={
                      format_imports_exports(
                        data?.gdceByCountryReport?.importsEachYear,
                        data?.gdceByCountryReport?.exportsEachYear,
                        filterData,
                      ).options
                    }
                    series={
                      format_imports_exports(
                        data?.gdceByCountryReport?.importsEachYear,
                        data?.gdceByCountryReport?.exportsEachYear,
                        filterData,
                      ).series
                    }
                    type="line"
                  />
                )}

                {chartType === 2 && (
                  <ReactApexChart
                    options={
                      format_imports_exports_bar(
                        data?.gdceByCountryReport?.importsEachYear,
                        data?.gdceByCountryReport?.exportsEachYear,
                        filterData,
                      ).options
                    }
                    series={
                      format_imports_exports_bar(
                        data?.gdceByCountryReport?.importsEachYear,
                        data?.gdceByCountryReport?.exportsEachYear,
                        filterData,
                      ).series
                    }
                    type="bar"
                    height={450}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={5} xl={5}>
            <Row>
              <Col md={6}>
                <p className={`${style.txt_p} card-text`}>Overall</p>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Card className={style.card}>
                  <Card.Body className={style.card_content}>
                    <Row>
                      <Col md={9}>
                        <div>
                          <p className={`${style.txt_p} card-text`}>Balances</p>
                          <span className={style.txt_country__vol}>
                            $
                            {Number(data?.gdceByCountryReport?.balance_total) < 0
                              ? commafy((data?.gdceByCountryReport?.balance_total * -1).toString())
                              : commafy(data?.gdceByCountryReport?.balance_total?.toString())}
                          </span>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className={style.flag_content}>
                          <Image
                            src={
                              data?.gdceByCountryReport?.country_image
                                ? data?.gdceByCountryReport?.country_image
                                : '/images/flag-holder.png'
                            }
                            width={65}
                            height={65}
                            alt="menu-icon"
                            layout={'fixed'}
                            priority={true}
                            className={style.flag_image}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className={style.card}>
                  <Card.Body className={style.card_content}>
                    <Row>
                      <Col md={9}>
                        <div>
                          <p
                            className={`${style.txt_p} ca
                          <div>
                          </div>rd-text`}
                          >
                            Volumes
                          </p>
                          <span className={style.txt_country__vol}>
                            $
                            {Number(data?.gdceByCountryReport?.volume_total) < 0
                              ? commafy((data?.gdceByCountryReport?.volume_total * -1).toString())
                              : commafy(data?.gdceByCountryReport?.volume_total?.toString())}
                          </span>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className={style.flag_content}>
                          <Image
                            src={
                              data?.gdceByCountryReport?.country_image
                                ? data?.gdceByCountryReport?.country_image
                                : '/images/flag-holder.png'
                            }
                            width={65}
                            height={65}
                            alt="menu-icon"
                            layout={'fixed'}
                            priority={true}
                            className={style.flag_image}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <hr className="mt-3 mb-3" style={{ backgroundColor: '#fefefe', height: '3px', margin: '0px 15px' }} />
            </Row>

            <Row className="mt-2">
              <Col md={filterData === 1 ? 12 : filterData === 2 ? 0 : 6}>
                <p className={`${style.txt_p} card-text`} style={{ display: filterData === 2 ? 'none' : undefined }}>
                  Export
                </p>
              </Col>

              <Col md={filterData === 1 ? 0 : filterData === 2 ? 12 : 6}>
                <p className={`${style.txt_p} card-text`} style={{ display: filterData === 1 ? 'none' : undefined }}>
                  Import
                </p>
              </Col>
            </Row>
            <Row>
              <Col
                md={filterData === 1 ? 12 : filterData === 2 ? 0 : 6}
                style={{ display: filterData === 2 ? 'none' : undefined }}
              >
                <Card className={style.card}>
                  <Card.Body className={style.card_content}>
                    <Row>
                      <Col md={9}>
                        <div>
                          <p
                            className={`${style.txt_p} ca
                          <div>
                          </div>rd-text`}
                          >
                            Total Value
                          </p>
                          <span className={style.txt_country__vol}>
                            ${commafy(data?.gdceByCountryReport?.exports_total?.toString())}
                          </span>
                          {/* <ReactApexChart options={area.options} series={area.series} /> */}
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className={style.flag_content}>
                          <Image
                            src={
                              data?.gdceByCountryReport?.country_image
                                ? data?.gdceByCountryReport?.country_image
                                : '/images/flag-holder.png'
                            }
                            width={65}
                            height={65}
                            alt="menu-icon"
                            layout={'fixed'}
                            priority={true}
                            className={style.flag_image}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Card className={style.card}>
                  <Card.Body className={style.card_content}>
                    <Row>
                      <Col md={9}>
                        <div>
                          <p
                            className={`${style.txt_p} ca
                      <div>
                      </div>rd-text`}
                          >
                            Total Products
                          </p>
                          <span className={style.txt_country__vol}>
                            {data?.gdceByCountryReport?.exportsList?.length}
                          </span>
                          {/* <ReactApexChart options={area.options} series={area.series} /> */}
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className={style.flag_content}>
                          <Image
                            src={
                              data?.gdceByCountryReport?.country_image
                                ? data?.gdceByCountryReport?.country_image
                                : '/images/flag-holder.png'
                            }
                            width={65}
                            height={65}
                            alt="menu-icon"
                            layout={'fixed'}
                            priority={true}
                            className={style.flag_image}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col
                md={filterData === 1 ? 0 : filterData === 2 ? 12 : 6}
                style={{ display: filterData === 1 ? 'none' : undefined }}
              >
                <Card className={style.card}>
                  <Card.Body className={style.card_content}>
                    <Row>
                      <Col md={9}>
                        <div>
                          <p
                            className={`${style.txt_p} ca
                            <div>
                            </div>rd-text`}
                          >
                            Total Value
                          </p>
                          <span className={style.txt_country__vol}>
                            ${commafy(data?.gdceByCountryReport?.imports_total?.toString())}
                          </span>
                          {/* <ReactApexChart options={balanceData.options} series={balanceData.series} /> */}
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className={style.flag_content}>
                          <Image
                            src={
                              data?.gdceByCountryReport?.country_image
                                ? data?.gdceByCountryReport?.country_image
                                : '/images/flag-holder.png'
                            }
                            width={65}
                            height={65}
                            alt="menu-icon"
                            layout={'fixed'}
                            priority={true}
                            className={style.flag_image}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Card className={style.card}>
                  <Card.Body className={style.card_content}>
                    <Row>
                      <Col md={9}>
                        <div>
                          <p
                            className={`${style.txt_p} ca
                            <div></div>rd-text`}
                          >
                            Total Products
                          </p>
                          <span className={style.txt_country__vol}>
                            {data?.gdceByCountryReport?.importsList?.length}
                          </span>
                          {/* <ReactApexChart options={balanceData.options} series={balanceData.series} /> */}
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className={style.flag_content}>
                          <Image
                            src={
                              data?.gdceByCountryReport?.country_image
                                ? data?.gdceByCountryReport?.country_image
                                : '/images/flag-holder.png'
                            }
                            width={65}
                            height={65}
                            alt="menu-icon"
                            layout={'fixed'}
                            priority={true}
                            className={style.flag_image}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Container></Container>
    </div>
  );
}
