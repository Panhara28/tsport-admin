import { gql, useQuery } from '@apollo/client';
import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../../components/VerticalLayout';
import { Card } from 'react-bootstrap';
import { Table } from 'reactstrap';
import style from './report-form-screen.module.scss';
import { CardHeader } from 'reactstrap';
import { Button } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import Image from 'next/image';

const QUERY = gql`
  query importExportReport($filter: ImportExportFilter) {
    importExportReport(filter: $filter)
  }
`;

const ReportFormScreen = (props: any) => {
  const router = useRouter();

  const elRef = useRef<any>();

  const {
    timeframeType,
    year,
    second_year,
    month,
    second_month,
    trimesterType,
    semesterType,
    countries,
  }: any = router.query;

  const { loading, data } = useQuery(QUERY, {
    variables: {
      filter: {
        countries: countries?.split(','),
        timeframe: timeframeType,
        year: year,
        second_year: second_year,
        month: month,
        second_month: second_month,
        trimester: (Number(trimesterType) - 1).toString(),
        semester: (Number(semesterType) - 1).toString(),
      },
    },
  });

  if (!data || loading) return <>Loading</>;

  const percentChange = (first_price: string, last_price: string) => {
    const x1 = Number(first_price);
    const x2 = Number(last_price);

    if (x1 === 0 && x2 === 0) {
      return '0';
    }

    if (x1 === 0) {
      return '100';
    }

    const result = ((x1 - x2) / x1) * 100;

    return result.toFixed(2);
  };

  const renderSemester = (semester: number) => {
    if (!semester) {
      return undefined;
    }

    return 'Semester ' + semester + ', ';
  };

  const renderTrimester = (trimester: number) => {
    if (!trimester) {
      return undefined;
    }

    return 'Trimester ' + trimester + ', ';
  };

  function commafy(num: string) {
    var str = num.split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }

  const renderMonth = (month_start: string, month_end: string) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    if (!month_start || !month_end) {
      return undefined;
    }

    return months[Number(month_start) - 1] + '-' + months[Number(month_end) - 1] + ' ';
  };

  return (
    <Layout>
      <div className="page-content">
        <Card>
          <CardHeader>
            <ReactToPrint
              trigger={() => {
                return (
                  <Button className="btn-primary" style={{ float: 'right' }}>
                    Print
                  </Button>
                );
              }}
              content={() => elRef.current}
            />
          </CardHeader>
          <Card.Body ref={elRef} className={style.print_content}>
            <div className={style.stat_form_header}>
              <div className={style.stat_form_header_left}>
                <img src="/logo/moc-logo.png" style={{ height: 'auto', width: '120px', marginBottom: '20px' }} />
                <h4>MINISTRY OF COMMERCE</h4>
                <h5>GENERAL DEPARTMENT OF DOMESTIC TRADE</h5>
                <h6>DEPARTMENT OF PLANNING STATISTICS AND TRADE INFORMATION</h6>
              </div>

              <h4>KINGDOM OF CAMBODIA</h4>
              <h5>NATION RELIGION KING</h5>
              <Image src="/logo/tacteing-style.png" width="150px" height="15px" />

              <h4 style={{ marginTop: 180 }}>
                CAMBODIA&apos;S EXPORT AND IMPORT BY SELECTED COUNTRY (USD) FROM{' '}
                {data?.importExportReport[0]?.data?.year?.year} TO{' '}
                {data?.importExportReport[0]?.data?.second_year?.year}
              </h4>
            </div>
            <Table className={style.custom_table}>
              <thead>
                <tr>
                  <th rowSpan={2}>
                    <div>Country Name</div>
                  </th>
                  <th colSpan={4} className={style.year_label}>
                    {renderMonth(
                      data?.importExportReport[0]?.data?.year?.month_start,
                      data?.importExportReport[0]?.data?.year?.month_end,
                    )}
                    {renderSemester(data?.importExportReport[0]?.data?.year?.semester)}
                    {renderTrimester(data?.importExportReport[0]?.data?.year?.trimester)}
                    {data?.importExportReport[0]?.data?.year?.year}
                  </th>
                  <th colSpan={4} className={style.year_label}>
                    {renderMonth(
                      data?.importExportReport[0]?.data?.year?.month_start,
                      data?.importExportReport[0]?.data?.year?.month_end,
                    )}
                    {renderSemester(data?.importExportReport[0]?.data?.year?.semester)}
                    {renderTrimester(data?.importExportReport[0]?.data?.year?.trimester)}
                    {data?.importExportReport[0]?.data?.second_year?.year}
                  </th>
                  <th colSpan={3} className={style.percentage_change}>
                    % Change
                  </th>
                </tr>
                <tr>
                  <th className={style.import_export_label}>Import</th>
                  <th className={style.import_export_label}>Export</th>
                  <th className={style.balance_label}>Balance</th>
                  <th className={style.volume_label}>Volume</th>
                  <th className={style.import_export_label}>Import</th>
                  <th className={style.import_export_label}>Export</th>
                  <th className={style.balance_label}>Balance</th>
                  <th className={style.volume_label}>Volume</th>
                  <th className={style.percentage_change}>Import</th>
                  <th className={style.percentage_change}>Export</th>
                  <th className={style.percentage_change}>Volume</th>
                </tr>
              </thead>

              <tbody>
                {data?.importExportReport?.map((x: any) => {
                  return (
                    <tr>
                      <td>{x?.country_name}</td>
                      <td>{x?.data?.year?.imports ? commafy(x?.data?.year?.imports.toFixed(2)) : 0}</td>
                      <td>{x?.data?.year?.exports ? commafy(x?.data?.year?.exports.toFixed(2)) : 0}</td>
                      <td className={style.balance_value}>
                        {x?.data?.year?.balances ? commafy(x?.data?.year?.balances.toFixed(2)) : 0}
                      </td>
                      <td>{x?.data?.year?.volumes ? commafy(x?.data?.year?.volumes.toFixed(2)) : 0}</td>
                      <td>{x?.data?.second_year?.imports ? commafy(x?.data?.second_year?.imports.toFixed(2)) : 0}</td>
                      <td>{x?.data?.second_year?.exports ? commafy(x?.data?.second_year?.exports.toFixed(2)) : 0}</td>
                      <td className={style.balance_value}>
                        {x?.data?.second_year?.balances ? commafy(x?.data?.second_year?.balances.toFixed(2)) : 0}
                      </td>
                      <td>{x?.data?.second_year?.volumes ? commafy(x?.data?.second_year?.volumes.toFixed(2)) : 0}</td>
                      <td className={style.import_export_percentage}>
                        {percentChange(x?.data?.year?.imports, x?.data?.second_year?.imports)}%
                      </td>
                      <td className={style.import_export_percentage}>
                        {percentChange(x?.data?.year?.exports, x?.data?.second_year?.exports)}%
                      </td>
                      <td>{percentChange(x?.data?.year?.volumes, x?.data?.second_year?.volumes)}%</td>
                    </tr>
                  );
                })}
                <tr className={style.total_row}>
                  <td className={style.total_row_label}>Total:</td>
                  <td>
                    {commafy(
                      data?.importExportReport
                        ?.reduce((prev: any, cur: any) => {
                          return cur?.data?.year?.imports + prev;
                        }, 0)
                        .toFixed(2),
                    )}
                  </td>
                  <td>
                    {commafy(
                      data?.importExportReport
                        ?.reduce((prev: any, cur: any) => {
                          return cur?.data?.year?.exports + prev;
                        }, 0)
                        .toFixed(2),
                    )}
                  </td>
                  <td className={style.balance_value}>
                    {commafy(
                      data?.importExportReport
                        ?.reduce((prev: any, cur: any) => {
                          return cur?.data?.year?.balances + prev;
                        }, 0)
                        .toFixed(2),
                    )}
                  </td>
                  <td>
                    {commafy(
                      data?.importExportReport
                        ?.reduce((prev: any, cur: any) => {
                          return cur?.data?.year?.volumes + prev;
                        }, 0)
                        .toFixed(2),
                    )}
                  </td>
                  <td>
                    {commafy(
                      data?.importExportReport
                        ?.reduce((prev: any, cur: any) => {
                          return cur?.data?.second_year?.imports + prev;
                        }, 0)
                        .toFixed(2),
                    )}
                  </td>
                  <td>
                    {commafy(
                      data?.importExportReport
                        ?.reduce((prev: any, cur: any) => {
                          return cur?.data?.second_year?.exports + prev;
                        }, 0)
                        .toFixed(2),
                    )}
                  </td>
                  <td className={style.balance_value}>
                    {commafy(
                      data?.importExportReport
                        ?.reduce((prev: any, cur: any) => {
                          return cur?.data?.second_year?.balances + prev;
                        }, 0)
                        .toFixed(2),
                    )}
                  </td>
                  <td>
                    {commafy(
                      data?.importExportReport
                        ?.reduce((prev: any, cur: any) => {
                          return cur?.data?.second_year?.volumes + prev;
                        }, 0)
                        .toFixed(2),
                    )}
                  </td>
                  <td>
                    {percentChange(
                      data?.importExportReport?.reduce((prev: any, cur: any) => {
                        return cur?.data?.year?.imports + prev;
                      }, 0),
                      data?.importExportReport?.reduce((prev: any, cur: any) => {
                        return cur?.data?.second_year?.imports + prev;
                      }, 0),
                    )}
                    %
                  </td>
                  <td>
                    {percentChange(
                      data?.importExportReport?.reduce((prev: any, cur: any) => {
                        return cur?.data?.year?.exports + prev;
                      }, 0),
                      data?.importExportReport?.reduce((prev: any, cur: any) => {
                        return cur?.data?.second_year?.exports + prev;
                      }, 0),
                    )}
                    %
                  </td>
                  <td>
                    {percentChange(
                      data?.importExportReport?.reduce((prev: any, cur: any) => {
                        return cur?.data?.year?.volumes + prev;
                      }, 0),
                      data?.importExportReport?.reduce((prev: any, cur: any) => {
                        return cur?.data?.second_year?.volumes + prev;
                      }, 0),
                    )}
                    %
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default ReportFormScreen;
