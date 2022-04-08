import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, BreadcrumbItem } from 'reactstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

export const Breadcrumb = (props: any) => {
  const router = useRouter();

  return (
    <Row>
      <Col className="col-12">
        <div className="page-title-box d-flex align-items-center justify-content-between">
          <h4 className="mb-0">{props.breadcrumbItem} </h4>

          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <BreadcrumbItem>
                <Link href="#">
                  <a>{props.title}</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <Link href="#">
                  <a>{props.breadcrumbItem}</a>
                </Link>
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  );
};

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
};
