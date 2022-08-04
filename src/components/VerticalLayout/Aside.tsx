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

  let checkUserHavePermissionForSiteBar;

  if (me.roleName == 'Site Administrator') {
    checkUserHavePermissionForSiteBar = (
      <>
        {me?.access?.generalDepartmentRead || me?.access?.generalDepartmentWrite ? (
          <Menu
            subMenuBullets={true}
            iconShape="circle"
            className={`${
              router?.pathname?.includes('/hr/general-departments') ? `${classes.activeNav} ${classes.format}` : ''
            }`}
          >
            <SubMenu title={t('common:sidebar.general_departments.title')} icon={<FontAwesomeIcon icon={faLandmark} />}>
              {me?.access?.generalDepartmentWrite ? (
                <li className={classes.list_style}>
                  <Link href={`/hr/general-departments/create`}>
                    <a>
                      <div className={classes.list_menu}>
                        <span className={subActiveNav(`/hr/general-departments/create`)}>
                          {t('common:sidebar.general_departments.create_general_department')}
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              ) : (
                undefined
              )}
              {me?.access?.generalDepartmentRead ? (
                <li className={classes.list_style}>
                  <Link href={`/hr/general-departments`}>
                    <a>
                      <div className={classes.list_menu}>
                        <span className={subActiveNav(`/hr/general-departments`)}>
                          {t('common:sidebar.general_departments.all')}
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              ) : (
                undefined
              )}
            </SubMenu>
          </Menu>
        ) : (
          undefined
        )}

        {me?.access?.departmentRead || me?.access?.departmentWrite ? (
          <Menu
            subMenuBullets={true}
            iconShape="circle"
            className={`${router?.pathname?.includes('/hr/departments') ? `${classes.activeNav}` : ''}`}
          >
            <SubMenu title={t('common:sidebar.departments.title')} icon={<FontAwesomeIcon icon={faHouseUser} />}>
              {me?.access?.departmentWrite ? (
                <li className={classes.list_style}>
                  <Link href={`/hr/departments/create`}>
                    <a>
                      <div className={classes.list_menu}>
                        <span className={subActiveNav(`/hr/departments/create`)}>
                          {t('common:sidebar.departments.create_department')}
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              ) : (
                undefined
              )}
              {me?.access?.departmentRead ? (
                <li className={classes.list_style}>
                  <Link href={`/hr/departments`}>
                    <a>
                      <div className={classes.list_menu}>
                        <span className={subActiveNav(`/hr/departments`)}>{t('common:sidebar.departments.all')}</span>
                      </div>
                    </a>
                  </Link>
                </li>
              ) : (
                undefined
              )}
            </SubMenu>
          </Menu>
        ) : (
          undefined
        )}

        {me?.access?.officeRead || me?.access?.officeWrite ? (
          <Menu
            subMenuBullets={true}
            iconShape="circle"
            className={`${router?.pathname?.includes('/hr/offices') ? `${classes.activeNav}` : ''}`}
          >
            <SubMenu title={t('common:sidebar.offices.title')} icon={<FontAwesomeIcon icon={faNetworkWired} />}>
              {me?.access?.officeWrite ? (
                <li className={classes.list_style}>
                  <Link href={`/hr/offices/create`}>
                    <a className={isActive(`/hr/offices/create`)}>
                      <div className={classes.list_menu}>
                        <span className={subActiveNav(`/hr/offices/create`)}>
                          {t('common:sidebar.offices.create_office')}
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              ) : (
                undefined
              )}
              {me?.access?.officeRead ? (
                <li className={classes.list_style}>
                  <Link href={`/hr/offices`}>
                    <a className={isActive(`/hr/offices`)}>
                      <div className={classes.list_menu}>
                        <span className={subActiveNav(`/hr/offices`)}>{t('common:sidebar.offices.all')}</span>
                      </div>
                    </a>
                  </Link>
                </li>
              ) : (
                undefined
              )}
            </SubMenu>
          </Menu>
        ) : (
          undefined
        )}

        {me?.access?.officerRead || me?.access?.officerWrite ? (
          <Menu
            subMenuBullets={true}
            iconShape="circle"
            className={`${router?.pathname?.includes('/hr/officers') ? `${classes.activeNav}` : ''}`}
          >
            <SubMenu title={t('common:sidebar.officer_management.title')} icon={<FontAwesomeIcon icon={faUsers} />}>
              {me?.access?.officerWrite ? (
                <li className={classes.list_style}>
                  <Link href={`/hr/officers/create`}>
                    <a className={isActive(`/hr/officers/create`)}>
                      <div className={classes.list_menu}>
                        <span className={subActiveNav(`/hr/officers/create`)}>
                          {t('common:sidebar.officer_management.create_officer')}
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              ) : (
                undefined
              )}
              {me?.access?.officerRead ? (
                <li className={classes.list_style}>
                  <Link href={`/hr/officers`}>
                    <a className={isActive(`/hr/officers`)}>
                      <div className={classes.list_menu}>
                        <span className={subActiveNav(`/hr/officers`)}>
                          {t('common:sidebar.officer_management.officer_list')}
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              ) : (
                undefined
              )}
            </SubMenu>
          </Menu>
        ) : (
          undefined
        )}

        <Menu iconShape="circle" className={isActive(`/hr/reports/search`)}>
          <Link href="/hr/reports/search">
            <a>
              <MenuItem icon={<FontAwesomeIcon icon={faInfo} />}>{t('common:sidebar.report.title')}</MenuItem>
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
            <li className={classes.list_style}>
              <Link href={`/hr/activity-logs`}>
                <a className={isActive(`/hr/activity-logs`)}>
                  <div className={classes.list_menu}>
                    <span className={subActiveNav(`/hr/activity_logs`)}>
                      {t('common:sidebar.settings.activity_log')}
                    </span>
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
              <MenuItem icon={<FontAwesomeIcon icon={faGlobeAsia} />}>{t('common:sidebar.dashboard.title')}</MenuItem>
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
