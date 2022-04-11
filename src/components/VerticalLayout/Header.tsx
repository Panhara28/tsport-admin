/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { showRightSidebarAction, toggleLeftmenu, changeSidebarType } from '../../store/actions';
import { ProfileMenu } from '../CommonForBoth/TopbarDropdown/ProfileMenu';
import { faArrowsAlt, faSquareFull } from '@fortawesome/free-solid-svg-icons';

type Props = {
  toggleMenuCallback: any;
  showRightSidebarAction: any;
  showRightSidebar: any;
};

const Header = (props: Props) => {
  const [search, setsearch] = useState(false);
  const [socialDrp, setsocialDrp] = useState(false);
  let document: any = process.browser && window.document;

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document['mozFullScreenElement'] &&
      !document['webkitFullscreenElement']
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement['mozRequestFullScreen']) {
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
    let body = document.body;
    body.classList.toggle('vertical-collpsed');
    body.classList.toggle('sidebar-enable');
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
            <Dropdown className="d-none d-lg-inline-block ms-1">
              <button
                type="button"
                title="Fullscreen"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon waves-effect"
                data-toggle="fullscreen"
              >
                <FontAwesomeIcon icon={faArrowsAlt} />
              </button>
            </Dropdown>
            <ProfileMenu />
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
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(Header);
