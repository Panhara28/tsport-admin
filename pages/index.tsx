import type { NextPage } from "next";
import { Container } from "reactstrap";
import { Breadcrumb } from "../src/components/Common/Breadcrumb";
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
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
