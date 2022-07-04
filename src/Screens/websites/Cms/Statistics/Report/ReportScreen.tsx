import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../../../../components/VerticalLayout';
import { Breadcrumb } from '../../../../../components/Common/Breadcrumb';
import { Card, CardBody, CardTitle } from 'reactstrap';
import AuthContext from '../../../../../components/Authentication/AuthContext';
import Select from 'react-select';
import { CardHeader } from 'reactstrap';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export const CREATE_EXPORTS = gql`
  mutation createExports($input: ExportsInput) {
    createExports(input: $input)
  }
`;

const QUERY = gql`
  query statCountriesList {
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

export default function ReportScreen() {
  const { me } = useContext(AuthContext);
  const router = useRouter();
  const { pathname, query }: any = router;

  const [filterType, setFilterType] = useState<any>(undefined);
  const [timeframe, setTimeframe] = useState<any>(undefined);
  const [semesterType, setSemesterType] = useState<any>(undefined);
  const [trimesterType, setTrimesterType] = useState<any>(undefined);

  const [countries, setCountries] = useState<any>(undefined);

  const [year, setYear] = useState<any>(undefined);
  const [secondYear, setSecondYear] = useState<any>(undefined);
  const [month, setMonth] = useState<any>(undefined);
  const [secondMonth, setSecondMonth] = useState<any>(undefined);

  const { data, loading } = useQuery(QUERY);

  const filterTypeOptions = [
    {
      label: 'Country',
      value: 'Country',
    },
    {
      label: 'Compare',
      value: 'Compare',
    },
  ];

  const filterTimeframe = [
    {
      label: 'Year',
      value: 'Year',
    },
    {
      label: 'Semester',
      value: 'Semester',
    },
    {
      label: 'Trimester',
      value: 'Trimester',
    },
    {
      label: 'Month',
      value: 'Month',
    },
  ];

  const semesterTypeOptions = [
    {
      label: 'Semester 1',
      value: 1,
    },
    {
      label: 'Semester 2',
      value: 2,
    },
  ];

  const trimesterTypeOptions = [
    {
      label: 'Trimester 1',
      value: 1,
    },
    {
      label: 'Trimester 2',
      value: 2,
    },
    {
      label: 'Trimester 3',
      value: 3,
    },
    {
      label: 'Trimester 4',
      value: 4,
    },
  ];

  if (!data || loading) return <>Loading</>;

  const countriesOptions = data.statCountriesList.data.map((x: any) => {
    return {
      label: x?.country_name,
      value: x?.code,
    };
  });

  const removeUndefined: any = (o: any) => {
    return Object.entries(o)
      .filter(([, val]: any) => val !== undefined)
      .reduce((result: any, [key, val]: any) => {
        result[key] = val;
        return result;
      }, {});
  };

  const onChangeFilterType = (type: any) => {
    setFilterType(type);
  };

  const onChangeTimeframType = (type: any) => {
    if (type?.value !== timeframe?.value) {
      setSecondYear(undefined);
      setMonth(undefined);
      setSecondMonth(undefined);
      setTrimesterType(undefined);
      setSemesterType(undefined);
    }

    setTimeframe(type);
  };

  const onChangeSemesterType = (type: any) => {
    setSemesterType(type);
  };
  const onChangeTrimesterType = (type: any) => {
    setTrimesterType(type);
  };

  const onChangeYear = (date: any) => {
    setYear(date);
  };

  const onChangeSecondYear = (date: any) => {
    setSecondYear(date);
  };

  const onChangeMonth = (date: any) => {
    setMonth(date);
  };

  const onChangeSecondMonth = (date: any) => {
    setSecondMonth(date);
  };

  const onChangeCountries = (data: any) => {
    if (data?.find((x: any) => x.value === 'all')) {
      console.log(data);
      setCountries(countriesOptions);
    } else {
      setCountries(data);
    }
  };

  const onHandleClearFilter = (e: any) => {
    e.preventDefault();

    router.push({
      pathname: pathname?.replace('[id]', query?.id),
      query: removeUndefined({
        id: undefined,
      }),
    });
  };

  const onHandleReport = (e: any) => {
    let filterCountries = countries?.map((x: any) => {
      return x?.value;
    });

    e.preventDefault();
    router.push({
      pathname: (pathname + '/form')?.replace('[id]', query?.id),
      query: removeUndefined({
        year: year ? moment(year).format('YYYY') : undefined,
        second_year: secondYear ? moment(secondYear).format('YYYY') : undefined,
        month: month ? moment(month).format('MM') : undefined,
        second_month: secondMonth ? moment(secondMonth).format('MM') : undefined,
        timeframeType: timeframe?.value ? timeframe?.value : undefined,
        trimesterType: trimesterType?.value ? trimesterType?.value : undefined,
        semesterType: semesterType?.value ? semesterType?.value : undefined,
        countries: filterCountries?.length > 0 ? filterCountries?.join(',') : undefined,
      }),
    });
  };

  let renderReport;

  if (countries?.length > 0 && filterType?.value && timeframe?.value && year) {
    if (timeframe?.value === 'Year' && secondYear) {
      renderReport = (
        <>
          <hr style={{ backgroundColor: '#959494', marginBottom: '0px' }} />

          <Row>
            <Col md={3} style={{ marginLeft: 'auto', marginTop: '10px', display: 'flex' }}>
              <Button
                className="btn-danger"
                style={{ width: '100%', marginRight: '20px' }}
                onClick={onHandleClearFilter}
              >
                Clear Filter
              </Button>
              <Button type="submit" style={{ width: '100%' }}>
                Report
              </Button>
            </Col>
          </Row>
        </>
      );
    }

    if (timeframe?.value === 'Month' && month & secondMonth) {
      renderReport = (
        <>
          <hr style={{ backgroundColor: '#959494', marginBottom: '0px' }} />
          <Row>
            <Col md={3} style={{ marginLeft: 'auto', marginTop: '10px', display: 'flex' }}>
              <Button
                className="btn-danger"
                style={{ width: '100%', marginRight: '20px' }}
                onClick={onHandleClearFilter}
              >
                Clear Filter
              </Button>
              <Button type="submit" style={{ width: '100%' }}>
                Report
              </Button>
            </Col>
          </Row>
        </>
      );
    }

    if (timeframe?.value === 'Trimester' && trimesterType?.value) {
      renderReport = (
        <>
          <hr style={{ backgroundColor: '#959494', marginBottom: '0px' }} />
          <Row>
            <Col md={3} style={{ marginLeft: 'auto', marginTop: '10px', display: 'flex' }}>
              <Button
                className="btn-danger"
                style={{ width: '100%', marginRight: '20px' }}
                onClick={onHandleClearFilter}
              >
                Clear Filter
              </Button>
              <Button type="submit" style={{ width: '100%' }}>
                Report
              </Button>
            </Col>
          </Row>
        </>
      );
    }

    if (timeframe?.value === 'Semester' && semesterType?.value) {
      renderReport = (
        <>
          <hr style={{ backgroundColor: '#959494', marginBottom: '0px' }} />
          <Row>
            <Col md={3} style={{ marginLeft: 'auto', marginTop: '10px', display: 'flex' }}>
              <Button
                className="btn-danger"
                style={{ width: '100%', marginRight: '20px' }}
                onClick={onHandleClearFilter}
              >
                Clear Filter
              </Button>
              <Button type="submit" style={{ width: '100%' }}>
                Report
              </Button>
            </Col>
          </Row>
        </>
      );
    }
  }

  return (
    <Layout>
      <Form onSubmit={onHandleReport}>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Statistic Reports" />
            <hr />
            <Row>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={12}>
                        <label>Select Countries</label>
                        <Select
                          onChange={onChangeCountries}
                          isMulti
                          options={[{ label: '★ Select All', value: 'all' }, ...countriesOptions]}
                          className="basic-multi-select"
                          value={countries}
                          classNamePrefix="select"
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    {/* <CardTitle className="h4 mb-4"> Reports</CardTitle> */}
                    <Row style={{ rowGap: 20 }}>
                      <Col md={3}>
                        <label>Filter by Type</label>
                        <Select
                          options={filterTypeOptions}
                          isClearable={true}
                          // placeholder="Filter Type"
                          onChange={onChangeFilterType}
                          value={filterType}
                        />
                      </Col>

                      <Col md={3}>
                        <label>Filter by Timeframe</label>
                        <Select
                          options={filterTimeframe}
                          isClearable={true}
                          // placeholder="Filter Timeframe"
                          onChange={onChangeTimeframType}
                          value={timeframe}
                        />
                      </Col>

                      <Col md={3}>
                        <label>Started Year</label>
                        <DatePicker
                          selected={year}
                          onChange={onChangeYear}
                          showYearPicker
                          className="form-control"
                          dateFormat="yyyy"
                        />
                      </Col>

                      {timeframe?.value === 'Year' && (
                        <Col md={3}>
                          <label>Ended Year</label>
                          <DatePicker
                            selected={secondYear}
                            onChange={onChangeSecondYear}
                            showYearPicker
                            className="form-control"
                            dateFormat="yyyy"
                          />
                        </Col>
                      )}

                      {timeframe?.value === 'Month' && (
                        <Col md={3}>
                          <label>Started Month</label>
                          <DatePicker
                            selected={month}
                            onChange={onChangeMonth}
                            dateFormat="MM"
                            showMonthYearPicker
                            className="form-control"
                          />
                        </Col>
                      )}

                      {timeframe?.value === 'Month' && (
                        <Col md={3}>
                          <label>Ended Month</label>
                          <DatePicker
                            selected={secondMonth}
                            onChange={onChangeSecondMonth}
                            dateFormat="MM"
                            showMonthYearPicker
                            className="form-control"
                          />
                        </Col>
                      )}

                      {timeframe?.value === 'Semester' && (
                        <Col md={3}>
                          <label>Select Semester</label>
                          <Select
                            options={semesterTypeOptions}
                            placeholder=""
                            onChange={onChangeSemesterType}
                            value={semesterType}
                          />
                        </Col>
                      )}

                      {timeframe?.value === 'Trimester' && (
                        <Col md={3}>
                          <label>Select Trimester</label>
                          <Select
                            options={trimesterTypeOptions}
                            placeholder=""
                            onChange={onChangeTrimesterType}
                            value={trimesterType}
                          />
                        </Col>
                      )}
                    </Row>

                    {renderReport}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Form>
    </Layout>
  );
}
