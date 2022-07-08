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
  const [startDate, setStartDate] = useState(new Date(2019, 1, 0));
  const [endDate, setEndDate] = useState(new Date(2022, 1, 0));
  const [countries, setCountries] = useState<any>({
    label: 'China',
    value: 'CN',
  });

  const { data, loading } = useQuery(QUERY, {
    variables: {
      filter: {
        from: moment(startDate).format('YYYY'),
        to: moment(endDate).format('YYYY'),
        country: countries?.value,
      },
    },
  });

  if (!data || loading) return <>Loading...</>;

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
                    <Select
                      options={countriesOptions}
                      placeholder="Select Country"
                      value={countries}
                      onChange={data => setCountries(data)}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={3}>
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
                  <Col md={3}>
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
          <Col md={6} xl={6}>
            <Card className={style.card}>
              <Card.Body>
                <p className={`${style.txt_p} card-text`}>Yearly Imports/Exports Volumes</p>

                <div className="d-flex mb-4">
                  <Button onClick={() => setChartType(1)}>
                    <FontAwesomeIcon icon={faChartLine} />
                  </Button>
                  <Button style={{ marginLeft: '10px' }} onClick={() => setChartType(2)}>
                    <FontAwesomeIcon icon={faChartBar} />
                  </Button>
                </div>
                {chartType === 1 && (
                  <ReactApexChart
                    options={
                      format_imports_exports(
                        data?.gdceByCountryReport?.importsEachYear,
                        data?.gdceByCountryReport?.exportsEachYear,
                      ).options
                    }
                    series={
                      format_imports_exports(
                        data?.gdceByCountryReport?.importsEachYear,
                        data?.gdceByCountryReport?.exportsEachYear,
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
                      ).options
                    }
                    series={
                      format_imports_exports_bar(
                        data?.gdceByCountryReport?.importsEachYear,
                        data?.gdceByCountryReport?.exportsEachYear,
                      ).series
                    }
                    type="bar"
                    height={450}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={6}>
            <Row className="mt-2">
              <Col md={6}>
                <p className={`${style.txt_p} card-text`}>Export</p>
              </Col>

              <Col md={6}>
                <p className={`${style.txt_p} card-text`}>Import</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text`}>Volume:</p>
                    <span className={style.txt_country__vol}>${data?.gdceByCountryReport?.exports_total}</span>
                    {/* <ReactApexChart options={area.options} series={area.series} /> */}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text`}>Volume:</p>
                    <span className={style.txt_country__vol}>${data?.gdceByCountryReport?.imports_total}</span>
                    {/* <ReactApexChart options={balanceData.options} series={balanceData.series} /> */}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text`}>Quantity:</p>
                    <span className={style.txt_country__vol}>{data?.gdceByCountryReport?.exports_total_qty}</span>
                    {/* <ReactApexChart options={area.options} series={area.series} /> */}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text`}>Quantity:</p>
                    <span className={style.txt_country__vol}>{data?.gdceByCountryReport?.imports_total_qty}</span>
                    {/* <ReactApexChart options={balanceData.options} series={balanceData.series} /> */}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text`}>Total Products:</p>
                    <span className={style.txt_country__vol}>{data?.gdceByCountryReport?.exportsList?.length}</span>
                    {/* <ReactApexChart options={area.options} series={area.series} /> */}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className={style.card}>
                  <Card.Body>
                    <p className={`${style.txt_p} card-text`}>Total Products:</p>
                    <span className={style.txt_country__vol}>{data?.gdceByCountryReport?.importsList?.length}</span>
                    {/* <ReactApexChart options={balanceData.options} series={balanceData.series} /> */}
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
