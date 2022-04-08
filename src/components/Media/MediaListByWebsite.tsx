import { gql, useQuery } from '@apollo/client';
import { Col, Row, Card } from 'react-bootstrap';
import Image from 'next/image';
import { useState } from 'react';
import style from './media.module.scss';
import Link from 'next/link';

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

type Props = {
  websiteId: number;
  setSelectedImage: any;
  firstFeaturedImage: any;
  setFirstFeaturedImage: any;
  setSelectImage?: any;
  selectImage?: any;
};

export function MediaListByWebsite({
  websiteId,
  setSelectedImage,
  firstFeaturedImage,
  setFirstFeaturedImage,
  setSelectImage,
  selectImage,
}: Props) {
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

  return (
    <>
      <Row>
        <Col md={9}>
          <Row>
            {data.mediaList.data.map((item: any) => {
              return (
                <Col
                  md={2}
                  onClick={() => {
                    setSelectImage(item.image_url);
                    setSelectedImage(item.image_url);
                    setFirstFeaturedImage(undefined);
                  }}
                  className={`mb-3 ${
                    firstFeaturedImage === item.image_url
                      ? style.mocSelectedImage
                      : selectImage === item.image_url
                      ? style.mocSelectedImage
                      : ''
                  }`}
                >
                  <Image src={item.image_url} alt="" layout="responsive" width={150} height={150} />
                </Col>
              );
            })}
          </Row>
        </Col>
        {selectImage ? (
          <Col md={3}>
            <Card style={{ background: '#f6f7f7', border: '1px solid #f6f7f7', borderLeft: '2px solid #dcdcde' }}>
              <Card.Body>
                <Card.Title as="h6" style={{ fontSize: 14 }}>
                  ATTACHMENT DETAILS
                </Card.Title>
                <div
                  className="mb-3"
                  style={{ width: '80%', height: 'auto', border: '1px solid #dee2e6', padding: 10 }}
                >
                  <Image src={selectImage} alt="" layout="responsive" width={100} height={100} />
                </div>
                <Link href={selectImage}>
                  <a target="_blank">{selectImage}</a>
                </Link>
                <p className="text-danger mt-2">Delete permanently</p>
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
