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

  const [year, setYear] = useState(new Date());
  const [secondYear, setSecondYear] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [secondMonth, setSecondMonth] = useState(new Date());

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

  useEffect(() => {
    query?.filterType && setFilterType(filterTypeOptions.filter((x: any) => query.filterType === x?.value)[0]);
    query?.timeframeType && setTimeframe(filterTimeframe.filter((x: any) => query?.timeframeType === x?.value)[0]);
    query?.trimesterType &&
      setTrimesterType(trimesterTypeOptions.filter((x: any) => Number(query?.trimesterType) === x?.value)[0]);
    query?.semesterType &&
      setSemesterType(semesterTypeOptions.filter((x: any) => Number(query?.semesterType) === x?.value)[0]);
    query?.year && setYear(new Date(Number(query?.year), 1, 1));
    query?.second_year && setSecondYear(new Date(Number(query?.second_year), 1, 1));
    query?.month && setMonth(new Date(Number(query?.year) ? Number(query?.year) : 0, Number(query?.month), 0));
    query?.second_month &&
      setSecondMonth(new Date(Number(query?.year) ? Number(query?.year) : 0, Number(query?.second_month), 0));

    if (query?.countries) {
      const country = query?.countries?.split(',');

      setCountries(country);
    }
  }, []);

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
    router.push({
      pathname: pathname?.replace('[id]', query?.id),
      query: removeUndefined({
        ...query,
        id: undefined,
        filterType: type?.value ? type?.value : undefined,
      }),
    });
  };

  const onChangeTimeframType = (type: any) => {
    router.push({
      pathname: pathname?.replace('[id]', query?.id),
      query: removeUndefined({
        filterType: query?.filterType,
        id: undefined,
        timeframeType: type?.value ? type?.value : undefined,
      }),
    });
  };

  const onChangeSemesterType = (type: any) => {
    router.push({
      pathname: pathname?.replace('[id]', query?.id),
      query: removeUndefined({
        ...query,
        id: undefined,
        semesterType: type?.value ? type?.value : undefined,
      }),
    });
  };
  const onChangeTrimesterType = (type: any) => {
    router.push({
      pathname: pathname?.replace('[id]', query?.id),
      query: removeUndefined({
        ...query,
        id: undefined,
        trimesterType: type?.value ? type?.value : undefined,
      }),
    });
  };

  const onChangeYear = (date: any) => {
    router.push({
      pathname: pathname?.replace('[id]', query?.id),
      query: removeUndefined({
        ...query,
        id: undefined,
        year: date ? moment(date).format('YYYY') : undefined,
      }),
    });
  };

  const onChangeSecondYear = (date: any) => {
    router.push({
      pathname: pathname?.replace('[id]', query?.id),
      query: removeUndefined({
        ...query,
        id: undefined,
        second_year: date ? moment(date).format('YYYY') : undefined,
      }),
    });
  };

  const onChangeMonth = (date: any) => {
    router.push({
      pathname: pathname?.replace('[id]', query?.id),
      query: removeUndefined({
        ...query,
        id: undefined,
        month: date ? moment(date).format('MM') : undefined,
      }),
    });
  };

  const onChangeSecondMonth = (date: any) => {
    router.push({
      pathname: pathname?.replace('[id]', query?.id),
      query: removeUndefined({
        ...query,
        id: undefined,
        second_month: date ? moment(date).format('MM') : undefined,
      }),
    });
  };

  const onChangeCountries = (data: any) => {
    const input = data.map((x: any) => {
      return x.value;
    });

    router.push({
      pathname: pathname?.replace('[id]', query?.id),
      query: removeUndefined({
        ...query,
        id: undefined,
        countries: input,
      }),
    });
  };

  const onHandleReport = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: (pathname + '/form')?.replace('[id]', query?.id),
      query: removeUndefined({
        ...query,
        id: undefined,
      }),
    });
  };

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
                    {/* <CardTitle className="h4 mb-4"> Reports</CardTitle> */}
                    <Row style={{ rowGap: 20 }}>
                      <Col md={3}>
                        <label>Filter by Type</label>
                        <Select
                          options={filterTypeOptions}
                          placeholder="Filter Type"
                          onChange={onChangeFilterType}
                          value={filterType}
                        />
                      </Col>

                      <Col md={3}>
                        <label>Select Countries</label>
                        <Select
                          onChange={onChangeCountries}
                          isMulti
                          name="colors"
                          options={countriesOptions}
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                      </Col>

                      <Col md={3}>
                        <label>Filter by Timeframe</label>
                        <Select
                          options={filterTimeframe}
                          placeholder="Filter Timeframe"
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
                            placeholder="Select Semester"
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
                            placeholder="Select Trimester"
                            onChange={onChangeTrimesterType}
                            value={trimesterType}
                          />
                        </Col>
                      )}
                    </Row>

                    <Row>
                      <Col md={2} style={{ marginLeft: 'auto', marginTop: '10px' }}>
                        <Button type="submit" style={{ width: '100%' }}>
                          Report
                        </Button>
                      </Col>
                    </Row>
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
