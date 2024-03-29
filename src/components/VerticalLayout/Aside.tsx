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
import React, { useContext, useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import AuthContext from '../Authentication/AuthContext';
import classes from './nav.module.scss';
import useTranslation from 'next-translate/useTranslation';
import { MenuItem as men, MenuItems } from '../../libs/MenuItem';

export const Aside = ({ collapsed, rtl, toggled, handleToggleSidebar }: any) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { me } = useContext(AuthContext);
  const [tog, setTog] = useState(false);
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

  let menu: men[] = [...MenuItems];

  if (me.roleId !== 1) {
    menu = MenuItems.filter(x => x.id !== 'setting');
  }

  return (
    <ProSidebar
      image={false}
      rtl={rtl}
      collapsed={collapsed}
      // toggled={window.innerWidth < 900 ? tog : toggled}
      toggled={true}
      breakPoint="sm"
      onToggle={() => {
        handleToggleSidebar();
        setTog(!tog);
      }}
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
          T-Sport cambodia
        </div>
      </SidebarHeader>

      <SidebarContent className="sidebar-content">
        {menu.map(item => {
          return (
            <Menu iconShape="circle" className={isActive(item.link)} key={item.title}>
              {!!item.subs ? (
                <SubMenu title={t(item.title)} icon={<FontAwesomeIcon icon={item.icon} />}>
                  {item.subs.map(x => {
                    return (
                      <li key={x.title} className={classes.list_style}>
                        <Link href={x.link}>
                          <a className={isActive(x.link)}>
                            <div className={classes.list_menu}>
                              <span className={subActiveNav(x.link)}>{t(x.title)}</span>
                            </div>
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </SubMenu>
              ) : (
                <Link href={item.link}>
                  <a>
                    <MenuItem icon={<FontAwesomeIcon icon={item.icon} />}>{t(item.title)}</MenuItem>
                  </a>
                </Link>
              )}
            </Menu>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a href="#" target="_blank" className="sidebar-btn" rel="noopener noreferrer">
            <span>{new Date().getFullYear()} © Codehub.</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};
