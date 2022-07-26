/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import { CustomPagination } from '../../components/Paginations';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';
import { ActivityLogContainer, ActivityTable } from './ActivityLogsScreen.styled';
import Select from 'react-select';

const QUERY = gql`
  query activityLogsList($filter: FilterActivityLogs, $pagination: PaginationInput) {
    activityLogsList(filter: $filter, pagination: $pagination) {
      data {
        id
        type
        user_id
        activity
        user {
          id
          profile_picture
          fullname
        }
      }
      pagination {
        total
        size
        current
      }
    }

    activityLogsOptions {
      type
    }

    adminUserList {
      data {
        id
        fullname
        email
        phoneNumber
        profile_picture
      }
    }
  }
`;

export function ActivityLogsScreen() {
  const router = useRouter();
  const page = router.query.page ? Number(router.query.page) : 1;

  const [type, setType] = useState(undefined);

  const { data, loading } = useQuery(QUERY, {
    variables: {
      pagination: {
        size: 10,
        page,
      },
      filter: {
        type,
      },
    },
  });

  if (!data || loading) return <></>;

  const options = data.activityLogsOptions.map((item: any) => {
    if (item.type === 'ALL') {
      return {
        label: item.type,
        value: undefined,
      };
    }

    return {
      label: item.type,
      value: item.type,
    };
  });

  const parseJSON = (json: string) => {
    if (!json) {
      return;
    }

    const newJson = json.replace(/'/g, '"');
    const result = JSON.parse(newJson);
    return result;
  };

  const parseTEXT = (text: string) => {
    if (!text) {
      return;
    }

    const newText = text.split('_');
    return newText.join(' ').toUpperCase();
  };

  const parseFULLNAME = (id: Number) => {
    if (!id) {
      return;
    }

    const user = data.adminUserList.data.filter((item: any) => Number(item.id) === Number(id))[0];

    return user?.fullname;
  };

  const handleShowLog = (e: any, log: any) => {};

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title={setting.title} breadcrumbItem="Activity Logs" />
          <hr />
          <Row className="mb-4">
            <Col md={9}>
              <Card>
                <CardBody>
                  <ActivityLogContainer>
                    <h5 className="mb-4">Logs Table</h5>

                    <Row className="flex-start">
                      <Col md={3} style={{ padding: '0px' }} className="mb-2">
                        <Select
                          options={options}
                          onChange={(e: any) => setType(e.value)}
                          value={{
                            label: type === undefined ? 'ALL' : type,
                            value: type,
                          }}
                        />
                      </Col>
                    </Row>

                    <ActivityTable>
                      <thead>
                        <tr>
                          <th>#Id</th>
                          <th>Type</th>
                          <th>Activity</th>
                          <th>Fullname</th>
                          <th>Logged At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.activityLogsList.data.map((log: any) => {
                          return (
                            <tr key={log.id}>
                              <td onClick={e => handleShowLog(e, log)} style={{ cursor: 'pointer' }}>
                                {log.id ? log.id : 'គ្មាន'}
                              </td>
                              <td onClick={e => handleShowLog(e, log)} style={{ cursor: 'pointer' }}>
                                {log.type ? log.type : 'គ្មាន'}
                              </td>
                              <td>
                                {parseTEXT(parseJSON(log.activity).activityType)
                                  ? parseTEXT(parseJSON(log.activity).activityType)
                                  : 'គ្មាន'}
                              </td>
                              <td>
                                {parseFULLNAME(Number(log.user_id)) ? parseFULLNAME(Number(log.user_id)) : 'គ្មាន'}
                              </td>
                              <td>{parseJSON(log.activity).logged_at ? parseJSON(log.activity).logged_at : 'គ្មាន'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </ActivityTable>
                  </ActivityLogContainer>
                  <CustomPagination
                    total={data.activityLogsList.pagination.total}
                    currentPage={data.activityLogsList.pagination.current}
                    size={data.activityLogsList.pagination.size}
                    limit={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
