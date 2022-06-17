import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Row, Container, Col } from 'reactstrap';
import { Breadcrumb } from '../../../../components/Common/Breadcrumb';
import Layout from '../../../../components/VerticalLayout';
import style from './category.module.scss';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';
import { setting } from '../../../../libs/settings';

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

const MUTATION = gql`
  mutation createNewsCategory($websiteId: Int!, $input: NewsCategoryInput) {
    createNewsCategory(websiteId: $websiteId, input: $input)
  }
`;

export function CreateNewsCategoryScreen() {
  let nameInput: any;
  const router = useRouter();
  const [createNewsCategory] = useMutation(MUTATION, {
    onCompleted: data => {
      if (data.createNewsCategory) {
        toastr.success('Category has been updated');
        router.push(`/mochub/websites/${router.query.id}/cms/news-category`);
      }
    },
    refetchQueries: ['newsCategoryList'],
  });

  const onSaveCategory = () => {
    createNewsCategory({
      variables: {
        websiteId: Number(router.query.id),
        input: {
          name: nameInput?.value,
        },
      },
    });
    nameInput.value = '';
  };

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title={setting.title} breadcrumbItem="Create category" />
          <hr />
          <Row>
            <Col md={9}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div></div>
                <Link href="#">
                  <a className="btn btn-danger mb-3" onClick={() => router.back()}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Back
                  </a>
                </Link>
              </div>
              <Card>
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
                          ref={node => (nameInput = node)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <button type="button" className="btn btn-primary" onClick={() => onSaveCategory()}>
                        Save
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
