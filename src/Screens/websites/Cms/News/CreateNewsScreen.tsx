import { gql, useMutation, useQuery } from '@apollo/client';
import { faAngleLeft, faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { CardBody } from 'reactstrap';

import { Form, Row, Col, Card, Button, Container, Modal, Tabs, Tab } from 'react-bootstrap';
import Select from 'react-select';
import AuthContext from '../../../../components/Authentication/AuthContext';
import { TransformDataEditorJS } from '../../../../libs/TransformDataEditorJs';
import style from './news.module.scss';
import Image from 'next/image';
import Layout from '../../../../components/VerticalLayout';
import { Breadcrumb } from '../../../../components/Common/Breadcrumb';
import { SignleImageUpload } from '../../../../components/SignleImageUpload';
import { MediaListByWebsite } from '../../../../components/Media/MediaListByWebsite';
import FormEditor from '../../../../components/Editor/FormEditor';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Link from 'next/link';

const MUTATION = gql`
  mutation createNews($input: NewsInput, $websiteId: Int!) {
    createNews(input: $input, websiteId: $websiteId)
  }
`;

const QUERY = gql`
  query publicNewsCategoryList {
    publicNewsCategoryList {
      id
      name
    }
  }
`;

export function CreateNewsScreen() {
  const [selectImage, setSelectImage] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [firstFeaturedImage, setFirstFeaturedImage] = useState(undefined);
  const [finaleSelected, setFinaleSelected] = useState(undefined);

  const [key, setKey] = useState('media');
  const [lgShow, setLgShow] = useState(false);
  const { me } = useContext(AuthContext);
  const [thumbnail, setThumbnail]: any = useState(undefined);
  const router = useRouter();
  const { data, loading } = useQuery(QUERY);

  const [addNews] = useMutation(MUTATION, {
    onCompleted: (data: any) => {
      if (data.createNews) {
        router.push(`/mochub/websites/${router.query.id}/cms/news/${data.createNews}/edit`);
        toastr.success('Save Draft');
      }
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();

    const x: any = e.target;
    const description: any = process.browser && localStorage.getItem('newsData');
    const result =
      description === null
        ? TransformDataEditorJS(data.newsDetail.description)
        : TransformDataEditorJS(JSON.parse(description));

    const input = {
      title: x.title.value,
      description: result,
      thumbnail: firstFeaturedImage ? firstFeaturedImage : selectedImage,
      summary: x.summary.value,
      new_category_id: Number(x.category.value),
    };

    addNews({
      variables: {
        input,
        websiteId: Number(router.query.id),
      },
    });
    process.browser && localStorage.removeItem('newsData');
  };

  const accessPlugin = me.plugins.find((item: any) => item.slug === 'news');

  if (!accessPlugin.access.create) {
    router.push(`/no-permission`);
  }

  if (!data || loading) return <></>;

  const renderFeaturedImage = finaleSelected ? (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'end' }}
        onClick={() => {
          setFinaleSelected(undefined);
        }}
      >
        <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} className="text-danger mb-3" />
      </div>
      <div>
        <Image src={finaleSelected} alt="" layout="responsive" width={100} height={100} />
      </div>
    </>
  ) : (
    <div className={style.newsFeatureImageContainer} onClick={() => setLgShow(true)}>
      <div className={style.newsFeatureImageIcon}>
        <FontAwesomeIcon icon={faImage} />
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="News" />
          <hr />
          <Row>
            <Col md={12}>
              <Form onSubmit={onSubmit}>
                <Row>
                  <Col md={9}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div></div>
                      <Link href="#">
                        <a className="btn btn-danger mb-3" style={{ marginLeft: 10 }} onClick={() => router.back()}>
                          <FontAwesomeIcon icon={faAngleLeft} /> Back
                        </a>
                      </Link>
                    </div>
                    <Card>
                      <CardBody>
                        <Row>
                          <Col md={12}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Enter your title here...</Form.Label>
                              <input
                                type="text"
                                placeholder="Enter your title here..."
                                name="title"
                                className={`${style.titleInput} form-control`}
                                autoFocus
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col lg={12} md={12}>
                            <Form.Group controlId="formBasicTextarea">
                              <Form.Label>Enter your summary here...</Form.Label>

                              <textarea
                                className={`${style.summaryInput} form-control`}
                                rows={3}
                                placeholder="Enter your summary here..."
                                name="summary"
                              ></textarea>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className="mt-4">
                          <Col>
                            <Form.Group controlId="formBasicEmail">
                              <FormEditor dataKey="newsData" />
                            </Form.Group>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col md={3}>
                    <Card>
                      <Card.Body>
                        <Button variant="primary" type="submit" style={{ width: '100%', margin: '10px 0px 25px 0px' }}>
                          Save Draft
                        </Button>

                        <h6>Category</h6>
                        <hr />
                        <Select
                          options={data?.publicNewsCategoryList?.map((x: any) => {
                            return {
                              value: x.id,
                              label: x.name,
                            };
                          })}
                          name="category"
                        />
                        <h6 className="mt-3">Feature Image</h6>
                        <hr />
                        {renderFeaturedImage}
                        <Modal
                          size="lg"
                          show={lgShow}
                          onHide={() => setLgShow(false)}
                          aria-labelledby="example-modal-sizes-title-lg"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm">Media</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Tabs
                              activeKey={key}
                              onSelect={(k: any) => {
                                setKey(k);
                              }}
                              id="uncontrolled-tab-example"
                              className="mb-3"
                            >
                              <Tab eventKey="upload" title="Upload">
                                <div className={style.newsUploadWrapper}>
                                  <div className="text-center">
                                    <h4>Drop files to upload</h4>
                                    <p>or</p>
                                  </div>
                                  <div className={style.newsUploadContainer}>
                                    <SignleImageUpload
                                      setImage={setThumbnail}
                                      setKey={setKey}
                                      width="15%"
                                      height="150px"
                                      websiteId={Number(router.query.id)}
                                      setFirstFeaturedImage={setFirstFeaturedImage}
                                      setSelectImage={setSelectImage}
                                    />
                                  </div>
                                </div>
                              </Tab>
                              <Tab eventKey="media" title="Media">
                                <MediaListByWebsite
                                  websiteId={Number(router.query.id)}
                                  setSelectedImage={setSelectedImage}
                                  firstFeaturedImage={firstFeaturedImage}
                                  setFirstFeaturedImage={setFirstFeaturedImage}
                                  selectImage={selectImage}
                                  setSelectImage={setSelectImage}
                                />
                              </Tab>
                            </Tabs>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="primary"
                              onClick={() => {
                                setLgShow(false);
                                if (firstFeaturedImage) {
                                  setFinaleSelected(firstFeaturedImage);
                                } else {
                                  setFinaleSelected(selectedImage);
                                }
                              }}
                            >
                              Set featured image
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
