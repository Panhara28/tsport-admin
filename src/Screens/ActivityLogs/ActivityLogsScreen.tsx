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
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { SEO } from '../../components/SEO';

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
          phoneNumber
          email
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
  const [showLog, setShowLog] = useState<boolean>(false);
  const [logData, setLogData] = useState<any>(undefined);

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

  const checkStatus = (status: string) => {
    let text = status?.toLowerCase();
    if (text === 'pending') {
      return 'primary';
    } else if (text === 'inreview') {
      return 'warning';
    } else if (text === 'reversion') {
      return 'danger';
    } else if (text === 'published') {
      return 'success';
    }
  };

  const handleShowLog = (e: any, item: any) => {
    e.preventDefault();

    setShowLog(true);
    setLogData(item);
  };

  return (
    <>
      <SEO
        title="Activity Log"
        description={`
                  Design & Develop  by Moc Software Development Team
                `}
        image=""
      />
      <Layout>
        <div className="page-content">
          <Container fluid>
            <Breadcrumb title={setting.title} breadcrumbItem="Activity Logs" />
            <hr />
            <Row className="mb-4">
              <Col md={9}>
                <Modal show={showLog} onHide={() => setShowLog(false)} size="lg">
                  <Modal.Header closeButton>Activity Logs</Modal.Header>

                  <Modal.Body>
                    <Row>
                      <LineCol md={6}>
                        <Row className="p-10" style={{ gap: '20px' }}>
                          <Col>
                            <img
                              src={
                                logData?.user?.profile_picture
                                  ? logData?.user?.profile_picture
                                  : '/user-placeholder-image.jpeg'
                              }
                              width="250px"
                            />
                          </Col>
                          <Col>
                            <p style={{ fontSize: '1.6rem' }}>
                              {logData?.user?.fullname ? logData?.user?.fullname : 'គ្មាន'}
                            </p>
                            <p>Phone Number: {logData?.user?.phoneNumber ? logData?.user?.phoneNumber : 'គ្មាន'}</p>
                            <p>Email: {logData?.user?.email ? logData?.user?.email : 'គ្មាន'}</p>
                            {logData?.user?.position_level ? (
                              <p>
                                Position Level:{' '}
                                {data?.positionList?.filter((item: any) => item.id === logData?.user?.position_level)[0]
                                  ?.name
                                  ? data?.positionList?.filter(
                                      (item: any) => item.id === logData?.user?.position_level,
                                    )[0]?.name
                                  : 'គ្មាន'}
                              </p>
                            ) : (
                              ''
                            )}
                          </Col>
                        </Row>
                      </LineCol>
                      <Col md={6}>
                        <Row className="p-10" style={{ gap: '20px' }}>
                          <Col>
                            <p style={{ fontSize: '1.6rem' }}>Activity Log</p>
                            <p>
                              <b>type:</b> {logData?.type ? logData?.type : 'គ្មាន'}
                            </p>
                            <p>
                              <b>activity:</b>{' '}
                              {parseTEXT(parseJSON(logData?.activity)?.activityType)
                                ? parseTEXT(parseJSON(logData?.activity)?.activityType)
                                : 'គ្មាន'}
                            </p>
                            {parseJSON(logData?.activity)?.changeStatus ? (
                              <p>
                                <b>status to:</b>{' '}
                                <span className={`text-${checkStatus(parseJSON(logData?.activity)?.changeStatus)}`}>
                                  {parseJSON(logData?.activity)?.changeStatus
                                    ? parseJSON(logData?.activity)?.changeStatus
                                    : 'គ្មាន'}
                                </span>
                              </p>
                            ) : (
                              ''
                            )}
                            {parseJSON(logData?.activity)?.userAgent ? (
                              <p>
                                <b>user agent:</b>{' '}
                                {parseJSON(logData?.activity)?.userAgent
                                  ? parseJSON(logData?.activity)?.userAgent
                                  : 'គ្មាន'}
                              </p>
                            ) : (
                              ''
                            )}
                            {parseJSON(logData?.activity)?.ip ? (
                              <p>
                                <b>ip address:</b>{' '}
                                {parseJSON(logData?.activity)?.ip ? parseJSON(logData?.activity)?.ip : 'គ្មាន'}
                              </p>
                            ) : (
                              ''
                            )}
                            <p>
                              <b>changed at:</b>{' '}
                              {parseJSON(logData?.activity)?.logged_at
                                ? parseJSON(logData?.activity)?.logged_at
                                : 'គ្មាន'}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Modal.Body>
                </Modal>

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
                                <td>
                                  {parseJSON(log.activity).logged_at ? parseJSON(log.activity).logged_at : 'គ្មាន'}
                                </td>
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
    </>
  );
}

const LineCol = styled(Col)`
  border-right: 0px;

  @media screen and (min-width: 992px) {
    border-right: 2px solid #0e0e0e0e;
  }
`;
