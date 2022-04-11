import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import AuthContext from '../../components/Authentication/AuthContext';
import style from './create-websites.module.scss';

export function WebsiteSettingSidebar() {
  const router = useRouter();
  const { me } = useContext(AuthContext);
  const renderSiteAdminCollaboration =
    me.roleName === 'Site Administrator' ? (
      <>
        <div className="mt-4"></div>
        <h6 className="px-2" style={{ fontSize: 12 }}>
          Collaboration
        </h6>
        <ListGroup>
          <Link href={`/mochub/websites/${router.query.id}/people`}>
            <a
              className={
                style.mocSettingList +
                ` ${router.asPath === `/mochub/websites/${router.query.id}/people` ? style.active : ''}`
              }
            >
              <ListGroup.Item className="reset-list-group-item">People</ListGroup.Item>
            </a>
          </Link>
          <Link href={`/mochub/websites/${router.query.id}/add-people`}>
            <a
              className={
                style.mocSettingList +
                ` ${router.asPath === `/mochub/websites/${router.query.id}/add-people` ? style.active : ''}`
              }
            >
              <ListGroup.Item className="reset-list-group-item">Add People</ListGroup.Item>
            </a>
          </Link>
        </ListGroup>
      </>
    ) : (
      <></>
    );
  return (
    <>
      <h6 className="px-2" style={{ fontSize: 12 }}>
        General
      </h6>

      <ListGroup>
        <Link href={`/mochub/websites/${router.query.id}/settings`}>
          <a
            className={
              style.mocSettingList +
              ` ${router.asPath === `/mochub/websites/${router.query.id}/settings` ? style.active : ''}`
            }
          >
            <ListGroup.Item as="p" className="reset-list-group-item">
              Edit Website
            </ListGroup.Item>
          </a>
        </Link>
      </ListGroup>
      {renderSiteAdminCollaboration}
    </>
  );
}
