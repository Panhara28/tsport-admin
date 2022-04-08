import {
  faAngleLeft,
  faCog,
  faCogs,
  faEdit,
  faExchangeAlt,
  faEye,
  faGlobeEurope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  status: string;
};
export const StatusPageBagde = ({ status }: Props) => {
  const router = useRouter();
  if (status === 'PENDING') {
    return (
      <Link href="#">
        <a className="btn btn-primary">
          <FontAwesomeIcon icon={faCogs} /> Pending
        </a>
      </Link>
    );
  } else if (status === 'INREVIEW') {
    return (
      <Link href="#">
        <a className="btn btn-warning">
          <FontAwesomeIcon icon={faEye} /> In Review
        </a>
      </Link>
    );
  } else if (status === 'PUBLISHED') {
    return (
      <Link href="#">
        <a className="btn btn-success">
          <FontAwesomeIcon icon={faGlobeEurope} /> Published
        </a>
      </Link>
    );
  } else if (status === 'REVERSION') {
    return (
      <Link href="#">
        <a className="btn btn-danger">
          <FontAwesomeIcon icon={faExchangeAlt} /> Reversion
        </a>
      </Link>
    );
  }

  return (
    <Link href="#">
      <a className="btn btn-primary">
        <FontAwesomeIcon icon={faCogs} /> Pending
      </a>
    </Link>
  );
};
