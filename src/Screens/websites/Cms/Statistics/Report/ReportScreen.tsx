import { gql, useLazyQuery } from '@apollo/client';
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

export const CREATE_EXPORTS = gql`
  mutation createExports($input: ExportsInput) {
    createExports(input: $input)
  }
`;

const LAZYQUERY = gql`
  query importExportReport($filter: ImportExportFilter) {
    importExportReport(filter: $filter)
  }
`;

export default function ReportScreen() {
  const { me } = useContext(AuthContext);
  const router = useRouter();
  const { pathname, query }: any = router;

  const [fetchReport, { called, loading, data }] = useLazyQuery(LAZYQUERY);

  const [timeframe, setTimeframe] = useState<any>(undefined);
  const [semesterType, setSemesterType] = useState<any>(undefined);
  const [trimesterType, setTrimesterType] = useState<any>(undefined);

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
    setTimeframe(filterTimeframe.filter((x: any) => query?.timeframeType === x?.value)[0]);
    setTrimesterType(trimesterTypeOptions.filter((x: any) => Number(query?.trimesterType) === x?.value)[0]);
    setSemesterType(semesterTypeOptions.filter((x: any) => Number(query?.semesterType) === x?.value)[0]);
  }, []);

  const removeUndefined: any = (o: any) => {
    return Object.entries(o)
      .filter(([, val]: any) => val !== undefined)
      .reduce((result: any, [key, val]: any) => {
        result[key] = val;
        return result;
      }, {});
  };

  const onChangeTimeframType = (type: any) => {
    router.push({
      pathname: pathname?.replace('[id]', query?.id),
      query: removeUndefined({
        ...query,
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

  const onChangeYear = (e: any) => {
    router.push({
      pathname: pathname?.replace('[id]', query?.id),
      query: removeUndefined({
        ...query,
        id: undefined,
        year: e?.target?.value ? e?.target?.value : undefined,
      }),
    });
  };

  const onHandleReport = (e: any) => {
    e.preventDefault();

    const x: any = e.target;

    fetchReport({
      variables: {
        filter: {
          countries: ['CN', 'BE'],
          timeframe: timeframe?.value,
          year: e?.target?.year?.value ? moment(e?.target?.year?.value).format('YYYY') : undefined,
          second_year: e?.target?.second_year?.value ? moment(e?.target?.second_year?.value).format('YYYY') : undefined,
          month: e?.target?.month?.value ? moment(e?.target?.month?.value).format('YYYY') : undefined,
          second_month: e?.target?.second_month?.value
            ? moment(e?.target?.second_month?.value).format('YYYY')
            : undefined,
          trimester: trimesterType?.value ? Number(trimesterType?.value) - 1 : undefined,
          semester: semesterType?.value ? Number(semesterType?.value) - 1 : undefined,
        },
      },
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
                        <label>Filter Type</label>
                        <Select options={filterTypeOptions} placeholder="Filter Type" />
                      </Col>

                      <Col md={3}>
                        <label>Filter Timeframe</label>
                        <Select
                          options={filterTimeframe}
                          placeholder="Filter Timeframe"
                          onChange={onChangeTimeframType}
                          value={timeframe}
                        />
                      </Col>

                      <Col md={3}>
                        <label>Select Year</label>
                        {/* <Select options={filterTimeframe} placeholder="Select Year" /> */}
                        <input type="date" className="form-control" name="year" onChange={onChangeYear} />
                      </Col>

                      {timeframe?.value === 'Year' && (
                        <Col md={3}>
                          <label>Select Second Year</label>
                          {/* <Select options={filterTimeframe} placeholder="Select Second Year" /> */}
                          <input type="date" className="form-control" name="second_year" />
                        </Col>
                      )}

                      {timeframe?.value === 'Month' && (
                        <Col md={3}>
                          <label>Select Month</label>
                          {/* <Select options={filterTimeframe} placeholder="Select Month" /> */}
                          <input type="date" className="form-control" name="month" />
                        </Col>
                      )}

                      {timeframe?.value === 'Month' && (
                        <Col md={3}>
                          <label>Select Second Month</label>
                          {/* <Select options={filterTimeframe} placeholder="Select Second Month" /> */}
                          <input type="date" className="form-control" name="second_month" />
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
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={10}></Col>

              <Col md={2}>
                <Card>
                  <CardHeader>Actions</CardHeader>

                  <CardBody>
                    <Row>
                      <Button type="submit">Report</Button>
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
