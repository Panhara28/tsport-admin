import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { Container, Row } from "reactstrap";
import { Breadcrumb } from "../src/components/Common/Breadcrumb";
import Layout from "../src/components/VerticalLayout";
import Notiflix from "notiflix";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card } from "../src/components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const QUERY = gql`
  query applicationByUserList {
    applicationByUserList {
      data {
        id
        name
      }
    }
  }
`;
const Home: NextPage = () => {
  const router = useRouter();

  const { data, loading } = useQuery(QUERY, {
    onError: (error) => {
      router.push("/");
      Notiflix.Notify.failure(
        "Please contact your site administrator to grant access for you!"
      );
    },
  });
  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            title="Ministry Of Commerce"
            breadcrumbItem="Your websites"
          />
          <hr />

          <Row>
            {data?.applicationByUserList?.data?.map((item: any) => {
              return (
                <>
                  <Link href={`/mochub/websites/${item.id}`}>
                    <a
                      className="col-md-3"
                      style={{ textDecoration: "none", color: "#000" }}
                    >
                      <Card name={item.name} fullname="Chhouk Tit Panhara" />
                    </a>
                  </Link>
                </>
              );
            })}
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
