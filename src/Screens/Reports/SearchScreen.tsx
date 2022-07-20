import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Table } from 'react-bootstrap';
import { Card } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import XForm from '../../components/Form/XForm';
import { useState } from 'react';

const QUERY = gql`
  query employeeReport($pagination: PaginationInput, $filter: EmployeeReportFilter) {
    employeeReport(pagination: $pagination, filter: $filter) {
      data {
        fullname
        email
        profile
        gender
        phoneNumber
      }
    }
  }
`;

const HR_DEPARTMENT = gql`
  query hrDepartmentList($branch_level: Int, $parent_id: Int) {
    hrDepartmentList(branch_level: $branch_level, parent_id: $parent_id)
  }
`;

const GeneralDepartmentSelect = ({ generalDepartmentId, setGeneralDepartmentId }: any) => {
  const { data, loading } = useQuery(HR_DEPARTMENT, {
    variables: {
      branch_level: 0,
    },
  });

  if (!data || loading) return <></>;

  return (
    <XForm.Select
      label="Select General Department"
      value={generalDepartmentId}
      items={[
        {
          text: 'Choose one of the following',
          value: undefined,
        },
        ...data?.hrDepartmentList?.map((x: any) => {
          return {
            text: x?.name,
            value: x?.id,
          };
        }),
      ]}
      onChange={(e: any) => setGeneralDepartmentId(e.target.value)}
    />
  );
};

const DepartmentSelect = ({ generalDepartmentId, departmentId, setDepartmentId }: any) => {
  const { data, loading } = useQuery(HR_DEPARTMENT, {
    variables: {
      branch_level: 1,
      parent_id: Number(generalDepartmentId),
    },
  });

  if (!data || loading) return <></>;

  return (
    <XForm.Select
      label="Select Department"
      value={departmentId}
      onChange={(e: any) => setDepartmentId(e?.target?.value)}
      items={[
        {
          text: 'Choose one of the following',
          value: undefined,
        },
        ...data?.hrDepartmentList?.map((x: any) => {
          return {
            text: x?.name,
            value: x?.id,
          };
        }),
      ]}
    />
  );
};

const OfficeSelect = ({ departmentId, officeId, setOfficeId }: any) => {
  const { data, loading } = useQuery(HR_DEPARTMENT, {
    variables: {
      branch_level: 2,
      parent_id: Number(departmentId),
    },
  });

  if (!data || loading) return <></>;

  return (
    <XForm.Select
      label="Select Office"
      value={officeId}
      onChange={(e: any) => setOfficeId(e.target.value)}
      items={[
        {
          text: 'Choose one of the following',
          value: undefined,
        },
        ...data?.hrDepartmentList?.map((x: any) => {
          return {
            text: x?.name,
            value: x?.id,
          };
        }),
      ]}
    />
  );
};

type RenderReportProps = {
  generalDepartmentId?: number;
  departmentId?: number;
  officeId?: number;
  officerName?: string;
};

function RenderReport({ generalDepartmentId, departmentId, officeId, officerName }: RenderReportProps) {
  const { data, loading } = useQuery(QUERY, {
    variables: {
      pagination: {
        page: 1,
        size: 10,
      },
      filter: {
        generalDepartmentId,
        departmentId,
        officeId,
        officerName,
      },
    },
  });

  if (loading || !data) return <div>Loading...</div>;

  return (
    <>
      {data.employeeReport.data.map((item: any) => {
        return (
          <tr>
            <td>{item.profile}</td>
            <td>{item.fullname}</td>
            <td>{item.gender}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.email}</td>
            <td>
              <Link href="#">
                <a className="btn btn-primary">Edit</a>
              </Link>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export function SearchScreen() {
  const [departmentId, setDepartmentId] = useState('');
  const [generalDepartmentId, setGeneralDepartmentId] = useState('');
  const [officeId, setOfficeId] = useState('');
  const [officerName, setOfficerName] = useState('');

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb breadcrumbItem="Search" title={setting.title} />
          <hr />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={3}>
                      <GeneralDepartmentSelect
                        generalDepartmentId={generalDepartmentId}
                        setGeneralDepartmentId={setGeneralDepartmentId}
                      />
                    </Col>
                    <Col md={3}>
                      <DepartmentSelect
                        departmentId={departmentId}
                        setDepartmentId={setDepartmentId}
                        generalDepartmentId={generalDepartmentId}
                      />
                    </Col>
                    <Col md={3}>
                      <OfficeSelect officeId={officeId} setOfficeId={setOfficeId} departmentId={departmentId} />
                    </Col>
                    <Col md={3}>
                      <label>Search</label>
                      <input
                        className="form-control"
                        value={officerName}
                        onChange={e => setOfficerName(e.target.value)}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Table striped responsive bordered hover>
                    <thead>
                      <tr>
                        <th>Profile</th>
                        <th>Fullname</th>
                        <th>Gender</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <RenderReport
                        generalDepartmentId={Number(generalDepartmentId)}
                        departmentId={Number(departmentId)}
                        officeId={Number(officeId)}
                        officerName={officerName}
                      />
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
