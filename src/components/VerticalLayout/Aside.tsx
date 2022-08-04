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
import useTranslation from 'next-translate/useTranslation';

export const Aside = ({ collapsed, rtl, toggled, handleToggleSidebar }: any) => {
  const router = useRouter();
  const { t } = useTranslation();
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
              <MenuItem icon={<FontAwesomeIcon icon={faGlobeAsia} />}>{t('common:sidebar.dashboard.title')}</MenuItem>
            </a>
          </Link>
        </Menu>
        <Menu
          subMenuBullets={true}
          iconShape="circle"
          className={`${router?.pathname?.includes('/hr/users/create') ? `${classes.activeNav}` : ''}`}
        >
          <SubMenu title={t('common:sidebar.settings.title')} icon={<FontAwesomeIcon icon={faCog} />}>
            <li className={classes.list_style}>
              <Link href={`/hr/users/create`}>
                <a className={isActive(`/hr/users/create`)}>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/users/create`)}>{t('common:sidebar.settings.add_user')}</span>
                  </div>
                </a>
              </Link>
            </li>
            <li className={classes.list_style}>
              <Link href={`/hr/users`}>
                <a className={isActive(`/hr/users`)}>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/users`)}>{t('common:sidebar.settings.user_list')}</span>
                  </div>
                </a>
              </Link>
            </li>
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
          <a href="#" target="_blank" className="sidebar-btn" rel="noopener noreferrer">
            <span>{new Date().getFullYear()} © Ministry Of Commerce.</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};
