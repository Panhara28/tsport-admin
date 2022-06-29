import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../../components/VerticalLayout';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Table } from 'reactstrap';
import style from './report-form-screen.module.scss';

const QUERY = gql`
  query importExportReport($filter: ImportExportFilter) {
    importExportReport(filter: $filter)
  }
`;

const ReportFormScreen = (props: any) => {
  const router = useRouter();

  const { timeframeType, year, second_year, month, second_month, trimesterType, semesterType } = router.query;

  const { loading, data } = useQuery(QUERY, {
    variables: {
      filter: {
        countries: ['CN', 'BE'],
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
          <CardBody>
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
                      <td>{x?.data?.year?.imports ? x?.data?.year?.imports.toFixed(2) : 0}</td>
                      <td>{x?.data?.year?.exports ? x?.data?.year?.exports.toFixed(2) : 0}</td>
                      <td className={style.balance_value}>
                        {x?.data?.year?.balances ? x?.data?.year?.balances.toFixed(2) : 0}
                      </td>
                      <td>{x?.data?.year?.volumes ? x?.data?.year?.volumes.toFixed(2) : 0}</td>
                      <td>{x?.data?.second_year?.imports ? x?.data?.second_year?.imports.toFixed(2) : 0}</td>
                      <td>{x?.data?.second_year?.exports ? x?.data?.second_year?.exports.toFixed(2) : 0}</td>
                      <td className={style.balance_value}>
                        {x?.data?.second_year?.balances ? x?.data?.second_year?.balances.toFixed(2) : 0}
                      </td>
                      <td>{x?.data?.second_year?.volumes ? x?.data?.second_year?.volumes.toFixed(2) : 0}</td>
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
                    {data?.importExportReport
                      ?.reduce((prev: any, cur: any) => {
                        return cur?.data?.year?.imports + prev;
                      }, 0)
                      .toFixed(2)}
                  </td>
                  <td>
                    {data?.importExportReport
                      ?.reduce((prev: any, cur: any) => {
                        return cur?.data?.year?.exports + prev;
                      }, 0)
                      .toFixed(2)}
                  </td>
                  <td className={style.balance_value}>
                    {data?.importExportReport
                      ?.reduce((prev: any, cur: any) => {
                        return cur?.data?.year?.balances + prev;
                      }, 0)
                      .toFixed(2)}
                  </td>
                  <td>
                    {data?.importExportReport
                      ?.reduce((prev: any, cur: any) => {
                        return cur?.data?.year?.volumes + prev;
                      }, 0)
                      .toFixed(2)}
                  </td>
                  <td>
                    {data?.importExportReport
                      ?.reduce((prev: any, cur: any) => {
                        return cur?.data?.second_year?.imports + prev;
                      }, 0)
                      .toFixed(2)}
                  </td>
                  <td>
                    {data?.importExportReport
                      ?.reduce((prev: any, cur: any) => {
                        return cur?.data?.second_year?.exports + prev;
                      }, 0)
                      .toFixed(2)}
                  </td>
                  <td className={style.balance_value}>
                    {data?.importExportReport
                      ?.reduce((prev: any, cur: any) => {
                        return cur?.data?.second_year?.balances + prev;
                      }, 0)
                      .toFixed(2)}
                  </td>
                  <td>
                    {data?.importExportReport
                      ?.reduce((prev: any, cur: any) => {
                        return cur?.data?.second_year?.volumes + prev;
                      }, 0)
                      .toFixed(2)}
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
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default ReportFormScreen;
