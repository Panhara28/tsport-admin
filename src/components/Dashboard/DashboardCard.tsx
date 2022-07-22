import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';
import style from './dashboard-card.module.scss';

type DashboardCardProps = {
  title?: string;
  count?: number;
  link?: string;
  icon?: any;
};

export function DashboardCard({ title, count, link, icon }: DashboardCardProps) {
  return (
    <>
      <div>
        <Row>
          <Col md={4} lg={3}>
            <div className={style.dashWidgetIcon}>
              <FontAwesomeIcon icon={icon ? icon : faUsers} className={style.departmentIcon}/>
            </div>
          </Col>
          <Col md={8} lg={9}>
            <div className={style.dashWidgetInfo}>
              <div>
                <h5>{title}</h5>
              </div>
              <div>
                <span>
                  Officers: <span>{count ? count : 0}</span>
                </span>
              </div>

            </div>
          </Col>
        </Row>

      </div>
      <hr />
      <div className="d-flex justify-content-end">
        <Link href={link ? link : '#'}>
          <a className="btn btn-primary btn-sm">View detail</a>
        </Link>
      </div>
    </>
  );
}
