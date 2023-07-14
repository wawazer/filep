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

class DarkFooter extends React.Component {
  render() {
    return (
      <>
        <footer className=" footerdark">
          <Container>
            <hr />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="6">
                <div className=" copyright" style={{ color: "white" }}>
                  © {new Date().getFullYear()}{" "}
                  <a href="" target="_blank" style={{ color: "white" }}>
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

export default DarkFooter;
