import { faPlug, faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import AuthContext from "../../components/Authentication/AuthContext";
import { Breadcrumb } from "../../components/Common/Breadcrumb";
import Layout from "../../components/VerticalLayout";
import style from "./create-websites.module.scss";

export function ContentManagementScreen() {
  const router = useRouter();
  const { me } = useContext(AuthContext);

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            title="Ministry Of Commerce"
            breadcrumbItem="Your Plugins"
          />
          <Row>
            {me.plugins.map((item: any) => {
              return (
                <>
                  <Link
                    href={`/mochub/websites/${router.query.id}/cms/${item.slug}`}
                  >
                    <a
                      className={`col-xl-4 ${style.mocContentManagementContainer}`}
                    >
                      <Card className="card-box-shadow">
                        <Card.Body>
                          <Row>
                            <Col>
                              <h6 className="text-muted">Plugin</h6>
                              <h3>{item.name}</h3>
                              <p className="text-muted mb-0">
                                <FontAwesomeIcon icon={faChevronCircleUp} />{" "}
                                Total {item.name}: 100
                              </p>
                            </Col>
                            <Col className="col-auto">
                              <div
                                className={`ms-auto ${style.boxShadowPrimary} ${style.brRound} ${style.counterIcon} ${style.bgPrimaryGradient}`}
                              >
                                <FontAwesomeIcon icon={faPlug} color="white" />
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
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
}

// <Container>
//     <Row className="mt-4 mx-4">
//       <Col>
//         <Breadcrumb title="Minible" breadcrumbItem="Dashboard" />
//       </Col>
//     </Row>
//     <Row className="mt-4 mx-4">
//       {me.plugins.map((item: any) => {
//         return (
//           <>
//             <Link
//               href={`/mochub/websites/${router.query.id}/cms/${item.slug}`}
//             >
//               <a
//                 className={`col-xl-4 ${style.mocContentManagementContainer}`}
//               >
//                 <Card className="card-box-shadow">
//                   <Card.Body>
//                     <Row>
//                       <Col>
//                         <h6 className="text-muted">Plugin</h6>
//                         <h3>{item.name}</h3>
//                         <p className="text-muted mb-0">
//                           <FontAwesomeIcon icon={faChevronCircleUp} /> Total{" "}
//                           {item.name}: 100
//                         </p>
//                       </Col>
//                       <Col className="col-auto">
//                         <div
//                           className={`ms-auto ${style.boxShadowPrimary} ${style.brRound} ${style.counterIcon} ${style.bgPrimaryGradient}`}
//                         >
//                           <FontAwesomeIcon icon={faPlug} color="white" />
//                         </div>
//                       </Col>
//                     </Row>
//                   </Card.Body>
//                 </Card>

//             </a>
//             </Link>
//           </>
//         );
//       })}
//     </Row>
//   </Container>
