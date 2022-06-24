import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useRouter } from 'next/router';

const QUERY = gql`
  query importExportReport($filter: ImportExportFilter) {
    importExportReport(filter: $filter)
  }
`;

export default function ReportForm(props: any) {
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
        trimester: trimesterType,
        semester: semesterType,
      },
    },
  });

  if (!data || loading) return <>Loading</>;

  return <></>;
}
