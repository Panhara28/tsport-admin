import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import style from './dashboard-card.module.scss';

export function DashboardCard() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className={style.dashWidgetIcon}>
          <FontAwesomeIcon icon={faUsers} size="sm" />
        </div>

        <div className={style.dashWidgetInfo}>
          <h3>122</h3>
          <p>Officers</p>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-end">
        <Link href="#">
          <a className="btn btn-primary btn-sm">View detail</a>
        </Link>
      </div>
    </>
  );
}
