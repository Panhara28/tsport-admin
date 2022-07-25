/* eslint-disable @next/next/no-img-element */
import { faEdit, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useContext } from 'react';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { DropdownToggle } from 'reactstrap';
import { DropdownItem } from 'reactstrap';
import { DropdownMenu } from 'reactstrap';
import { UncontrolledDropdown } from 'reactstrap';
import { Card } from 'reactstrap';
import { Container } from 'reactstrap';
import AuthContext from '../../components/Authentication/AuthContext';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';

export function ProfileScreen() {
  const { me } = useContext(AuthContext);
  const renderProfilePicture = me.profilePicture ? me.profilePicture : '/userplacehoder.png';

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title={setting.title} breadcrumbItem="Profile" />
          <hr />
          <Row className="mb-4">
            <Col xl="4">
              <Card className="card h-100">
                <CardBody>
                  <div className="text-center">
                    <UncontrolledDropdown className="float-end">
                      <DropdownToggle tag="a" className="text-body font-size-16" caret>
                        <i className="uil uil-ellipsis-h"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem href="#">Edit</DropdownItem>
                        <DropdownItem href="#">Action</DropdownItem>
                        <DropdownItem href="#">Remove</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <div className="clearfix"></div>
                    <div>
                      <img src={renderProfilePicture} alt="" className="avatar-lg rounded-circle img-thumbnail" />
                    </div>
                    <h5 className="mt-3 mb-1">{me.fullname}</h5>
                    <p className="text-muted">Software Developer</p>

                    <div className="mt-4">
                      <Link href="/hr/profile/edit">
                        <button type="button" className="btn btn-primary btn-sm">
                          <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit Profile
                        </button>
                      </Link>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="text-muted">
                    <div className="table-responsive mt-4">
                      <div>
                        <p className="mb-1">Name :</p>
                        <h5 className="font-size-16">{me.fullname}</h5>
                      </div>
                      <div className="mt-4">
                        <p className="mb-1">Mobile :</p>
                        <h5 className="font-size-16">{me.phoneNumber}</h5>
                      </div>
                      <div className="mt-4">
                        <p className="mb-1">E-mail :</p>
                        <h5 className="font-size-16">{me.email}</h5>
                      </div>
                      {/* <div className="mt-4">
                        <p className="mb-1">Location :</p>
                        <h5 className="font-size-16" style={{ lineHeight: '24px' }}>
                          {me.contact_city_or_province ? (
                            <>
                              <b>ខេត្ត/ក្រុង:</b> me.contact_city_or_province
                            </>
                          ) : (
                            undefined
                          )}
                          {me.contact_district ? (
                            <>
                              , <b>ស្រុក/ខណ្ឌ:</b>
                              {me.contact_district}
                            </>
                          ) : (
                            undefined
                          )}
                          {me.contact_commune ? (
                            <>
                              , <b>ឃុំ/សង្កាត់: </b>
                              {me.contact_commune}
                            </>
                          ) : (
                            undefined
                          )}
                          {me.contact_village ? (
                            <>
                              , <b>ភូមិ: </b> {me.contact_village}
                            </>
                          ) : (
                            undefined
                          )}
                        </h5>
                      </div> */}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
