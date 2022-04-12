import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Row } from 'reactstrap';
import { Card } from 'reactstrap';
import { Col } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../../../components/Common/Breadcrumb';
import { MediaListByWebsite } from '../../../../components/Media/MediaListByWebsite';
import { SignleImageUpload } from '../../../../components/SignleImageUpload';
import Layout from '../../../../components/VerticalLayout';
import style from './media.module.scss';

export function CreateMediaScreen() {
  const router = useRouter();
  const [selectImage, setSelectImage] = useState(undefined);
  const [firstFeaturedImage, setFirstFeaturedImage] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState(undefined);

  const [key, setKey] = useState('upload');
  const [thumbnail, setThumbnail]: any = useState(undefined);

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Upload new media" />
          <hr />
          <Row>
            <Col md={12}>
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
