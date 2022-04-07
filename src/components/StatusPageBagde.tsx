import {
  faCogs,
  faEdit,
  faExchangeAlt,
  faEye,
  faGlobeEurope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

type Props = {
  status: string;
};
export const StatusPageBagde = ({ status }: Props) => {
  if (status === "PENDING") {
    return (
      <Button variant="primary" size="sm">
        <FontAwesomeIcon icon={faEdit} /> Pending
      </Button>
    );
  } else if (status === "INREVIEW") {
    return (
      <Button variant="warning" size="sm">
        <FontAwesomeIcon icon={faEye} /> In Review
      </Button>
    );
  } else if (status === "PUBLISHED") {
    return (
      <Button variant="success" size="sm">
        <FontAwesomeIcon icon={faGlobeEurope} /> Published
      </Button>
    );
  } else if (status === "REVERSION") {
    return (
      <Button variant="danger" size="sm">
        <FontAwesomeIcon icon={faExchangeAlt} /> Reversion
      </Button>
    );
  }

  return (
    <Button variant="primary" size="sm">
      <FontAwesomeIcon icon={faCogs} /> Pending
    </Button>
  );
};
