import { gql, useMutation, useQuery } from '@apollo/client';
import { faAngleLeft, faPaperPlane, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row, Tab, Tabs, Table } from 'react-bootstrap';
import { StatusPageBagde } from '../../../../components/StatusPageBagde';
import { TransformDataEditorJS } from '../../../../libs/TransformDataEditorJs';
import Switch from 'react-switch';
import { RenderEditButton } from '../../../../components/RenderEditButton';
import { ReverseDataEditorJS } from '../../../../libs/ReverseDataEditorJs';
import Link from 'next/link';
import style from './news.module.scss';
import CreatableSelect from 'react-select/creatable';
import AuthContext from '../../../../components/Authentication/AuthContext';
import Layout from '../../../../components/VerticalLayout';
import { Breadcrumb } from '../../../../components/Common/Breadcrumb';
import FormEditor from '../../../../components/Editor/FormEditor';
import { CardBody } from 'reactstrap';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { MediaListByWebsite } from '../../../../components/Media/MediaListByWebsite';
import { SignleImageUpload } from '../../../../components/SignleImageUpload';
import Image from 'next/image';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { parseImageUrl } from '../../../../hook/parseImageUrl';
import { Label } from 'reactstrap';
import { Input } from 'reactstrap';
import requirePermission from '../../../../hook/requirePermission';
import { WEBSITE_ID } from '../../../../config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const MUTATION = gql`
  mutation updateNews($id: Int!, $input: NewsInput, $websiteId: Int!) {
    updateNews(id: $id, input: $input, websiteId: $websiteId)
  }
`;

const CREATE_NEWS_CATEGORY = gql`
  mutation createNewsCategory($websiteId: Int!, $input: NewsCategoryInput) {
    createNewsCategory(input: $input, websiteId: $websiteId)
  }
`;

export const UPDATE_NEW_STATUS = gql`
  mutation updateNewsStatus($id: Int!, $status: NewsEnum, $websiteId: Int!) {
    updateNewsStatus(id: $id, status: $status, websiteId: $websiteId)
  }
`;

const PAGE_DETAIL = gql`
  query newsDetail($id: Int!, $websiteId: Int!) {
    newsDetail(id: $id, websiteId: $websiteId) {
      id
      title
      description
      thumbnail
      status
      new_category_id
      summary
    }

    publicNewsCategoryList {
      id
      name
    }

    activityLogsNews(websiteId: $websiteId, id: $id) {
      data {
        id
        type
        user_id
        activity
        user {
          fullname
        }
      }
    }
  }
`;

export function EditNewsScreen() {
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: 'toast-bottom-right',
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
  const { me } = useContext(AuthContext);
  const router = useRouter();
  const [selectImage, setSelectImage] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [firstFeaturedImage, setFirstFeaturedImage] = useState(undefined);
  const [finaleSelected, setFinaleSelected]: any = useState(undefined);
  const [thumbnail, setThumbnail]: any = useState(undefined);
  const [showLog, setShowLog] = useState(false);
  const [logData, setLogData] = useState(undefined);
  const [lgShow, setLgShow] = useState(false);
  const [key, setKey] = useState('media');
  const [documentDate, setDocumentDate] = useState(new Date());

  const { data, loading } = useQuery(PAGE_DETAIL, {
    variables: {
      id: Number(router.query.newsEditId),
      websiteId: Number(router.query.id),
    },
    onCompleted: data => {
      setThumbnail(data.newsDetail.thumbnail);
      if (data?.newsDetail?.thumbnail) {
        setFinaleSelected({ featureImage: data.newsDetail.thumbnail });
      }
    },
  });

  const [createNewsCategory] = useMutation(CREATE_NEWS_CATEGORY, {
    onCompleted: data => {
      if (data.createNewsCategory) {
        toastr.success('Category Created!');
      }
    },
    refetchQueries: ['publicNewsCategoryList', 'newsDetail'],
  });

  const [updateNews] = useMutation(MUTATION, {
    onCompleted: data => {
      if (data.updateNews) {
        router.push(`/mochub/websites/${router.query.id}/cms/news/${router.query.newsEditId}/edit`);
        toastr.success('Save Draft');
      }
    },
    refetchQueries: ['newsDetail'],

    onError: error => {
      toastr.error(error.message);
    },
  });

  const [updateStatus] = useMutation(UPDATE_NEW_STATUS, {
    refetchQueries: ['newsDetail'],
    onError: error => {
      console.log(error.message);
    },
  });

  const onInReview = (status: string) => {
    updateStatus({
      variables: {
        id: Number(router.query.newsEditId),
        websiteId: Number(router.query.id),
        status,
      },
      refetchQueries: ['newsDetail'],
    });
  };

  useEffect(() => {
    let usedNewKey = localStorage.getItem('usedNews');
    if (usedNewKey !== router.query.id + '') {
      localStorage.removeItem('newsDataEdit');
    }
  }, []);

  let titleInput: any;
  let summaryInput: any;
  let categoryInput: any;

  const onSubmit = (e: any) => {
    e.preventDefault();
    const description = localStorage.getItem('newsDataEdit');
    const result =
      description === null
        ? TransformDataEditorJS(data.newsDetail.description)
        : TransformDataEditorJS(JSON.parse(description));

    const input = {
      title: titleInput.value,
      description: result,
      thumbnail: finaleSelected ? finaleSelected?.featureImage : data.newsDetail.thumbnail,
      summary: summaryInput.value,
      new_category_id: categoryInput?.getValue()[0]?.value,
    };

    updateNews({
      variables: {
        id: Number(router.query.newsEditId),
        websiteId: Number(router.query.id),
        input,
      },
    });

    localStorage.removeItem('newsData');
  };

  if (loading || !data) return <div>Loading...</div>;

  const parseJSON = (json: string) => {
    if (json === undefined || json === null) {
      return;
    }
    const newJson = json.replace(/'/g, '"');
    const result = JSON.parse(newJson);
    return result;
  };

  const parseTEXT = (text: string) => {
    if (text === undefined || text === null) {
      return;
    }
    const newText = text.split('_');
    return newText.join(' ').toUpperCase();
  };

  const renderInReview = <StatusPageBagde status={data.newsDetail.status} />;

  const renderButton =
    data.newsDetail.status === 'PENDING' || data.newsDetail.status === 'REVERSION' ? (
      <Button className="mb-3" variant="warning" style={{ width: '100%' }} onClick={() => onInReview('INREVIEW')}>
        <FontAwesomeIcon icon={faPaperPlane} /> Edit & Review
      </Button>
    ) : (
      <>
        <p style={{ fontStyle: 'italic' }}>Example</p>
        <Button className="mb-3" variant="danger" style={{ width: '100%' }} onClick={() => onInReview('REVERSION')}>
          <FontAwesomeIcon icon={faTimesCircle} /> Reversion
        </Button>
      </>
    );

  const renderEditButton = <RenderEditButton status={data.newsDetail.status} onSubmit={onSubmit} />;

  const defaultJSON = {
    time: 1587670998983,
    blocks: [],
    version: '2.17.0',
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

  const renderEditorJS: any = localStorage.getItem('newsDataEdit')
    ? JSON.parse(localStorage.getItem('newsDataEdit')!)
    : data.newsDetail.description === undefined
    ? ReverseDataEditorJS(defaultJSON)
    : ReverseDataEditorJS(data.newsDetail.description);

  let renderNewsLogs;

  const handleShowLog = (e: any, item: any) => {
    e.preventDefault();

    setLogData(item);
    setShowLog(true);
  };

  if (data.activityLogsNews.data.length > 0) {
    renderNewsLogs = data.activityLogsNews.data.map((item: any) => {
      return (
        <>
          <tr onClick={e => handleShowLog(e, item)} style={{ cursor: 'pointer' }}>
            {/* <td>
              <span style={{ fontWeight: 600, fontSize: "10px" }}>
                {parseTEXT(parseJSON(item.activity).activityType)}
              </span>
              <p>{parseJSON(item.activity).changeStatus}</p>
            </td>
            <td style={{ fontSize: "12px" }}>
              {parseJSON(item.activity).logged_at}
            </td> */}
            <td>
              <Row>
                <Col
                  md={6}
                  className="d-flex flex-column"
                  style={{
                    fontWeight: 600,
                    fontSize: '10px',
                    justifyContent: 'center',
                  }}
                >
                  {parseTEXT(parseJSON(item.activity).activityType)}
                  <br />
                  <span
                    className={`text-${checkStatus(parseJSON(item.activity).changeStatus)}`}
                    style={{ marginTop: '2px' }}
                  >
                    {parseJSON(item.activity).changeStatus}
                  </span>
                </Col>
                <Col md={6} style={{ fontSize: '12px' }}>
                  {parseJSON(item.activity).logged_at}
                </Col>
                <Col md={6}>
                  <span>
                    <Image
                      src={parseImageUrl('/icons/js.png', '500x500')}
                      // src={parseImageUrl('/icons/js.png', '500x500')}
                      alt=""
                      layout="responsive"
                      width={10}
                      height={10}
                      className={`${style.img_radius}`}
                    />
                  </span>
                </Col>
                <Col md={6} style={{ fontSize: '12px', paddingTop: '8px' }}>
                  {item.user.fullname}
                </Col>
              </Row>
            </td>
          </tr>
          {/* <tr>
            <td style={{ width: "40%", borderTop: "none" }}>
              <span>
                <img
                  src={item.user.profile}
                  style={{ width: "80%", height: "auto", borderRadius: "50%" }}
                />
              </span>
            </td>
            <td style={{ borderTop: "none", fontSize: "12px" }}>
              {item.user.fullname}
            </td>
          </tr> */}
        </>
      );
    });
  } else {
    renderNewsLogs = (
      <>
        <hr />
        <div className="d-flex flex-row" style={{ justifyContent: 'center' }}>
          No Record
        </div>
      </>
    );
  }

  const renderPublishedOld =
    me.roleName != 'Content Manager' ? (
      renderButton
    ) : (
      <>
        <Form.Group controlId="formBasicCheckbox">
          <Switch
            checked={data.newsDetail.status === 'PUBLISHED' ? true : false}
            onChange={(checked: any) => {
              if (!checked) {
                const isDeactived = window.confirm('Are you sure you want to unpublished this page ?');
                if (isDeactived) {
                  updateStatus({
                    variables: {
                      id: Number(router.query.newsEditId),
                      websiteId: Number(router.query.id),
                      status: checked ? 'PUBLISHED' : 'REVERSION',
                    },
                  });
                }
              } else {
                const isDeactived = window.confirm('Are you sure you want to published this page ?');
                if (isDeactived) {
                  updateStatus({
                    variables: {
                      id: Number(router.query.newsEditId),
                      websiteId: Number(router.query.id),
                      status: checked ? 'PUBLISHED' : 'REVERSION',
                    },
                  });
                }
              }
            }}
          />
        </Form.Group>
      </>
    );

  const onHandleCreatableNewsCategory = (e: any) => {
    createNewsCategory({
      variables: {
        input: {
          name: e,
        },
        websiteId: Number(router.query.id),
      },
    });
  };

  const accessPlugin = me.plugins.find((item: any) => item.slug === 'news');

  if (!accessPlugin.access.edit) {
    router.push(`/no-permission`);
  }

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
        <Image
          src={parseImageUrl(finaleSelected?.featureImage, '500x500')}
          alt=""
          layout="responsive"
          width={100}
          height={100}
        />
      </div>
    </>
  ) : (
    <div className={style.newsFeatureImageContainer} onClick={() => setLgShow(true)}>
      <div className={style.newsFeatureImageIcon}>
        <FontAwesomeIcon icon={faImage} />
      </div>
    </div>
  );

  const renderPublished = !requirePermission({
    permissions: ['Site Administrator', 'Content Manager', 'Administrator'],
  }) ? (
    renderButton
  ) : (
    <>
      <Form.Group controlId="formBasicCheckbox">
        <Switch
          checked={data.newsDetail.status === 'PUBLISHED' ? true : false}
          onChange={(checked: any) => {
            if (!checked) {
              const isDeactived = window.confirm('Are you sure you want to unpublished this page ?');
              if (isDeactived) {
                updateStatus({
                  variables: {
                    id: Number(router.query.newsEditId),
                    websiteId: Number(router.query.id),
                    status: checked ? 'PUBLISHED' : 'REVERSION',
                  },
                });
              }
            } else {
              const isDeactived = window.confirm('Are you sure you want to published this page ?');
              if (isDeactived) {
                updateStatus({
                  variables: {
                    id: Number(router.query.newsEditId),
                    websiteId: Number(router.query.id),
                    status: checked ? 'PUBLISHED' : 'REVERSION',
                  },
                });
              }
            }
          }}
        />
      </Form.Group>
    </>
  );

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="News" />
          <hr />

          <Row>
            <Col md={9}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {renderInReview}
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
                        <Form.Label>Enter your title here...</Form.Label>
                        <input
                          type="text"
                          placeholder="Enter your title here..."
                          name="title"
                          className={`${style.titleInput} form-control`}
                          defaultValue={data ? data.newsDetail.title : ''}
                          ref={node => (titleInput = node)}
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
                          defaultValue={data ? data.newsDetail.summary : ''}
                          ref={node => (summaryInput = node)}
                        ></textarea>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Form.Group controlId="formBasicEmail">
                      <FormEditor editDataKey="newsDataEdit" data={renderEditorJS} id={router.query.newsEditId} />
                    </Form.Group>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <div style={{ position: 'sticky', top: '90px', marginBottom: '25px' }}>
                <Card>
                  <Card.Body>
                    <h6>Public</h6>
                    <hr />
                    {renderPublished}
                    <hr />
                    <h6>Reversion</h6>
                    <hr />
                    {renderEditButton}
                    {renderPublishedOld}

                    <Col md={6}>
                      <Form.Label>Select Date</Form.Label>
                      <DatePicker
                        selected={documentDate}
                        onChange={date => setDocumentDate(date)}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                      />
                    </Col>
                    <hr />
                    <CreatableSelect
                      isClearable
                      options={data.publicNewsCategoryList.map((x: any) => {
                        return {
                          value: x.id,
                          label: x.name,
                        };
                      })}
                      defaultValue={{
                        value: data.publicNewsCategoryList.filter(
                          (news: { id: any }) => news.id === data.newsDetail.new_category_id,
                        )[0]?.id,
                        label: data.publicNewsCategoryList.filter(
                          (news: { id: any }) => news.id === data.newsDetail.new_category_id,
                        )[0]?.name,
                      }}
                      ref={node => (categoryInput = node)}
                      name="category"
                      onCreateOption={e => onHandleCreatableNewsCategory(e)}
                    />
                    <h6 className="mt-3">Upload File</h6>
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
                              selectedImage={selectedImage}
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

                <Modal show={showLog} onHide={() => setShowLog(false)} size="lg">
                  <Modal.Header closeButton>Activity Logs</Modal.Header>

                  <Modal.Body>
                    <Row>
                      <LineCol md={6}>
                        <Row className="p-10" style={{ gap: '20px' }}>
                          <Col>
                            <Image
                              src={
                                logData?.user?.profile
                                  ? parseImageUrl(logData?.user?.profile, '244x244')
                                  : parseImageUrl('/user-placeholder-image.jpeg', '244x244')
                              }
                              width="250px"
                              height="250px"
                            />
                          </Col>
                          <Col>
                            <p style={{ fontSize: '1.6rem' }}>{logData?.user?.fullname}</p>
                            <p>Nationality: </p>
                            <p>Gender: </p>
                          </Col>
                        </Row>
                      </LineCol>
                      <Col md={6}>
                        <Row className="p-10" style={{ gap: '20px' }}>
                          <Col>
                            <p style={{ fontSize: '1.6rem' }}>Activity Log</p>
                            <p>
                              type:
                              {/* {logData?.type} */}
                            </p>
                            <p>activity: {parseTEXT(parseJSON(logData?.activity)?.activityType)}</p>
                            {parseJSON(logData?.activity)?.changeStatus ? (
                              <p>
                                status to:{' '}
                                <span className={`text-${checkStatus(parseJSON(logData?.activity)?.changeStatus)}`}>
                                  {parseJSON(logData?.activity)?.changeStatus}
                                </span>
                              </p>
                            ) : (
                              ''
                            )}
                            <p>changed at: {parseJSON(logData?.activity)?.logged_at}</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Modal.Body>
                </Modal>

                <Card>
                  <Card.Body>
                    <div className="d-flex m-t-10 p-l-10 m-b-10 no-block">
                      <h5 className="card-title m-b-0 align-self-center">News Activity Logs</h5>
                    </div>
                    <div className="table-wrapper bookmarking">
                      {/* <div className="bookmarking-main">
                        {" "}
                        <span>
                          <i className="fas fa-circle text-primary" />
                          Input
                        </span>
                        <span>
                          <i className="fas fa-circle text-warning" />
                          Output
                        </span>{" "}
                      </div> */}
                      <div className="scrollbox">
                        <Table hover responsive className="m-b-5">
                          <tbody>{renderNewsLogs}</tbody>
                        </Table>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

const LineCol = styled(Col)`
  border-right: 0px;

  @media screen and (min-width: 992px) {
    border-right: 2px solid #0e0e0e0e;
  }
`;
