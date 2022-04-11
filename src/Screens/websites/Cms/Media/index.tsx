import { gql, useQuery } from '@apollo/client';
import { faSquareCaretRight, faSquareFull } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../../../components/Common/Breadcrumb';
import Layout from '../../../../components/VerticalLayout';
import Image from 'next/image';
import Link from 'next/link';

const QUERY = gql`
  query mediaList($websiteId: Int!, $pagination: PaginationInput) {
    mediaList(websiteId: $websiteId, pagination: $pagination) {
      data {
        id
        image_url
      }
    }
  }
`;

export function MediaListScreen() {
  const router = useRouter();

  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId: Number(router.query.id),
      pagination: {
        page: 1,
        size: 10,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading || !data) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Media Library" />
          <hr />
          <Row>
            <Col md={3} className="mb-3">
              <Link href={`/mochub/websites/${router.query.id}/media/create`}>
                <a className="btn btn-primary">
                  <FontAwesomeIcon icon={faPlus} /> Add New
                </a>
              </Link>
            </Col>
            <Col md={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={2}>
                      <Select
                        options={[
                          { label: 'All media items', value: 'all media items' },
                          { label: 'Images', value: 'images' },
                          { label: 'Files', value: 'files' },
                        ]}
                        placeholder="All media items"
                      />
                    </Col>
                    <Col md={2}>
                      <Select
                        options={[
                          { label: 'All dates', value: 'all dates' },
                          { label: 'April 2022', value: 'April 2022' },
                          { label: 'March 2022', value: 'March 2022' },
                        ]}
                        placeholder="All dates"
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
                  <Row>
                    {data.mediaList.data.map((item: any) => {
                      return (
                        <Col md={2} className={`mb-3`}>
                          <Image src={item.image_url} alt="" layout="responsive" width={150} height={150} />
                        </Col>
                      );
                    })}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
