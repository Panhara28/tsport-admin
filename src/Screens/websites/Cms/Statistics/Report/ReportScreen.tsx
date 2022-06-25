import { gql, useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Button, Col, Container, Row } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import Layout from '../../../../../components/VerticalLayout';
import { Breadcrumb } from '../../../../../components/Common/Breadcrumb';
import { Card, CardBody, CardTitle } from 'reactstrap';
import AuthContext from '../../../../../components/Authentication/AuthContext';
import Select from 'react-select';
import { CardHeader } from 'reactstrap';

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

  const [fetchReport, { called, loading, data }] = useLazyQuery(LAZYQUERY);

  const [timeframe, setTimeframe] = useState<any>(undefined);

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

  const onHandleReport = (e: any) => {
    e.preventDefault();

    fetchReport({
      variables: {
        filter: {
          countries: ['CN', 'BE'],
          timeframe: timeframe?.value,
          year: '2021',
          second_year: '2022',
          month: '1',
          second_month: '12',
          trimester: '3',
          semester: '1',
        },
      },
    });
  };

  console.log(data);

  return (
    <Layout>
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
                        onChange={e => setTimeframe(e)}
                        value={timeframe}
                      />
                    </Col>

                    <Col md={3}>
                      <label>Select Year</label>
                      <Select options={filterTimeframe} placeholder="Select Year" />
                    </Col>

                    {timeframe?.value === 'Year' && (
                      <Col md={3}>
                        <label>Select Second Year</label>
                        <Select options={filterTimeframe} placeholder="Select Second Year" />
                      </Col>
                    )}

                    {timeframe?.value === 'Month' && (
                      <Col md={3}>
                        <label>Select Month</label>
                        <Select options={filterTimeframe} placeholder="Select Month" />
                      </Col>
                    )}

                    {timeframe?.value === 'Month' && (
                      <Col md={3}>
                        <label>Select Second Month</label>
                        <Select options={filterTimeframe} placeholder="Select Second Month" />
                      </Col>
                    )}

                    {timeframe?.value === 'Semester' && (
                      <Col md={3}>
                        <label>Select Semester</label>
                        <Select options={filterTimeframe} placeholder="Select Semester" />
                      </Col>
                    )}

                    {timeframe?.value === 'Trimester' && (
                      <Col md={3}>
                        <label>Select Trimester</label>
                        <Select options={filterTimeframe} placeholder="Select Trimester" />
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
                    <Button onClick={(e: any) => onHandleReport(e)}>Report</Button>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
