/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { gql, useMutation } from "@apollo/client";
import { useToken } from "../../Authentication/TokenContext";

const MUTATION = gql`
  mutation signOut($token: String!) {
    signOut(token: $token)
  }
`;

export const ProfileMenu = (props) => {
  const [signOut] = useMutation(MUTATION, {
    onCompleted: (data) => {
      if (data.signOut) {
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

    localStorage.removeItem("token");
  };
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src="http://minible-v-light.react.themesbrand.com/static/media/avatar-4.b23e41d9.jpg"
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
            Chhouk Tit panhara
          </span>{" "}
          <FontAwesomeIcon
            icon={faAngleDown}
            className="d-none d-xl-inline-block font-size-15"
          />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            <FontAwesomeIcon
              icon={faUser}
              className="font-size-14 align-middle text-muted me-1"
            />{" "}
            Profile
          </DropdownItem>
          <div className="dropdown-divider" />
          <Link href="#">
            <a className="dropdown-item" onClick={onLogout}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className=" font-size-14 align-middle me-1 text-muted"
              />{" "}
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

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};
