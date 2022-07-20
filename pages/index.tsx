import type { NextPage } from "next";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import { Card } from "reactstrap";
import { CardBody } from "reactstrap";
import { Container } from "reactstrap";
import { Breadcrumb } from "../src/components/Common/Breadcrumb";
import { DashboardCard } from "../src/components/Dashboard/DashboardCard";
import Layout from "../src/components/VerticalLayout";
import { setting } from "../src/libs/settings";


const Home: NextPage = () => {
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            title={setting.title}
            breadcrumbItem="Dashboard"
          />
          <hr />
          <Row>
            <Col md={3}>
              <Card>
                <CardBody>
                  <DashboardCard />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
