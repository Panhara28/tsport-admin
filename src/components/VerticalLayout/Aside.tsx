import { faCogs, faGlobeAsia, faImages } from '@fortawesome/free-solid-svg-icons';
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
        <Menu iconShape="circle">
          <Link href="/">
            <a>
              <MenuItem icon={<FontAwesomeIcon icon={faGlobeAsia} />}>Your website</MenuItem>
            </a>
          </Link>
        </Menu>

        <Menu subMenuBullets={true} iconShape="circle">
          <SubMenu title="Media" icon={<FontAwesomeIcon icon={faImages} />}>
            <Link href={`/mochub/websites/${router.query.id}/media/create`}>
              <a>
                <MenuItem>Add media</MenuItem>
              </a>
            </Link>
            <Link href={`/mochub/websites/${router.query.id}/media`}>
              <a>
                <MenuItem>Library</MenuItem>
              </a>
            </Link>
          </SubMenu>
        </Menu>

        {router.query.id ? (
          <Menu iconShape="circle">
            <Link href={`/mochub/websites/${router.query.id}/settings`}>
              <a>
                <MenuItem icon={<FontAwesomeIcon icon={faCogs} />}>Settings</MenuItem>
              </a>
            </Link>
          </Menu>
        ) : (
          ''
        )}
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
