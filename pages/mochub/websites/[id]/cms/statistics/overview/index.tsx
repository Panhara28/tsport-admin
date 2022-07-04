import React, { useState } from 'react';
import { Button, Card, Col, Nav, Row } from 'react-bootstrap';
import { Container } from 'reactstrap';
import Image from 'next/image';
import style from './overview.module.scss';
import { RevenueReports } from '../../../../../../../src/components/ApexCharts/Avenue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { LineChart } from '../../../../../../../src/components/ApexCharts/LineChart';
import { AreaChart } from '../../../../../../../src/components/ApexCharts/AreaChart';
import { BalanceChart } from '../../../../../../../src/components/ApexCharts/ColumnChart';

export default function Overview() {
  const [state, setState] = useState({});

  return (
    <div className={style.main}>
        <div className={style.app_content}>
          <Row>
            <Col md={12} xl={12}>
              <Card className={style.card}>
                <Card.Body className={style.top_nav}>
                  <Card.Text>
                    <div className="d-flex">
                      <div>
                        <FontAwesomeIcon icon={faBars} className={style.menu_nav}/>
                      </div>
                      <div>
                          <Button className={`${style.btn_filter} active`}>Overview</Button>
                          <Button className={style.btn_filter}>By Country</Button>
                          <Button className={style.btn_filter}>By Product</Button>
                          <Button className={style.btn_filter}>By Trimester</Button>
                          <Button className={style.btn_filter}>By Semester</Button>
                          <Button className={style.btn_filter}>By Year</Button>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} xl={6}>
              <h4 className={style.txt_title}>Export</h4>
              <Card className={style.card}>
                <Card.Body>
                  <div className="d-flex">
                    <Card className={style.card_country}>
                      <Card.Body>
                        <div>
                          <img src="/images/cambodia.svg" className={style.flag_img}/>
                          {/* <Image src="/images/cambodia.svg" width={100} height={100} layout="responsive" className={style.flag_img}/> */}
                          <h3 className={style.country_name}>Cambodia</h3>
                          <span className={style.txt_vol}>Vol: <span>30K</span></span>
                        </div>
                      </Card.Body>
                    </Card>      
                    <Card className={style.card_country}>
                      <Card.Body>
                        <Card.Text>
                        <div>
                          <img src="/images/Thai.png" className={style.flag_img}/>
                          {/* <Image src="/images/cambodia.svg" width={100} height={100} layout="responsive" className={style.flag_img}/> */}
                          <h3 className={style.country_name}>Thailand</h3>
                          <span className={style.txt_vol}>Vol: <span>30K</span></span>
                        </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>      
                    <Card className={style.card_country}>
                      <Card.Body>
                        <Card.Text>
                        <div>
                          <img src="/images/China.png" className={style.flag_img}/>
                          {/* <Image src="/images/cambodia.svg" width={100} height={100} layout="responsive" className={style.flag_img}/> */}
                          <h3 className={style.country_name}>China</h3>
                          <span className={style.txt_vol}>Vol: <span>30K</span></span>
                        </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>      
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} xl={6}>
              <h4 className={style.txt_title}>Import</h4>
              <Card className={style.card}>
                <Card.Body>
                <div className="d-flex">
                    <Card className={style.card_country}>
                      <Card.Body>
                        <div>
                          <img src="/images/cambodia.svg" className={style.flag_img}/>
                          {/* <Image src="/images/cambodia.svg" width={100} height={100} layout="responsive" className={style.flag_img}/> */}
                          <h3 className={style.country_name}>Cambodia</h3>
                          <span className={style.txt_vol}>Vol: <span>30K</span></span>
                        </div>
                      </Card.Body>
                    </Card>      
                    <Card className={style.card_country}>
                      <Card.Body>
                        <Card.Text>
                        <div>
                          <img src="/images/Thai.png" className={style.flag_img}/>
                          {/* <Image src="/images/cambodia.svg" width={100} height={100} layout="responsive" className={style.flag_img}/> */}
                          <h3 className={style.country_name}>Thailand</h3>
                          <span className={style.txt_vol}>Vol: <span>30K</span></span>
                        </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>      
                    <Card className={style.card_country}>
                      <Card.Body>
                        <Card.Text>
                        <div>
                          <img src="/images/China.png" className={style.flag_img}/>
                          {/* <Image src="/images/cambodia.svg" width={100} height={100} layout="responsive" className={style.flag_img}/> */}
                          <h3 className={style.country_name}>China</h3>
                          <span className={style.txt_vol}>Vol: <span>30K</span></span>
                        </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>      
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} xl={6}>
              <Row>
                <Col md={4}>
                  <Card className={style.card}>
                    <Card.Body>
                      <p className={`${style.txt_p} card-text font-small-3`}>Export VPY</p>
                      <span className={style.txt_country__vol}>Vol: <span>1690M</span></span>
                      <LineChart options={state.options} series={state.series} type="line"/>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className={style.card}>
                    <Card.Body>
                      <p className={`${style.txt_p} card-text font-small-3`}>Import VPY</p>
                      <span className={style.txt_country__vol}>Vol: <span>1690M</span></span>
                      <AreaChart options={state.options} series={state.series} type="area"/>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                <Card className={style.card}>
                    <Card.Body>
                      <p className={`${style.txt_p} card-text font-small-3`}>Balance VPY</p>
                      <span className={style.txt_country__vol}>Vol: <span>1690M</span></span>
                      <BalanceChart options={state.options} series={state.series} type="bar" />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Card className={style.card}>
                    <Card.Body>
                      <p className={`${style.txt_p} card-text font-small-3`}>Export Net Weight</p>
                      <span className={style.txt_country__vol}>Vol: <span>1690M</span></span>
                      <LineChart options={state.options} series={state.series} type="line"/>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className={style.card}>
                    <Card.Body>
                      <p className={`${style.txt_p} card-text font-small-3`}>Import Net Weight</p>
                      <span className={style.txt_country__vol}>Vol: <span>1690M</span></span>
                      <AreaChart options={state.options} series={state.series} type="area"/>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                <Card className={style.card}>
                    <Card.Body>
                      <p className={`${style.txt_p} card-text font-small-3`}>Quantity VPY</p>
                      <span className={style.txt_country__vol}>Vol: <span>1690M</span></span>
                      <BalanceChart options={state.options} series={state.series} type="bar" />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

            </Col>
            <Col md={6} xl={6}>
              <Card className={style.card}>
                <Card.Body>
                  <Card.Text>
                    <p className={`${style.txt_p} card-text font-small-3`}>Total Import volumn</p>
                    <span className={style.txt_country__vol}>By Country</span>
                    <RevenueReports options={state.options} series={state.series} type="line" height={350} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </div>
      <Container >
      </Container>
    </div>
  );
}
