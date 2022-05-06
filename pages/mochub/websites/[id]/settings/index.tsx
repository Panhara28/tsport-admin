import { gql, useQuery } from '@apollo/client';
import { faIcons, faImage, faToolbox, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import Notiflix from 'notiflix';
import { useContext, useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import AuthContext from '../../../../../src/components/Authentication/AuthContext';
import { Breadcrumb } from '../../../../../src/components/Common/Breadcrumb';
import XForm from '../../../../../src/components/Form/XForm';
import { CreateUpdateForm } from '../../../../../src/components/GraphQL/CreateUpdateForm';
import Layout from '../../../../../src/components/VerticalLayout';
import { WebsiteSettingSidebar } from '../../../../../src/Screens/websites/WebsiteSettingSidebar';
import Image from 'next/image';
import style from './setting.module.scss';
import { SignleImageUpload } from '../../../../../src/components/SignleImageUpload';
import { MediaListByWebsite } from '../../../../../src/components/Media/MediaListByWebsite';
import Select from 'react-select';
import { Label } from 'reactstrap';
import { faFacebook, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { parseImageUrl } from '../../../../../src/hook/parseImageUrl';

const QUERY = gql`
  query website($id: Int!) {
    website(id: $id) {
      id
      name
      description
    }
  }
`;

const MUTATION_CREATE = gql`
  mutation createWebsite($input: WebsiteInput) {
    createWebsite(input: $input)
  }
`;

const MUTATION_UPDATE = gql`
  mutation updateWebsite($id: Int!, $input: WebsiteInput) {
    updateWebsite(id: $id, input: $input)
  }
`;

function FormBody({ update, defaultValues }: any) {
  const [selectImage, setSelectImage] = useState(undefined);
  const [selectedImage, setSelectedImage]: any = useState(undefined);
  const [firstFeaturedImage, setFirstFeaturedImage]: any = useState(undefined);
  const [finaleSelected, setFinaleSelected]: any = useState(undefined);

  const [key, setKey] = useState('media');
  const [lgShow, setLgShow] = useState(false);
  const { me } = useContext(AuthContext);
  const [thumbnail, setThumbnail]: any = useState(undefined);
  const router = useRouter();
  const { data, loading } = useQuery(QUERY);

  const [name, setName] = useState(defaultValues?.name || '');
  const [description, setDescription] = useState(defaultValues?.description || '');
  const onSave = () => {
    update({
      name,
      description,
    });
  };

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

  return (
    <>
      <Form.Label className={`${style.label_theme}`}>Logo Image</Form.Label>
      <Row>
        <Col md={3}>
          <div className={`${style.icon_upload}`}>{renderFeaturedImage}</div>
        </Col>
      </Row>
      <XForm.Text label="Website name" value={name} onChange={e => setName(e.currentTarget.value)} />
      <XForm.TextArea label="Description" value={description} onChange={e => setDescription(e.currentTarget.value)} />
      <Form.Label className={`${style.label_theme}`}>Facebook</Form.Label>
      <div className={`${style.icon_container} d-flex`}>
        <div className={`${style.sub_icon}`}>
          <FontAwesomeIcon icon={faFacebook} className={`${style.facebookIcon}`} />
        </div>
        <div className={`${style.sub_link}`}>
          <XForm.Text
            placeholder="Input Link"
            // value={name}
            // onChange={e => setName(e.currentTarget.value)}
          />
        </div>
      </div>
      <Form.Label className={`${style.label_theme}`}>Telegram</Form.Label>
      <div className={`${style.icon_container} d-flex`}>
        <div className={`${style.sub_icon}`}>
          <FontAwesomeIcon icon={faTelegram} className={`${style.TelegramIcon}`} />
        </div>
        <div className={`${style.sub_link}`}>
          <XForm.Text
            placeholder="Input Link"
            // value={name}
            // onChange={e => setName(e.currentTarget.value)}
          />
        </div>
      </div>
      <Row>
        <Col md={12}></Col>
      </Row>
      <XForm.Footer>
        <XForm.Button onClick={onSave}>Save</XForm.Button>
      </XForm.Footer>

      <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
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
    </>
  );
}

export default function SettingPage() {
  const router = useRouter();
  const { me } = useContext(AuthContext);
  if (me.roleName !== 'Site Administrator') {
    router.push('/no-permission');
  }
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Website Setting" />
          <hr />
          <Row>
            <Col md={3} style={{ borderRight: '1px solid #ccc', height: '100vh' }}>
              <WebsiteSettingSidebar />
            </Col>
            <Col md={9}>
              <h6>Edit Website</h6>
              <CreateUpdateForm
                body={FormBody}
                update={MUTATION_UPDATE}
                create={MUTATION_CREATE}
                query={QUERY}
                id={Number(router.query.id)}
                createReturned={'/brand_list/list'}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
