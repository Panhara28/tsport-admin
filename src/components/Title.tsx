import { ReactNode } from 'react';
import { Col, Row } from 'react-bootstrap';

type Props = {
  title: string;
  children?: ReactNode;
};

export const Title = ({ title, children }: Props) => {
  return (
    <>
      <Row>
        <Col>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <h5 style={{ margin: 0 }}>{title}</h5>
            {children}
          </div>
        </Col>
      </Row>
      <hr />
    </>
  );
};
