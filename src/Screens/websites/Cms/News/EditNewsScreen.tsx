import { gql, useMutation, useQuery } from '@apollo/client';
import { faAngleLeft, faPaperPlane, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Layout } from '../../../../components/Layout';
import { StatusPageBagde } from '../../../../components/StatusPageBagde';
import { TransformDataEditorJS } from '../../../../libs/TransformDataEditorJs';
import Switch from 'react-switch';
import { RenderEditButton } from '../../../../components/RenderEditButton';
import { ReverseDataEditorJS } from '../../../../libs/ReverseDataEditorJs';
import { Title } from '../../../../components/Title';
import Link from 'next/link';
import style from './news.module.scss';
import FormEditor from '../../../../components/Editor/FormEditor';
import Select from 'react-select';
import { ComponentUpload } from '../../../../components/UploadComponent';
import AuthContext from '../../../../components/Authentication/AuthContext';
import Notiflix from 'notiflix';

const MUTATION = gql`
  mutation updateNews($id: Int!, $input: NewsInput, $websiteId: Int!) {
    updateNews(id: $id, input: $input, websiteId: $websiteId)
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
  }
`;

export function EditNewsScreen() {
  const { me } = useContext(AuthContext);

  const router = useRouter();
  const [thumbnail, setThumbnail]: any = useState(undefined);
  const [showLog, setShowLog] = useState(false);
  const [logData, setLogData] = useState(undefined);

  const { data, loading } = useQuery(PAGE_DETAIL, {
    variables: {
      id: Number(router.query.newsEditId),
      websiteId: Number(router.query.id),
    },
    onCompleted: data => {
      setThumbnail(data.newsDetail.thumbnail);
    },
  });
  const [updateNews] = useMutation(MUTATION, {
    onCompleted: data => {
      if (data.updateNews) {
        router.push(`/mochub/websites/${router.query.id}/cms/news/${router.query.newsEditId}/edit`);
      }
    },
    refetchQueries: ['newsDetail'],
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
      thumbnail: thumbnail?.singleUpload ? thumbnail?.singleUpload.url : data.newsDetail.thumbnail,
      summary: summaryInput.value,
      new_category_id: categoryInput?.select?.getValue()[0]?.value,
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

  const renderPublished =
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

  const accessPlugin = me.plugins.find((item: any) => item.slug === 'news');

  if (!accessPlugin.access.edit) {
    router.push(`/no-permission`);
  }

  return (
    <Layout>
      <Container>
        <Row className="mx-4 mt-4">
          <Col>
            <Title title="Edit News">
              <Link href={`/mochub/websites/${router.query.id}/cms/news`}>
                <a className="btn btn-danger mx-2">
                  <FontAwesomeIcon icon={faAngleLeft} /> Back
                </a>
              </Link>
            </Title>
          </Col>
        </Row>
        <Row className="mx-4 mt-4">
          <Col md={9}>
            {renderInReview}
            <Row className="mt-4">
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
            <Row className="mt-3">
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <FormEditor editDataKey="newsDataEdit" data={renderEditorJS} id={router.query.newsEditId} />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                {renderEditButton}
                {renderPublished}
                <h6>Example</h6>
                <hr />
                <Select
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
                />
                <h6 className="mt-3">Example</h6>
                <hr />
                <ComponentUpload
                  image={data.newsDetail.thumbnail === '' ? thumbnail?.singleUpload?.url : data.newsDetail.thumbnail}
                  setImage={setThumbnail}
                  width="100%"
                  height="200px"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
