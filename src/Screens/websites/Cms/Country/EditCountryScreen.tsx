import { useQuery } from '@apollo/client';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Col } from 'reactstrap';
import { Row } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../../../components/Common/Breadcrumb';
import Layout from '../../../../components/VerticalLayout';
import { setting } from '../../../../libs/settings';
import { Form } from 'react-bootstrap';
import { ProfileUpload } from '../../../../components/ProfileUpload';
import { useState } from 'react';

const QUERY = gql`
  query countryDetail($websiteId: Int!, $countryId: Int!) {
    countryDetail(websiteId: $websiteId, countryId: $countryId) {
      id
      countryName {
        kh
        en
      }
      code
      country_image
    }
  }
`;

export function EditCountryScreen() {
  let countryNameEnInput: any;
  let countryNameKhInput: any;
  let codeInput: any;
  const [finaleSelected, setFinaleSelected]: any = useState('');
  const [key, setKey] = useState('media');
  const [firstFeaturedImage, setFirstFeaturedImage]: any = useState(undefined);
  const [selectedImage, setSelectedImage]: any = useState('');

  const router = useRouter();
  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId: Number(router.query.id),
      countryId: Number(router.query.editCountryId),
    },
  });

  if (loading || !data) return <>Loading...</>;

  const onUpdateCountry = () => {};

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title={setting.title} breadcrumbItem="Edit category" />
          <hr />
          <Row>
            <Col md={9}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div></div>
                <Link href="#">
                  <a className="btn btn-danger" onClick={() => router.back()}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Back
                  </a>
                </Link>
              </div>
              <Card className="mt-3">
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Enter your country name here...</Form.Label>
                        <input
                          type="text"
                          placeholder="Enter your category here..."
                          name="title"
                          className={`form-control`}
                          defaultValue={data ? data.countryDetail.countryName.en : ''}
                          ref={node => (countryNameEnInput = node)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Enter your country name here...</Form.Label>
                        <input
                          type="text"
                          placeholder="Enter your category here..."
                          name="title"
                          className={`form-control`}
                          defaultValue={data ? data.countryDetail.countryName.kh : ''}
                          ref={node => (countryNameKhInput = node)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Enter your country code here...</Form.Label>
                        <input
                          type="text"
                          placeholder="Enter your category here..."
                          name="title"
                          className={`form-control`}
                          defaultValue={data ? data.countryDetail.code : ''}
                          ref={node => (codeInput = node)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <button type="button" className="btn btn-primary" onClick={() => onUpdateCountry()}>
                        Update
                      </button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <CardBody>
                  <ProfileUpload
                    setImage={setFinaleSelected}
                    setKey={setKey}
                    height="100%"
                    width="100%"
                    setFirstFeaturedImage={setFirstFeaturedImage}
                    setSelectImage={setSelectedImage}
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
