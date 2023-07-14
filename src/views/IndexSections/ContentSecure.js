import React from "react";
import { Button, Container, Row, Col, Badge } from "reactstrap";

class BasicElements extends React.Component {
  render() {
    return (
      <>
        <section className="section section-lg">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={require("assets/img/onepiece.png")}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h1 style={{ fontSize: 60 }}>
                    Easy and secure access to your content{" "}
                  </h1>
                  <p style={{ fontSize: 28 }}>
                    Store, share, and collaborate on files and folders from your
                    mobile device, tablet, or computer
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default BasicElements;
