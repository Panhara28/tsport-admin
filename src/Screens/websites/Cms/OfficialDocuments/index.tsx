import { useQuery } from '@apollo/client';
import { faAngleLeft, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql } from 'apollo-boost';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Card } from 'reactstrap';
import { CardTitle } from 'reactstrap';
import { Table } from 'reactstrap';
import { Label } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Breadcrumb } from '../../../../components/Common/Breadcrumb';
import { CustomPagination } from '../../../../components/Paginations';
import Layout from '../../../../components/VerticalLayout';
import { StatusOption, statusOptions } from '../../../../libs/ReactSelectColor';
import Select, { StylesConfig } from 'react-select';

const QUERY = gql`
  query documentList($websiteId: Int!, $pagination: PaginationInput, $filter: FilterDocumentInput) {
    documentList(websiteId: $websiteId, pagination: $pagination, filter: $filter) {
      data {
        id
        title
        published_date
      }
      pagination {
        current
        total
        size
      }
    }
  }
`;

export function OfficialDocumentScreen() {
  const router = useRouter();
  const [searchByName, setSearchByName] = useState(undefined);

  const dot = (color = '#4886ff') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles: StylesConfig<StatusOption> = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? data.color : isFocused ? data.color : undefined,
        ':active': {
          ...styles[':active'],
          backgroundColor: isSelected ? data.color : data.color,
        },
      };
    },
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  const [filterStatus, setFilterStatus] = useState<any>({
    value: 'All',
    label: 'ALL',
  });

  const onSelectStatus = (select: any) => {
    setFilterStatus(select);
  };

  const { data, loading } = useQuery(QUERY, {
    variables: {
      pagination: {
        page: 1,
        size: 10,
      },
      websiteId: Number(router.query.id),
      filter: {
        status: filterStatus.value === 'All' ? undefined : filterStatus.value,
        title: searchByName,
      },
    },
  });

  if (loading || !data) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Official Document" />
          <hr />
          <Row>
            <Col lg={9}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link href={`/mochub/websites/${router.query.id}/cms/official-documents/create`}>
                  <a className="btn btn-primary mb-3">
                    <FontAwesomeIcon icon={faPlus} /> Add new
                  </a>
                </Link>
                <Link href="#">
                  <a className="btn btn-danger mb-3" style={{ marginLeft: 10 }} onClick={() => router.back()}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Back
                  </a>
                </Link>
              </div>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">All Official Documents</CardTitle>
                  <Table className="table-centered table-nowrap mb-0" hover striped>
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.documentList.data.map((item: any) => {
                        return (
                          <>
                            <tr>
                              <td>{item.id}</td>
                              <td
                                style={{
                                  whiteSpace: 'break-spaces',
                                  width: '70%',
                                }}
                              >
                                {item.title}
                              </td>
                              <td>{moment(Number(item.published_date)).format('DD, MMM YYYY')}</td>
                              <td>
                                <Link href={`/mochub/websites/${router.query.id}/cms/news/${item.id}/edit`}>
                                  <a
                                    className="btn btn-primary btn-sm btn-rounded waves-effect waves-light"
                                    style={{ marginRight: 12 }}
                                  >
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                  </a>
                                </Link>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
                <CustomPagination
                  total={data.documentList.pagination.total}
                  currentPage={data.documentList.pagination.current}
                  size={data.documentList.pagination.size}
                  limit={10}
                />
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">Filter</CardTitle>
                  <hr />
                  <Label>Search by name</Label>
                  <input
                    className="form-control mb-3"
                    placeholder="Search..."
                    onChange={(e: any) => setSearchByName(e.currentTarget.value)}
                    defaultValue={searchByName}
                    autoFocus
                  />
                  <Label>Filter by status</Label>
                  <Select
                    options={statusOptions}
                    onChange={onSelectStatus}
                    value={filterStatus}
                    styles={colourStyles}
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
