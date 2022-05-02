/* eslint-disable @next/next/no-img-element */
import { faEdit, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import AuthContext from '../../../components/Authentication/AuthContext';
import { Breadcrumb } from '../../../components/Common/Breadcrumb';
import Layout from '../../../components/VerticalLayout';

export function ProfileScreen() {
  const { me } = useContext(AuthContext);
  const renderProfilePicture = me.profilePicture ? me.profilePicture : '/userplacehoder.png';
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Ministry Of Commerce" breadcrumbItem="Profile" />
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
                      <button type="button" className="btn btn-primary btn-sm">
                        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit Profile
                      </button>
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
                        <h5 className="font-size-16">012-234-5678</h5>
                      </div>
                      <div className="mt-4">
                        <p className="mb-1">E-mail :</p>
                        <h5 className="font-size-16">marcus@minible.com</h5>
                      </div>
                      <div className="mt-4">
                        <p className="mb-1">Location :</p>
                        <h5 className="font-size-16">California, United States</h5>
                      </div>
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
