import React from "react";
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className=" footer">
          <Container>
            {/*<Row className=" row-grid align-items-center mb-5">
              <Col lg="6">
                <h4 className=" mb-0 font-weight-light">
                  Logo Pelindo
                </h4>
              </Col>
             </Row>*/}
            <hr />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="6">
                <div className=" copyright">
                  © {new Date().getFullYear()}{" "}
                  <a href="" target="_blank">
                    PT Pelindo (Persero)
                  </a>
                  .
                </div>
              </Col>
              <Col md="6">
                <Nav className=" nav-footer justify-content-end">
                  <NavItem>
                    <NavLink href="" target="_blank">
                      Email
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="" target="_blank">
                      About Us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="" target="_blank">
                      Kontak
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
