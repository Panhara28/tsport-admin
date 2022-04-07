import { gql, useQuery } from "@apollo/client";
import { faAngleLeft, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { Col, Container, Row, Table } from "react-bootstrap";
import style from "./news.module.scss";
import moment from "moment";
import { CustomPagination } from "../../../../components/Paginations";
import Select, { StylesConfig } from "react-select";
import { useState } from "react";
import { StatusOption, statusOptions } from "../../../../libs/ReactSelectColor";
import Layout from "../../../../components/VerticalLayout";
import { Breadcrumb } from "../../../../components/Common/Breadcrumb";
import { Button, Card, CardBody, CardTitle, Label } from "reactstrap";

const QUERY = gql`
  query newsList(
    $filter: FilterNews
    $pagination: PaginationInput!
    $websiteId: Int!
  ) {
    newsList(filter: $filter, pagination: $pagination, websiteId: $websiteId) {
      data {
        id
        title
        created_at
      }
      pagination {
        total
        size
        current
      }
    }
  }
`;

export function NewsListScreen() {
  const dot = (color = "#4886ff") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles: StylesConfig<StatusOption> = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? data.color
          : isFocused
          ? data.color
          : undefined,
        ":active": {
          ...styles[":active"],
          backgroundColor: isSelected ? data.color : data.color,
        },
      };
    },
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };
  const [filterStatus, setFilterStatus] = useState({
    value: "PENDING",
    label: "Pending",
  });
  const router = useRouter();
  const { data, loading } = useQuery(QUERY, {
    variables: {
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        status: filterStatus.value,
      },
      websiteId: Number(router.query.id),
    },
  });

  if (loading || !data) return <div>Loading...</div>;

  const onSelectStatus = (select: any) => {
    setFilterStatus(select);
  };
  console.log(filterStatus);

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="News" />
          <hr />
          <Row>
            <Col lg={9}>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">All News</CardTitle>
                  <div className="table-responsive">
                    <Table
                      className="table-centered table-nowrap mb-0"
                      hover
                      striped
                    >
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Created At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.newsList.data.map((item: any) => {
                          return (
                            <>
                              <tr>
                                <td>{item.id}</td>
                                <td
                                  style={{
                                    whiteSpace: "break-spaces",
                                    width: "70%",
                                  }}
                                >
                                  {item.title}
                                </td>
                                <td>
                                  {moment(Number(item.created_at)).format(
                                    "DD, MMM YYYY"
                                  )}
                                </td>
                                <td>
                                  <Link href="/">
                                    <a
                                      className="btn btn-success btn-sm btn-rounded waves-effect waves-light"
                                      style={{ marginRight: 12 }}
                                    >
                                      <FontAwesomeIcon icon={faEye} /> View
                                    </a>
                                  </Link>
                                  <Link
                                    href={`/mochub/websites/${router.query.id}/cms/news/${item.id}/edit`}
                                  >
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
                  </div>
                </CardBody>
                <CustomPagination
                  total={data.newsList.pagination.total}
                  currentPage={data.newsList.pagination.current}
                  size={data.newsList.pagination.size}
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
