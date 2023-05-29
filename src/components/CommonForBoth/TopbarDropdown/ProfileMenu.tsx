/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faArrowAltCircleLeft, faEdit, faKey } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';
import { useToken } from '../../Authentication/TokenContext';
import AuthContext from '../../Authentication/AuthContext';

const MUTATION = gql`
  mutation signOut($token: String!) {
    signOut(token: $token)
  }
`;

export const ProfileMenu = () => {
  const { me } = useContext(AuthContext);
  const [signOut] = useMutation(MUTATION, {
    onCompleted: data => {
      if (data.signOut) {
        localStorage.removeItem('token');
        window.location.reload();
      }
    },
  });

  const { token } = useToken();

  const onLogout = () => {
    signOut({
      variables: {
        token,
      },
    });
  };
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const renderProfilePicture = me.profilePicture ? me.profilePicture : '/userplacehoder.png';

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block">
        <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
          <img
            style={{ objectFit: 'cover' }}
            className="rounded-circle header-profile-user"
            src={renderProfilePicture}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{me.fullname}</span>{' '}
          <FontAwesomeIcon icon={faAngleDown} className="d-none d-xl-inline-block font-size-15" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <Link href={`/hr/profile`}>
            <a className="dropdown-item">
              <FontAwesomeIcon icon={faUser} className="font-size-14 align-middle text-muted me-1" /> Profile
            </a>
          </Link>
          <div className="dropdown-divider" />
          <Link href="/hr/profile/edit">
            <a className="dropdown-item">
              <FontAwesomeIcon icon={faEdit} className=" font-size-14 align-middle me-1 text-muted" />{' '}
              <span>Edit profile</span>
            </a>
          </Link>
          <div className="dropdown-divider" />
          <Link href="/hr/profile/change-password">
            <a className="dropdown-item">
              <FontAwesomeIcon icon={faKey} className=" font-size-14 align-middle me-1 text-muted" />{' '}
              <span>Change password</span>
            </a>
          </Link>
          <div className="dropdown-divider" />
          <Link href="#">
            <a className="dropdown-item" onClick={onLogout}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} className=" font-size-14 align-middle me-1 text-muted" />{' '}
              <span>Logout</span>
            </a>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state: any) => {
  const { error, success } = state.Profile;
  return { error, success };
};
