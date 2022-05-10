import { gql, useMutation, useQuery } from '@apollo/client';
import { Col, Row, Card } from 'react-bootstrap';
import Image from 'next/image';
import { useState } from 'react';
import style from './media.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from 'next/router';
import { RenderFileExtensionType } from './RenderExtensionType';
import { RenderExtensionTypeImageInfo } from './RenderExtensionTypeImageInfo';

const QUERY = gql`
  query mediaList($websiteId: Int!, $pagination: PaginationInput) {
    mediaList(websiteId: $websiteId, pagination: $pagination) {
      data {
        id
        image_url
        upload_storage
        mimetype
        created_at
        width
        height
        user {
          fullname
        }
      }
    }
  }
`;

const MUTATION = gql`
  mutation removeMedia($websiteId: Int!, $mediaId: Int!, $thumbnail: String!) {
    removeMedia(websiteId: $websiteId, mediaId: $mediaId, thumbnail: $thumbnail)
  }
`;

type Props = {
  websiteId: number;
  setSelectedImage?: any;
  firstFeaturedImage?: any;
  setFirstFeaturedImage?: any;
  setSelectImage?: any;
  selectImage?: any;
  selectedImage?: any;
};

export function MediaListByWebsite({
  websiteId,
  setSelectedImage,
  firstFeaturedImage,
  setFirstFeaturedImage,
  setSelectImage,
  selectImage,
  selectedImage,
}: Props) {
  const router = useRouter();
  const [removeMediaId, setRemoveMedia] = useState<number | undefined>(undefined);
  const [removeMedia] = useMutation(MUTATION, {
    onCompleted: data => {
      if (data.removeMedia) {
        setSelectImage(undefined);
        toastr.success('Save Draft');
      }
    },
  });
  const { data, loading } = useQuery(QUERY, {
    variables: {
      websiteId,
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
            websiteId,
            mediaId,
            thumbnail,
          },
          refetchQueries: ['mediaList'],
        });
        Swal.fire('Deleted!', 'Your image has been deleted.', 'success');
      }
    });
  };

  const uploadStorage = Number(selectedImage?.uploadStorage) * 1024;
  const fileName = selectedImage && selectedImage?.featureImage?.split('/')[4];
  const fileWord = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  let convertFileWord;
  if (selectImage?.mimetype === fileWord) {
    convertFileWord = 'application/word';
  } else {
    convertFileWord = selectImage?.mimetype;
  }

  console.log('selectedImage', selectedImage);

  return (
    <>
      <Row>
        <Col md={9}>
          <Row>
            {data.mediaList.data.map((item: any) => {
              const fileWord = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
              let convertFileWord;
              if (item?.mimetype === fileWord) {
                convertFileWord = 'application/word';
              }
              const renderBackgroundForFile =
                item?.mimetype === 'application/pdf' ||
                convertFileWord === 'application/word' ||
                item?.mimetype === 'text/csv'
                  ? '#eee'
                  : 'none';

              return (
                <Col
                  md={2}
                  onClick={() => {
                    setSelectImage({
                      featureImage: item.image_url,
                      createdAt: item.created_at,
                      fullName: item.user.fullname,
                      mimetype: item.mimetype,
                      uploadStorage: item.upload_storage,
                      width: item.width,
                      height: item.height,
                    });
                    setSelectedImage({
                      featureImage: item.image_url,
                      createdAt: item.created_at,
                      fullName: item.user.fullname,
                      mimetype: item.mimetype,
                      uploadStorage: item.upload_storage,
                      width: item.width,
                      height: item.height,
                    });
                    setFirstFeaturedImage(undefined);
                    setRemoveMedia(item.id);
                  }}
                  className={`mb-3 ${
                    firstFeaturedImage === item.image_url
                      ? style.mocSelectedImage
                      : selectImage === item.image_url
                      ? style.mocSelectedImage
                      : ''
                  }`}
                  style={{
                    background: `${renderBackgroundForFile}`,
                    marginLeft: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                >
                  <RenderFileExtensionType item={item} />
                </Col>
              );
            })}
          </Row>
        </Col>
        {selectImage?.featureImage ? (
          <Col md={3}>
            <Card style={{ background: '#f6f7f7', border: '1px solid #f6f7f7', borderLeft: '2px solid #dcdcde' }}>
              <Card.Body>
                <Card.Title as="h6" style={{ fontSize: 14 }}>
                  ATTACHMENT DETAILS
                </Card.Title>
                <div
                  className="mb-3"
                  style={{
                    width: '100%',
                    height: '232px',
                    border: '1px solid #dee2e6',
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <RenderExtensionTypeImageInfo item={selectImage} />
                </div>
                <div className={style.selectedImageInfo}>
                  <p>Uploaded on: {selectedImage?.createdAt}</p>
                  <p>Uploaded by: {selectedImage?.fullName}</p>
                  <p>File name: {fileName}</p>
                  <p>File type: {convertFileWord}</p>
                  <p>File size: {uploadStorage.toFixed(0)}kb</p>
                  <p>
                    Dimensions: {selectedImage?.width} by {selectedImage?.height} pixels
                  </p>
                </div>

                <Link href={selectImage?.featureImage}>
                  <a target="_blank">
                    <FontAwesomeIcon icon={faEye} /> View
                  </a>
                </Link>
                <p className="text-danger mt-2" onClick={() => onRemoveMedia(removeMediaId, selectImage)}>
                  Delete permanently
                </p>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          ''
        )}
      </Row>
    </>
  );
}
