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

export const Aside = ({ collapsed, rtl, toggled, handleToggleSidebar }: any) => {
  const router = useRouter();
  const { me } = useContext(AuthContext);

  let checkUserHavePermissionForSiteBar;

  if (me.roleName == 'Site Administrator') {
    checkUserHavePermissionForSiteBar = (
      <>
        <Menu subMenuBullets={true} iconShape="circle">
          <SubMenu title="General Departments" icon={<FontAwesomeIcon icon={faLandmark} />}>
            <Link href={`/hr/general-departments/create`}>
              <a>
                <MenuItem>Create General Department</MenuItem>
              </a>
            </Link>
            <Link href={`/hr/general-departments`}>
              <a>
                <MenuItem>All</MenuItem>
              </a>
            </Link>
          </SubMenu>
        </Menu>
        <Menu subMenuBullets={true} iconShape="circle">
          <SubMenu title="Departments" icon={<FontAwesomeIcon icon={faHouseUser} />}>
            <Link href={`/hr/departments/create`}>
              <a>
                <MenuItem>Create Department</MenuItem>
              </a>
            </Link>
            <Link href={`/hr/departments`}>
              <a>
                <MenuItem>All</MenuItem>
              </a>
            </Link>
          </SubMenu>
        </Menu>
        <Menu subMenuBullets={true} iconShape="circle">
          <SubMenu title="Offices" icon={<FontAwesomeIcon icon={faNetworkWired} />}>
            <Link href={`/hr/offices/create`}>
              <a>
                <MenuItem>Create Office</MenuItem>
              </a>
            </Link>
            <Link href={`/hr/offices`}>
              <a>
                <MenuItem>All</MenuItem>
              </a>
            </Link>
          </SubMenu>
        </Menu>
        <Menu subMenuBullets={true} iconShape="circle">
          <SubMenu title="Officer management" icon={<FontAwesomeIcon icon={faUsers} />}>
            <Link href={`/hr/officers/create`}>
              <a>
                <MenuItem>Create Officer</MenuItem>
              </a>
            </Link>
            <Link href={`/hr/officers`}>
              <a>
                <MenuItem>Officer List</MenuItem>
              </a>
            </Link>
          </SubMenu>
        </Menu>
        <Menu iconShape="circle">
          <Link href="/hr/reports/search">
            <a>
              <MenuItem icon={<FontAwesomeIcon icon={faInfo} />}>Report</MenuItem>
            </a>
          </Link>
        </Menu>
        <Menu subMenuBullets={true} iconShape="circle">
          <SubMenu title="Settings" icon={<FontAwesomeIcon icon={faCog} />}>
            <Link href={`/hr/users/create`}>
              <a>
                <MenuItem>Add user</MenuItem>
              </a>
            </Link>
            <Link href={`/hr/users/`}>
              <a>
                <MenuItem>User list</MenuItem>
              </a>
            </Link>
            <Link href={`/hr/users/`}>
              <a>
                <MenuItem>Activity Log</MenuItem>
              </a>
            </Link>
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
        <Menu iconShape="circle">
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
