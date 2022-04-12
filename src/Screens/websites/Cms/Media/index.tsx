import { gql, useMutation, useQuery } from '@apollo/client';
import { faAngleLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { Container } from 'reactstrap';
import { Breadcrumb } from '../../../../components/Common/Breadcrumb';
import Layout from '../../../../components/VerticalLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import style from './media.module.scss';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const QUERY = gql`
  query mediaList($websiteId: Int!, $pagination: PaginationInput) {
    mediaList(websiteId: $websiteId, pagination: $pagination) {
      data {
        id
        image_url
      }
    }
  }
`;

const MUTATION = gql`
  mutation removeMedia($websiteId: Int!, $mediaId: Int!, $thumbnail: String!) {
    removeMedia(websiteId: $websiteId, mediaId: $mediaId, thumbnail: $thumbnail)
  }
`;

export function MediaListScreen() {
  const router = useRouter();
  const [lgShow, setLgShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [removeMediaId, setRemoveMedia] = useState<number | undefined>(undefined);

  const [removeMedia] = useMutation(MUTATION, {
    onCompleted: (data: any) => {
      if (data.removeMedia) {
        toastr.success('Save Draft');
        setLgShow(false);
      }
    },
    refetchQueries: ['mediaList'],
  });

  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId: Number(router.query.id),
      pagination: {
        page: 1,
        size: 10,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading || !data) return <div>Loading...</div>;

  const onRemoveMedia = (mediaId: number | undefined, thumbnail: string | undefined) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        removeMedia({
          variables: {
            websiteId: Number(router.query.id),
            mediaId,
            thumbnail,
          },
          refetchQueries: ['mediaList'],
        });
        Swal.fire('Deleted!', 'Your image has been deleted.', 'success');
      }
    });
  };

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Media Library" />
          <hr />
          <Row>
            <Col md={12}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link href={`/mochub/websites/${router.query.id}/media/create`}>
                  <a className="btn btn-primary">
                    <FontAwesomeIcon icon={faPlus} /> Add New
                  </a>
                </Link>
                <Link href="#">
                  <a className="btn btn-danger" style={{ marginLeft: 10 }} onClick={() => router.back()}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Back
                  </a>
                </Link>
              </div>
              <Card className="mt-3">
                <CardBody>
                  <Row>
                    <Col md={2}>
                      <Select
                        options={[
                          { label: 'All media items', value: 'all media items' },
                          { label: 'Images', value: 'images' },
                          { label: 'Files', value: 'files' },
                        ]}
                        placeholder="All media items"
                      />
                    </Col>
                    <Col md={2}>
                      <Select
                        options={[
                          { label: 'All dates', value: 'all dates' },
                          { label: 'April 2022', value: 'April 2022' },
                          { label: 'March 2022', value: 'March 2022' },
                        ]}
                        placeholder="All dates"
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    {data.mediaList.data.map((item: any) => {
                      return (
                        <Col
                          md={2}
                          className={`mb-3`}
                          onClick={() => {
                            setLgShow(true);
                            setSelectedImage(item.image_url);
                            setRemoveMedia(item.id);
                          }}
                        >
                          <Image src={item.image_url} alt="" layout="responsive" width={150} height={150} />
                        </Col>
                      );
                    })}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">Attachment details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={8}>
                  {selectedImage ? (
                    <div style={{ width: '100%', height: 'auto' }}>
                      <Image src={selectedImage} alt="" layout="responsive" width={1280} height={720} />
                    </div>
                  ) : (
                    ''
                  )}
                </Col>
                <Col md={4}>
                  <Card>
                    <CardBody>
                      <div className={style.selectedImageInfo}>
                        <p>Uploaded on: April 11, 2022</p>
                        <p>Uploaded by: panhara</p>
                        <p>File name: minister-2.jpg</p>
                        <p>File type: image/jpeg</p>
                        <p>File size: 331 KB</p>
                        <p>Dimensions: 2048 by 1365 pixels</p>
                      </div>
                      <hr />
                      <p className="text-danger mt-2" onClick={() => onRemoveMedia(removeMediaId, selectedImage)}>
                        Delete permanently
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </Layout>
  );
}
