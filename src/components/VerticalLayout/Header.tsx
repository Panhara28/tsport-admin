/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import React, { useState } from "react";

import { connect } from "react-redux";
import { Form, Input, Button, Row, Col } from "reactstrap";
// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown

import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

// import images
import github from "../../assets/images/brands/github.png";
import bitbucket from "../../assets/images/brands/bitbucket.png";
import dribbble from "../../assets/images/brands/dribbble.png";
import dropbox from "../../assets/images/brands/dropbox.png";
import mail_chimp from "../../assets/images/brands/mail_chimp.png";
import slack from "../../assets/images/brands/slack.png";

//i18n

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";
import Link from "next/link";

type Props = {
  toggleMenuCallback: any;
  showRightSidebarAction: any;
  showRightSidebar: any;
};

const Header = (props: Props) => {
  const [search, setsearch] = useState(false);
  const [socialDrp, setsocialDrp] = useState(false);
  var document: any = process.browser && window.document;

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document["mozFullScreenElement"] &&
      !document["webkitFullscreenElement"]
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement["mozRequestFullScreen"]) {
        document.documentElement.mozRequestFullScreen();
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");
  }
  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              {/* <Link href="/">
                <a className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={""} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={""} alt="" height="20" />
                  </span>
                </a>
              </Link> */}

              {/* <Link href="/">
                <a className="logo logo-light">
                  <span className="logo-sm">
                    <img src={""} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={""} alt="" height="20" />
                  </span>
                </a>
              </Link> */}
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>

            <Form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input type="text" className="form-control" placeholder="" />
                <span className="uil-search"></span>
              </div>
            </Form>
          </div>

          <div className="d-flex">
            <Dropdown
              className="d-inline-block d-lg-none ms-2"
              onClick={() => {
                setsearch(!search);
              }}
              type="button"
            >
              <DropdownToggle
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown"
                tag="button"
              >
                {" "}
                <i className="uil-search" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                <Form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <Button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"></i>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              className="d-none d-lg-inline-block ms-1"
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp);
              }}
            >
              <DropdownToggle
                className="btn header-item noti-icon waves-effect"
                tag="button"
              >
                <i className="uil-apps"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-lg dropdown-menu-end" end>
                <div className="px-lg-2">
                  <Row className="g-0">
                    <Col>
                      {/* <Link href="/">
                        <a className="dropdown-icon-item"></a>
                        <img src={""} alt="Github" />
                        <span>GitHub</span>
                      </Link> */}
                    </Col>
                  </Row>

                  <Row className="g-0">
                    <Col>
                      {/* <Link href="">
                        <a className="dropdown-icon-item">
                          <img src={""} alt="dropbox" />
                          <span>Dropbox</span>
                        </a>
                      </Link> */}
                    </Col>
                    <Col>
                      {/* <Link href="#">
                        <a className="dropdown-icon-item">
                          <img src={""} alt="mail_chimp" />
                          <span>Mail Chimp</span>
                        </a>
                      </Link> */}
                    </Col>
                    <Col>
                      {/* <Link href="#">
                        <a className="dropdown-icon-item">
                          <img src={""} alt="slack" />
                          <span>Slack</span>
                        </a>
                      </Link> */}
                    </Col>
                  </Row>
                </div>
              </DropdownMenu>
            </Dropdown>

            <Dropdown className="d-none d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon waves-effect"
                data-toggle="fullscreen"
              >
                <i className="uil-minus-path"></i>
              </button>
            </Dropdown>

            <div
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar);
              }}
              className="dropdown d-inline-block"
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i className="uil-cog"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state: any) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(Header);
