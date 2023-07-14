import React from "react";

import { Card, Container, Row, Col } from "reactstrap";

import NavbarLogin from "components/Navbars/NavbarLogin";
import ContentTable from "views/IndexSections/ContentTable.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <NavbarLogin />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            <div className="shape shape-style-1 shape-default alpha-4"></div>
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--500">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3"></Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        {/* <Button
                          className="mr-4"
                          color="info"
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          ZIP/DOWNLOAD
                        </Button>
                        <Button
                          className="float-right"
                          color="default"
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Print
                        </Button> */}
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center"></div>
                    </Col>
                  </Row>
                  <ContentTable />
                </div>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Dashboard;
