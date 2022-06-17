import { useMutation, useQuery } from '@apollo/client';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';
import { Row, Col, Card, CardBody, Container } from 'reactstrap';
import { Breadcrumb } from '../../../../components/Common/Breadcrumb';
import Layout from '../../../../components/VerticalLayout';
import style from './category.module.scss';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { setting } from '../../../../libs/settings';

const QUERY = gql`
  query newsCategoryDetail($websiteId: Int!, $id: Int!) {
    newsCategoryDetail(websiteId: $websiteId, id: $id) {
      id
      name
    }
  }
`;

const MUTATION = gql`
  mutation updateNewsCategory($websiteId: Int!, $id: Int!, $input: NewsCategoryInput) {
    updateNewsCategory(websiteId: $websiteId, id: $id, input: $input)
  }
`;

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-bottom-center',
  preventDuplicates: false,
  onclick: null,
  showDuration: '2000',
  hideDuration: '2000',
  timeOut: '2000',
  extendedTimeOut: '2000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

export function EditNewsCategoryScreen() {
  let nameInput: any;
  const router = useRouter();
  const [updateNewsCategory] = useMutation(MUTATION, {
    onCompleted: data => {
      if (data.updateNewsCategory) {
        toastr.success('Category has been updated');
      }
    },
    refetchQueries: ['newsCategoryList'],
  });
  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId: Number(router.query.id),
      id: Number(router.query.categoryEditId),
    },
  });

  if (loading || !data) return <div>Loading...</div>;

  const onUpdateCategory = () => {
    updateNewsCategory({
      variables: {
        websiteId: Number(router.query.id),
        id: Number(router.query.categoryEditId),
        input: {
          name: nameInput?.value,
        },
      },
    });
  };

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
                    <Col md={12}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Enter your category here...</Form.Label>
                        <input
                          type="text"
                          placeholder="Enter your category here..."
                          name="title"
                          className={`form-control`}
                          defaultValue={data ? data.newsCategoryDetail.name : ''}
                          ref={node => (nameInput = node)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <button type="button" className="btn btn-primary" onClick={() => onUpdateCategory()}>
                        Update
                      </button>
                    </Col>
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
