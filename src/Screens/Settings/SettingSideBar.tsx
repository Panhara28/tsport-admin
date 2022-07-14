import Link from 'next/link';
import { ListGroup } from 'react-bootstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';

export function SettingSideBar() {
  return (
    <Card>
      <CardBody>
        <h6>Collabration</h6>
        <hr />
        <ListGroup>
          <Link href={`/hr/users`}>
            <a>
              <ListGroup.Item as="p" className="reset-list-group-item mb-2">
                All users
              </ListGroup.Item>
            </a>
          </Link>
          <Link href={`/hr/users/create`}>
            <a>
              <ListGroup.Item as="p" className="reset-list-group-item mb-2">
                Create user
              </ListGroup.Item>
            </a>
          </Link>
        </ListGroup>
      </CardBody>
    </Card>
  );
}
