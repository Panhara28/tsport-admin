import { gql, useMutation, useQuery } from '@apollo/client';
import { faAngleLeft, faPaperPlane, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
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
import { WEBSITE_ID } from '../../../../config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { CustomPagination } from '../../../../components/Paginations';

const MUTATION = gql`
  mutation updateNews($id: Int!, $input: NewsInput, $websiteId: Int!) {
    updateNews(id: $id, input: $input, websiteId: $websiteId)
  }
`;

const CREATE_NEWS_CATEGORY = gql`
  mutation createNewsCategory($websiteId: Int!, $input: NewsCategoryInput) {
    createNewsCategory(input: $input, websiteId: $websiteId) {
      success
      category {
        id
        name
      }
    }
  }
`;

export const UPDATE_NEW_STATUS = gql`
  mutation updateNewsStatus($id: Int!, $status: NewsEnum, $websiteId: Int!) {
    updateNewsStatus(id: $id, status: $status, websiteId: $websiteId)
  }
`;

const PAGE_DETAIL = gql`
  query newsDetail($id: Int!, $websiteId: Int!, $pagination: PaginationInput!) {
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

    activityLogsNews(websiteId: $websiteId, id: $id, pagination: $pagination) {
      data {
        id
        type
        user_id
        activity
        user {
          fullname
          profile_picture
        }
      }
      pagination {
        total
        size
        current
      }
    }
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

export function EditNewsScreen() {
  const query = new URLSearchParams(process.browser ? window.location.search : '');
  const page = query.get('page') ? Number(query.get('page')) : 1;
  const [newsCategory, setNewsCategory] = useState<any>(undefined);
  const [selectImage, setSelectImage] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [firstFeaturedImage, setFirstFeaturedImage] = useState(undefined);
  const [finaleSelected, setFinaleSelected]: any = useState(undefined);
  const [thumbnail, setThumbnail]: any = useState(undefined);
  const [showLog, setShowLog] = useState(false);
  const [logData, setLogData]: any = useState(undefined);
  const [lgShow, setLgShow] = useState(false);
  const [key, setKey] = useState('media');
  const [documentDate, setDocumentDate] = useState(new Date());
  const { me } = useContext(AuthContext);
  const router = useRouter();

  const { data, loading } = useQuery(PAGE_DETAIL, {
    variables: {
      id: Number(router.query.newsEditId),
      websiteId: Number(router.query.id),
      pagination: {
        page,
        size: 10,
      },
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
        setNewsCategory({
          label: data.createNewsCategory?.category?.name,
          value: data.createNewsCategory?.category?.id,
        });
      }
    },
    refetchQueries: ['publicNewsCategoryList', 'newsDetail'],
  });

  const [updateNews] = useMutation(MUTATION, {
    onCompleted: data => {
      if (data.updateNews) {
        toastr.success('Save Draft');
      }
    },
    refetchQueries: ['newsDetail'],

    onError: error => {
      toastr.error(error.message);
    },
  });

  const [updateStatus] = useMutation(UPDATE_NEW_STATUS, {
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
    });
    window.location.reload();
  };

  useEffect(() => {
    let usedNewKey = localStorage.getItem('usedNews');
    if (usedNewKey !== router.query.newsEditId + '') {
      localStorage.removeItem('newsDataEdit');
      localStorage.removeItem('newsTitleEdit');
      localStorage.removeItem('newsSummaryEdit');
    }
  }, []);

  let titleInput: any;
  let summaryInput: any;
  let categoryInput: any;

  if (loading || !data) return <div>Loading...</div>;

  const onSubmit = (e: any) => {
    e?.preventDefault();
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
    me.roleName != 'Content Manager' ? (
      data.newsDetail.status === 'PENDING' || data.newsDetail.status === 'REVERSION' ? (
        <>
          <h6>Reversion</h6>
          <hr />
          <Button
            className="mb-3"
            variant="warning"
            style={{ width: '100%' }}
            onClick={(e: any) => {
              onInReview('INREVIEW');
              onSubmit(e);
            }}
          >
            <FontAwesomeIcon icon={faPaperPlane} /> Edit & Review
          </Button>
          <hr />
        </>
      ) : (
        data.newsDetail.status !== 'PUBLISHED' && (
          <>
            <h6>Reversion</h6>
            <hr />
            <p style={{ fontStyle: 'italic' }}>Example</p>
            <Button
              className="mb-3"
              variant="danger"
              style={{ width: '100%' }}
              onClick={(e: any) => {
                onInReview('REVERSION');
                onSubmit(e);
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} /> Reversion
            </Button>
            <hr />
          </>
        )
      )
    ) : data.newsDetail.status === 'PENDING' || data.newsDetail.status === 'REVERSION' ? (
      <>
        <h6>Reversion</h6>
        <hr />
        <Button
          className="mb-3"
          variant="warning"
          style={{ width: '100%' }}
          onClick={(e: any) => {
            onInReview('INREVIEW');
            onSubmit(e);
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} /> Edit & Review
        </Button>
        <hr />
      </>
    ) : (
      <>
        <h6>Reversion</h6>
        <hr />
        <p style={{ fontStyle: 'italic' }}>Example</p>
        <Button
          className="mb-3"
          variant="danger"
          style={{ width: '100%' }}
          onClick={(e: any) => {
            onInReview('REVERSION');
            onSubmit(e);
          }}
        >
          <FontAwesomeIcon icon={faTimesCircle} /> Reversion
        </Button>
        <hr />
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

  const draftedTitle = localStorage.getItem('newsTitleEdit');
  const draftedSummary = localStorage.getItem('newsSummaryEdit');

  const onHandleTitleChange = (e: any) => {
    e.preventDefault();

    toastr.success('Draft Saved!');
    localStorage.setItem('newsTitleEdit', e.target.value);
  };

  const onHandleSummaryChange = (e: any) => {
    e.preventDefault();

    toastr.success('Draft Saved!');
    localStorage.setItem('newsSummaryEdit', e.target.value);
  };

  if (data.activityLogsNews.data.length > 0) {
    renderNewsLogs = data.activityLogsNews.data.map((item: any, key: number) => {
      return (
        <>
          <tr key={key} onClick={e => handleShowLog(e, item)} style={{ cursor: 'pointer' }}>
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
                  <div style={{ width: 50, height: 50 }}>
                    <Image
                      src={parseImageUrl(
                        item?.user?.profile_picture ? item?.user?.profile_picture : '/userplacehoder.png',
                        '200x200',
                      )}
                      alt=""
                      layout="responsive"
                      width={210}
                      height={210}
                      className={`${style.img_radius}`}
                    />
                  </div>
                </Col>
                <Col md={6} style={{ fontSize: '12px', paddingTop: '8px' }}>
                  {item.user.fullname}
                </Col>
              </Row>
            </td>
          </tr>
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
        {finaleSelected?.featureImage ? (
          <Image
            src={parseImageUrl(finaleSelected?.featureImage, '500x500')}
            alt=""
            layout="responsive"
            width={100}
            height={100}
          />
        ) : finaleSelected ? (
          <Image src={parseImageUrl(finaleSelected, '500x500')} alt="" layout="responsive" width={100} height={100} />
        ) : data?.newsDetail?.thumbnail ? (
          <Image
            src={parseImageUrl(data?.newsDetail?.thumbnail, '500x500')}
            alt=""
            layout="responsive"
            width={100}
            height={100}
          />
        ) : (
          undefined
        )}
      </div>
    </>
  ) : (
    <div className={style.newsFeatureImageContainer} onClick={() => setLgShow(true)}>
      <div className={style.newsFeatureImageIcon}>
        <FontAwesomeIcon icon={faImage} />
      </div>
    </div>
  );

  let renderPublished;

  if (me.roleName === 'Site Administrator' || me.roleName === 'Content Manager' || me.roleName === 'Administrator') {
    renderPublished = (
      <>
        <h6>Publish</h6>
        <hr />
        <Form.Group controlId="formBasicCheckbox">
          <Switch
            checked={data.newsDetail.status === 'PUBLISHED' ? true : false}
            onChange={(checked: any) => {
              if (!checked) {
                const isDeactived = window.confirm('Are you sure you want to unpublished this page ?');
                if (isDeactived) {
                  onSubmit(undefined);
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
                  onSubmit(undefined);
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
  }
  // const renderPublished = !RequirePermission({
  //   permissions: ['Site Administrator', 'Content Manager', 'Administrator'],
  // }) ? (
  //   <></>
  // ) : (
  //   <>
  //     <h6>Publish</h6>
  //     <hr />
  //     <Form.Group controlId="formBasicCheckbox">
  //       <Switch
  //         checked={data.newsDetail.status === 'PUBLISHED' ? true : false}
  //         onChange={(checked: any) => {
  //           if (!checked) {
  //             const isDeactived = window.confirm('Are you sure you want to unpublished this page ?');
  //             if (isDeactived) {
  //               onSubmit(undefined);
  //               updateStatus({
  //                 variables: {
  //                   id: Number(router.query.newsEditId),
  //                   websiteId: Number(router.query.id),
  //                   status: checked ? 'PUBLISHED' : 'REVERSION',
  //                 },
  //               });
  //             }
  //           } else {
  //             const isDeactived = window.confirm('Are you sure you want to published this page ?');
  //             if (isDeactived) {
  //               onSubmit(undefined);
  //               updateStatus({
  //                 variables: {
  //                   id: Number(router.query.newsEditId),
  //                   websiteId: Number(router.query.id),
  //                   status: checked ? 'PUBLISHED' : 'REVERSION',
  //                 },
  //               });
  //             }
  //           }
  //         }}
  //       />
  //     </Form.Group>
  //   </>
  // );

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
                          defaultValue={draftedTitle ? draftedTitle : data ? data.newsDetail.title : ''}
                          ref={node => (titleInput = node)}
                          onBlur={e => onHandleTitleChange(e)}
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
                          defaultValue={draftedSummary ? draftedSummary : data ? data.newsDetail.summary : ''}
                          ref={node => (summaryInput = node)}
                          onBlur={e => onHandleSummaryChange(e)}
                        ></textarea>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Form.Group controlId="formBasicEmail">
                      <FormEditor
                        editDataKey="newsDataEdit"
                        data={renderEditorJS}
                        id={Number(router.query.newsEditId)}
                      />
                    </Form.Group>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <div style={{ position: 'sticky', top: '90px', marginBottom: '25px' }}>
                <Card>
                  <Card.Body>
                    {renderPublished}

                    {renderButton}
                    <Form.Label>News Category</Form.Label>
                    <CreatableSelect
                      isClearable
                      options={data.publicNewsCategoryList.map((x: any) => {
                        return {
                          value: x.id,
                          label: x.name,
                        };
                      })}
                      defaultValue={{
                        value: data?.newsDetail?.new_category_id
                          ? data.publicNewsCategoryList.filter(
                              (news: { id: any }) => news.id === data.newsDetail.new_category_id,
                            )[0]?.id
                          : undefined,
                        label: data?.newsDetail?.new_category_id
                          ? data.publicNewsCategoryList.filter(
                              (news: { id: any }) => news.id === data.newsDetail.new_category_id,
                            )[0]?.name
                          : 'សកម្មភាពប្រចាំថ្ងៃ',
                      }}
                      ref={node => (categoryInput = node)}
                      value={newsCategory}
                      onChange={(e: any) => setNewsCategory(e)}
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
                              layout="responsive"
                              src={
                                logData?.user?.profile_picture
                                  ? parseImageUrl(logData?.user?.profile_picture, '244x244')
                                  : parseImageUrl('/user-placeholder-image.jpeg', '244x244')
                              }
                              width="250px"
                              height="250px"
                              alt=""
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
                      <div className="scrollbox">
                        <Table hover responsive className="m-b-5">
                          <tbody>{renderNewsLogs}</tbody>
                        </Table>
                        <CustomPagination
                          total={data?.activityLogsNews?.pagination?.total}
                          currentPage={data?.activityLogsNews?.pagination?.current}
                          size={data?.activityLogsNews?.pagination?.size}
                          limit={10}
                        />
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
