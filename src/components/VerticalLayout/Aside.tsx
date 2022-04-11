import { faCogs, faGlobeAsia } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';

export const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }: any) => {
  const router = useRouter();

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
        <Link href="/">
          <a>
            <Menu iconShape="circle">
              <MenuItem icon={<FontAwesomeIcon icon={faGlobeAsia} />}>Your website</MenuItem>
            </Menu>
          </a>
        </Link>
        {router.query.id ? (
          <Link href={`/mochub/websites/${router.query.id}/settings`}>
            <a>
              <Menu iconShape="circle">
                <MenuItem icon={<FontAwesomeIcon icon={faCogs} />}>Settings</MenuItem>
              </Menu>
            </a>
          </Link>
        ) : (
          ''
        )}

        <Menu>
          <SubMenu title="Sample" icon={<FontAwesomeIcon icon={faGlobeAsia} />}>
            <MenuItem>submenu 1</MenuItem>
            <MenuItem>submenu 2</MenuItem>
            <MenuItem>submenu 3</MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <span>Profile</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};
