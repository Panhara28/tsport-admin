import { useRouter } from 'next/router';
import { Card, Col, Container, Row } from 'react-bootstrap';
import React from 'react';
import Layout from '../../../../../components/VerticalLayout';
import { Breadcrumb } from '../../../../../components/Common/Breadcrumb';
import Image from 'next/image';
import styles from './statistics.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faFile, faFileExport, faFileImport, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CardBody } from 'reactstrap';

export function GDCEStatisticsScreen() {
  const router = useRouter();

  const onHandleCommercialType = (e: any, type?: string) => {
    e?.preventDefault();

    router.push(`/mochub/websites/${router?.query?.id}/cms/statistics/${type === 'Imports' ? 'imports' : 'exports'}`);
  };

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="GDCE Statistics" />
          <hr />
          <Row>
            <Col md={6} xl={3}>
              <a href={`/mochub/websites/${router?.query?.id}/cms/statistics/gdce/overview`}>
                <Card>
                  <CardBody>
                    <div className="float-end mt-2">
                      <FontAwesomeIcon icon={faFile} style={{ fontSize: '36px' }} color="#3867D6" />
                    </div>
                    <div>
                      <h4 className="mb-1 mt-1">
                        <span></span>
                      </h4>
                      <p className="text-muted mb-0" style={{ fontSize: '18px', fontWeight: 600 }}>
                        Overview
                      </p>
                    </div>
                    <p className="text-muted mt-3 mb-0">
                      <span className={'text-' + 'pimary' + ' me-1'}>
                        <FontAwesomeIcon icon={faPlusCircle} style={{ fontSize: '26px' }} color="#3867D6" />
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </a>
            </Col>

            <Col md={6} xl={3}>
              <a href={`/mochub/websites/${router?.query?.id}/cms/statistics/gdce/imports`}>
                <Card>
                  <CardBody>
                    <div className="float-end mt-2">
                      <FontAwesomeIcon icon={faFileImport} style={{ fontSize: '36px' }} color="#3867D6" />
                    </div>
                    <div>
                      <h4 className="mb-1 mt-1">
                        <span></span>
                      </h4>
                      <p className="text-muted mb-0" style={{ fontSize: '18px', fontWeight: 600 }}>
                        Upload Imports
                      </p>
                    </div>
                    <p className="text-muted mt-3 mb-0">
                      <span className={'text-' + 'pimary' + ' me-1'}>
                        <FontAwesomeIcon icon={faPlusCircle} style={{ fontSize: '26px' }} color="#3867D6" />
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </a>
            </Col>

            <Col md={6} xl={3}>
              <a href={`/mochub/websites/${router?.query?.id}/cms/statistics/gdce/exports`}>
                <Card>
                  <CardBody>
                    <div className="float-end mt-2">
                      <FontAwesomeIcon icon={faFileExport} style={{ fontSize: '36px' }} color="#3867D6" />
                    </div>
                    <div>
                      <h4 className="mb-1 mt-1">
                        <span></span>
                      </h4>
                      <p className="text-muted mb-0" style={{ fontSize: '18px', fontWeight: 600 }}>
                        Upload Exports
                      </p>
                    </div>
                    <p className="text-muted mt-3 mb-0">
                      <span className={'text-' + 'pimary' + ' me-1'}>
                        <FontAwesomeIcon icon={faPlusCircle} style={{ fontSize: '26px' }} color="#3867D6" />
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </a>
            </Col>

            <Col md={6} xl={3}>
              <a href={`/mochub/websites/${router?.query?.id}/cms/statistics/gdce/reports`}>
                <Card>
                  <CardBody>
                    <div className="float-end mt-2">
                      <FontAwesomeIcon icon={faFile} style={{ fontSize: '36px' }} color="#3867D6" />
                    </div>
                    <div>
                      <h4 className="mb-1 mt-1">
                        <span></span>
                      </h4>
                      <p className="text-muted mb-0" style={{ fontSize: '18px', fontWeight: 600 }}>
                        Reports
                      </p>
                    </div>
                    <p className="text-muted mt-3 mb-0">
                      <span className={'text-' + 'pimary' + ' me-1'}>
                        <FontAwesomeIcon icon={faPlusCircle} style={{ fontSize: '26px' }} color="#3867D6" />
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
