import { useMutation, useQuery } from '@apollo/client';
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
import { useState } from 'react';
import { SingleUpload } from '../../../../components/SingleUpload';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

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

const MUTATION = gql`
  mutation updateCountry($websiteId: Int!, $countryId: Int!, $input: CountryInput) {
    updateCountry(websiteId: $websiteId, countryId: $countryId, input: $input)
  }
`;

export function EditCountryScreen() {
  const [selectedImage, setSelectedImage]: any = useState('');

  const [updateCountry] = useMutation(MUTATION, {
    onCompleted: data => {
      if (data) {
        toastr.success('Country Update Successfully!');
      }
    },
  });

  const router = useRouter();
  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId: Number(router.query.id),
      countryId: Number(router.query.editCountryId),
    },
    onCompleted: data => {
      if (data) {
        setSelectedImage(data?.countryDetail?.country_image);
      }
    },
  });

  if (loading || !data) return <>Loading...</>;

  const onUpdateCountry = () => {};

  const onHandleSubmit = (e: any) => {
    e.preventDefault();

    const x = e.target;

    const input: any = {};

    input['country_name_en'] = x?.country_name_en?.value;
    input['country_name_kh'] = x?.country_name_kh?.value;
    input['code'] = x?.country_code?.value;
    input['country_image'] = selectedImage ? selectedImage : '';

    updateCountry({
      variables: {
        countryId: Number(router.query.editCountryId),
        websiteId: Number(router.query.id),
        input,
      },
    });
  };

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title={setting.title} breadcrumbItem="Edit category" />
          <hr />
          <form onSubmit={onHandleSubmit}>
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
                    <Row style={{ rowGap: 20 }}>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Enter your country name here...</Form.Label>
                          <input
                            type="text"
                            placeholder="Enter your category here..."
                            name="country_name_en"
                            className={`form-control`}
                            defaultValue={data ? data.countryDetail.countryName.en : ''}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Enter your country name in Khmer here...</Form.Label>
                          <input
                            type="text"
                            placeholder="Enter your category here..."
                            name="country_name_kh"
                            className={`form-control`}
                            defaultValue={data ? data.countryDetail.countryName.kh : ''}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Enter your country code here...</Form.Label>
                          <input
                            type="text"
                            placeholder="Enter your category here..."
                            name="country_code"
                            className={`form-control`}
                            defaultValue={data ? data.countryDetail.code : ''}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <button type="submit" className="btn btn-primary">
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
                    <SingleUpload setImage={setSelectedImage} image={selectedImage} height="100%" width="100%" />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </Layout>
  );
}
