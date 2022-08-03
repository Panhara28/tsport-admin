import {
  faCog,
  faCogs,
  faGlobeAsia,
  faHome,
  faHouseUser,
  faImages,
  faInfo,
  faLandmark,
  faNetworkWired,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import AuthContext from '../Authentication/AuthContext';
import classes from './nav.module.scss';

export const Aside = ({ collapsed, rtl, toggled, handleToggleSidebar }: any) => {
  const router = useRouter();
  const { me } = useContext(AuthContext);
  const isActive = (r: any) => {
    if (r === router.asPath) {
      return `${classes.activeNav}`;
    } else {
      return ``;
    }
  };

  const subActiveNav = (r: any) => {
    if (r === router.asPath) {
      return `${classes.subActiveNav}`;
    } else {
      return ``;
    }
  };

  let checkUserHavePermissionForSiteBar;

  if (me.roleName == 'Site Administrator') {
    checkUserHavePermissionForSiteBar = (
      <>
        <Menu
          subMenuBullets={true}
          iconShape="circle"
          className={`${
            router?.pathname?.includes('/hr/general-departments') ? `${classes.activeNav} ${classes.format}` : ''
          }`}
        >
          <SubMenu title="General Departments" icon={<FontAwesomeIcon icon={faLandmark} />}>
            <li className={classes.list_style}>
              <Link href={`/hr/general-departments/create`}>
                <a>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/general-departments/create`)}>Create General Department</span>
                  </div>
                </a>
              </Link>
            </li>
            <li className={classes.list_style}>
              <Link href={`/hr/general-departments`}>
                <a>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/general-departments`)}>All</span>
                  </div>
                </a>
              </Link>
            </li>
          </SubMenu>
        </Menu>
        <Menu
          subMenuBullets={true}
          iconShape="circle"
          className={`${router?.pathname?.includes('/hr/departments') ? `${classes.activeNav}` : ''}`}
        >
          <SubMenu title="Departments" icon={<FontAwesomeIcon icon={faHouseUser} />}>
            <li className={classes.list_style}>
              <Link href={`/hr/departments/create`}>
                <a>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/departments/create`)}>Create Department</span>
                  </div>
                </a>
              </Link>
            </li>
            <li className={classes.list_style}>
              <Link href={`/hr/departments`}>
                <a>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/departments`)}>All</span>
                  </div>
                </a>
              </Link>
            </li>
          </SubMenu>
        </Menu>
        <Menu
          subMenuBullets={true}
          iconShape="circle"
          className={`${router?.pathname?.includes('/hr/offices') ? `${classes.activeNav}` : ''}`}
        >
          <SubMenu title="Offices" icon={<FontAwesomeIcon icon={faNetworkWired} />}>
            <li className={classes.list_style}>
              <Link href={`/hr/offices/create`}>
                <a className={isActive(`/hr/offices/create`)}>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/offices/create`)}>Create Office</span>
                  </div>
                </a>
              </Link>
            </li>
            <li className={classes.list_style}>
              <Link href={`/hr/offices`}>
                <a className={isActive(`/hr/offices`)}>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/offices`)}>All</span>
                  </div>
                </a>
              </Link>
            </li>
          </SubMenu>
        </Menu>
        <Menu
          subMenuBullets={true}
          iconShape="circle"
          className={`${router?.pathname?.includes('/hr/officers') ? `${classes.activeNav}` : ''}`}
        >
          <SubMenu title="Officer management" icon={<FontAwesomeIcon icon={faUsers} />}>
            <li className={classes.list_style}>
              <Link href={`/hr/officers/create`}>
                <a className={isActive(`/hr/officers/create`)}>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/officers/create`)}>Create Officer</span>
                  </div>
                </a>
              </Link>
            </li>
            <li className={classes.list_style}>
              <Link href={`/hr/officers`}>
                <a className={isActive(`/hr/officers`)}>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/officers`)}>Officer List</span>
                  </div>
                </a>
              </Link>
            </li>
          </SubMenu>
        </Menu>
        <Menu iconShape="circle" className={isActive(`/hr/reports/search`)}>
          <Link href="/hr/reports/search">
            <a>
              <MenuItem icon={<FontAwesomeIcon icon={faInfo} />}>Report</MenuItem>
            </a>
          </Link>
        </Menu>
        <Menu
          subMenuBullets={true}
          iconShape="circle"
          className={`${router?.pathname?.includes('/hr/users/create') ? `${classes.activeNav}` : ''}`}
        >
          <SubMenu title="Settings" icon={<FontAwesomeIcon icon={faCog} />}>
            <li className={classes.list_style}>
              <Link href={`/hr/users/create`}>
                <a className={isActive(`/hr/users/create`)}>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/users/create`)}>Add user</span>
                  </div>
                </a>
              </Link>
            </li>
            <li className={classes.list_style}>
              <Link href={`/hr/users`}>
                <a className={isActive(`/hr/users`)}>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/users`)}>User list</span>
                  </div>
                </a>
              </Link>
            </li>
            <li className={classes.list_style}>
              <Link href={`/hr/activity-logs`}>
                <a className={isActive(`/hr/activity-logs`)}>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/activity-logs`)}>Activity Log</span>
                  </div>
                </a>
              </Link>
            </li>
          </SubMenu>
        </Menu>
      </>
    );
  }

  return (
    <ProSidebar
      image={false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          Ministry Of Commerce
        </div>
      </SidebarHeader>

      <SidebarContent className="sidebar-content">
        <Menu iconShape="circle" className={isActive(`/`)}>
          <Link href="/">
            <a>
              <MenuItem icon={<FontAwesomeIcon icon={faGlobeAsia} />}>Dashboard</MenuItem>
            </a>
          </Link>
        </Menu>
        {checkUserHavePermissionForSiteBar}
      </SidebarContent>
      <SidebarFooter>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a href="#" target="_blank" className="sidebar-btn" rel="noopener noreferrer">
            <span>{new Date().getFullYear()} © Ministry Of Commerce.</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};
