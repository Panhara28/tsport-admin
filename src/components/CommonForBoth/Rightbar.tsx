/* eslint-disable @next/next/no-img-element */
import React from "react";
import PropTypes from "prop-types";
import { FormGroup } from "reactstrap";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
  changeTopbarTheme,
  showRightSidebarAction,
} from "../../store/actions";

//SimpleBar
import SimpleBar from "simplebar-react";

//constants
import {
  layoutTypes,
  layoutWidthTypes,
  leftSidebarTypes,
  leftSideBarThemeTypes,
} from "../../constants/layout";
import Link from "next/link";

const RightSidebar = (props: any) => {
  return (
    <React.Fragment>
      <div className="right-bar" id="right-bar">
        <SimpleBar style={{ height: "900px" }}>
          <div className="h-100">
            <div className="rightbar-title d-flex align-items-center px-3 py-4">
              <h5 className="m-0 me-2">Settings</h5>
              {/* <Link href="#">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    props.showRightSidebarAction(false);
                  }}
                  className="right-bar-toggle ms-auto"
                ></a>
                <i className="mdi mdi-close noti-icon" />
              </Link> */}
            </div>

            <hr className="my-0" />

            <div className="p-4">
              <div className="radio-toolbar">
                <span className="mb-2 d-block">Layouts</span>
                <input
                  type="radio"
                  id="radioVertical"
                  name="radioFruit"
                  value={layoutTypes.VERTICAL}
                  checked={props.layoutType === layoutTypes.VERTICAL}
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.changeLayout(e.target.value);
                    }
                  }}
                />
                <label htmlFor="radioVertical">Vertical</label>
                {"   "}
                <input
                  type="radio"
                  id="radioHorizontal"
                  name="radioFruit"
                  value={layoutTypes.HORIZONTAL}
                  checked={props.layoutType === layoutTypes.HORIZONTAL}
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.changeLayout(e.target.value);
                    }
                  }}
                />
                <label htmlFor="radioHorizontal">Horizontal</label>
              </div>

              <hr className="mt-1" />

              <div className="radio-toolbar">
                <span className="mb-2 d-block" id="radio-title">
                  Layout Width
                </span>
                <input
                  type="radio"
                  id="radioFluid"
                  name="radioWidth"
                  value={layoutWidthTypes.FLUID}
                  checked={props.layoutWidth === layoutWidthTypes.FLUID}
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.changeLayoutWidth(e.target.value);
                    }
                  }}
                />
                <label htmlFor="radioFluid">Fluid</label>
                {"   "}
                <input
                  type="radio"
                  id="radioBoxed"
                  name="radioWidth"
                  value={layoutWidthTypes.BOXED}
                  checked={props.layoutWidth === layoutWidthTypes.BOXED}
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.changeLayoutWidth(e.target.value);
                    }
                  }}
                />
                <label htmlFor="radioBoxed">Boxed</label>
              </div>

              <hr className="mt-1" />
              {props.layoutType === "vertical" ? (
                <React.Fragment>
                  <div className="radio-toolbar">
                    <span className="mb-2 d-block" id="radio-title">
                      Left Sidebar Type{" "}
                    </span>
                    <input
                      type="radio"
                      id="sidebarDefault"
                      name="sidebarType"
                      value={leftSidebarTypes.DEFAULT}
                      checked={
                        props.leftSideBarType === leftSidebarTypes.DEFAULT
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.changeSidebarType(e.target.value);
                        }
                      }}
                    />
                    <label htmlFor="sidebarDefault">Default</label>
                    {"   "}
                    <input
                      type="radio"
                      id="sidebarCompact"
                      name="sidebarType"
                      value={leftSidebarTypes.COMPACT}
                      checked={
                        props.leftSideBarType === leftSidebarTypes.COMPACT
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.changeSidebarType(e.target.value);
                        }
                      }}
                    />
                    <label htmlFor="sidebarCompact">Compact</label>
                    {"   "}
                    <input
                      type="radio"
                      id="sidebarIcon"
                      name="sidebarType"
                      value={leftSidebarTypes.ICON}
                      checked={props.leftSideBarType === leftSidebarTypes.ICON}
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.changeSidebarType(e.target.value);
                        }
                      }}
                    />
                    <label htmlFor="sidebarIcon">Icon</label>
                  </div>

                  <hr className="mt-1" />

                  <div className="radio-toolbar">
                    <span className="mb-2 d-block" id="radio-title">
                      Left Sidebar Color
                    </span>
                    <input
                      type="radio"
                      id="leftsidebarThemelight"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.LIGHT}
                      checked={
                        props.leftSideBarTheme === leftSideBarThemeTypes.LIGHT
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.changeSidebarTheme(e.target.value);
                        }
                      }}
                    />

                    <label htmlFor="leftsidebarThemelight">Light</label>
                    {"   "}
                    <input
                      type="radio"
                      id="leftsidebarThemedark"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.DARK}
                      checked={
                        props.leftSideBarTheme === leftSideBarThemeTypes.DARK
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.changeSidebarTheme(e.target.value);
                        }
                      }}
                    />

                    <label htmlFor="leftsidebarThemedark">Dark</label>
                    {"   "}
                    <input
                      type="radio"
                      id="leftsidebarThemecolored"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.COLORED}
                      checked={
                        props.leftSideBarTheme === leftSideBarThemeTypes.COLORED
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.changeSidebarTheme(e.target.value);
                        }
                      }}
                    />

                    <label htmlFor="leftsidebarThemecolored">Colored</label>
                  </div>
                  <hr className="mt-1" />
                </React.Fragment>
              ) : null}

              <FormGroup>
                <span className="mb-2 d-block" id="radio-title">
                  Preloader
                </span>

                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input checkbox"
                    id="checkbox_1"
                    checked={props.isPreloader}
                    onChange={() => {
                      props.changePreloader(!props.isPreloader);
                    }}
                  />

                  <label className="form-check-label" htmlFor="checkbox_1">
                    Preloader
                  </label>
                </div>
              </FormGroup>
              <hr className="mt-1" />
              <h6 className="text-center">Choose Layouts</h6>

              <div className="mb-2">
                {/* <Link href="minible-v-light.react.themesbrand.com">
                  <a target="_blank">
                    <img src={""} className="img-fluid img-thumbnail" alt="" />
                  </a>
                </Link> */}
              </div>

              <div className="mb-2">
                {/* <Link href="minible-v-dark.react.themesbrand.com">
                  <a target="_blank">
                    <img src={""} className="img-fluid img-thumbnail" alt="" />
                  </a>
                </Link> */}
              </div>

              <div className="mb-2">
                {/* <Link href="minible-v-rtl.react.themesbrand.com">
                  <a target="_blank">
                    <img src={""} className="img-fluid img-thumbnail" alt="" />
                  </a>
                </Link> */}
              </div>

              {/* <Link href="1.envato.market/minible-react">
                <a className="btn btn-primary btn-block mt-3" target="_blank">
                  <i className="mdi mdi-cart mr-1" /> Purchase Now
                </a>
              </Link> */}
            </div>
          </div>
        </SimpleBar>
      </div>
      <div className="rightbar-overlay" />
    </React.Fragment>
  );
};

RightSidebar.propTypes = {
  changeLayout: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changePreloader: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  isPreloader: PropTypes.any,
  layoutType: PropTypes.any,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  topbarTheme: PropTypes.any,
};

const mapStateToProps = (state: any) => {
  return { ...state.Layout };
};

export default connect(mapStateToProps, {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeLayoutWidth,
  changeTopbarTheme,
  changePreloader,
  showRightSidebarAction,
})(RightSidebar);
