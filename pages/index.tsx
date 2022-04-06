import type { NextPage } from "next";
import { Container } from "reactstrap";
import { Breadcrumb } from "../src/components/Common/Breadcrumb";
import Layout from "../src/components/VerticalLayout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Minible" breadcrumbItem="Dashboard" />
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
