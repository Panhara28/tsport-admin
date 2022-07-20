import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
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
      <div className="d-flex">
        <div className={style.dashWidgetIcon}>
          <FontAwesomeIcon icon={icon ? icon : faUsers} size="sm" />
        </div>

        <div className={style.dashWidgetInfo}>
          <h5>{title}</h5>
          <p>
            Officers: <span>{count ? count : 0}</span>
          </p>
        </div>
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
