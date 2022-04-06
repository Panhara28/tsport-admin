/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

//i18n
import SidebarContent from "./SidebarContent";

import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import Link from "next/link";

type Props = {
  theme: any
  type: any
  isMobile: any
}

const Sidebar = (props: Props) => {


  function tToggle() {
    var body = document.body;
    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");
  }

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link href="/" >
            <a className="logo logo-dark">
              <span className="logo-sm">
                <img src={""} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={""} alt="" height="20" />
              </span>
            </a>          
          </Link>

          <Link href="/">
            <a  className="logo logo-light">
            <span className="logo-sm">
              <img src={""} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={""} alt="" height="20" />
            </span>
            </a>           
          </Link>
        </div>
        <button
          onClick={() => {
            tToggle();
          }}
          type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn">
          <i className="fa fa-fw fa-bars"></i>
        </button>
        <div className="sidebar-menu-scroll">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state :any) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(Sidebar);