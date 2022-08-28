/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

//i18n
import SidebarContent from './SidebarContent';

import logoSm from '../../assets/images/logo-sm.png';
import logoDark from '../../assets/images/logo-dark.png';
import logoLight from '../../assets/images/logo-light.png';
import Link from 'next/link';
import { Aside } from './Aside';

type Props = {
  theme: any;
  type: any;
  isMobile: any;
};

const Sidebar = (props: Props) => {
  function tToggle() {
    let body = document.body;
    body.classList.toggle('vertical-collpsed');
    body.classList.toggle('sidebar-enable');
  }

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box"></div>
        <Aside />
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state: any) => {
  return {
    layout: state.Layout,
  };
};
export default connect(mapStatetoProps, {})(Sidebar);
