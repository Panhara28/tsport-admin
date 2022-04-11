import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { WebsiteSettingSidebar } from './WebsiteSettingSidebar';
import style from './create-websites.module.scss';
import { gql, useQuery } from '@apollo/client';
import Layout from '../../components/VerticalLayout';
import { CustomTable } from '../../components/Table/CustomTable';

const QUERY = gql`
  query addedPeopleList($websiteId: Int!) {
    addedPeopleList(websiteId: $websiteId) {
      userId
      fullName
    }
  }
`;

export function PeopleScreen() {
  const router = useRouter();

  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId: Number(router.query.id),
    },
  });

  if (loading || !data) return <div>Loading...</div>;
  return (
    <Layout>
      <Container>
        <Row className="mx-4">
          <Col md={3} style={{ borderRight: '1px solid #ccc', height: '100vh' }}>
            <WebsiteSettingSidebar />
          </Col>
          <Col md={9}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <h6 className="mb-4">Users</h6>
              <Link href={`/mochub/websites/${router.query.id}/add-people`}>
                <a className={style.mocAddPeopleButton}>Add People</a>
              </Link>
              {/* <Button style={{ background: 'rgb(0, 82, 204)' }}>Add People</Button> */}
            </div>

            <CustomTable data={data?.addedPeopleList} websiteId={Number(router.query.id)} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
