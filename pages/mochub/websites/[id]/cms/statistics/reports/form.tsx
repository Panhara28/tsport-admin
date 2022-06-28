import { gql, useQuery } from '@apollo/client';
import React from 'react';

const QUERY = gql`
  query importExportReport($filter: ImportExportFilter) {
    importExportReport(filter: $filter)
  }
`;

export default function ReportForm(props: any) {
  const query = props.query;

  const { loading, data } = useQuery(QUERY, {
    variables: {
      filter: {
        countries: ['CN', 'BE'],
        timeframe: query?.timeframeType,
        year: query?.year,
        second_year: query?.secondYear,
        month: query?.month,
        second_month: query?.second_month,
        trimester: (Number(query?.trimesterType) - 1)?.toString(),
        semester: (Number(query?.semesterType) - 1)?.toString(),
      },
    },
  });

  if (!data || loading) return <>Loading</>;

  console.log(data);

  return <></>;
}

export async function getServerSideProps(context: any) {
  return { props: { query: context.query } };
}
