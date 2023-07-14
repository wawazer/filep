import React from "react";
import { Link, useHistory } from "react-router-dom";
import Headroom from "headroom.js";

import {
  UncontrolledCollapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Media,
  Container,
  Row,
  Col,
} from "reactstrap";
var ls = require("local-storage");

class NavbarLogin extends React.Component {
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onHandleLogout = () => {
    ls.clear();
    let history = useHistory();
    this.props.history.push("/login-page");
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/logopfile.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/logosecure.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>

                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <UncontrolledDropdown></UncontrolledDropdown>
                  <NavItem className="d-none d-lg-block ml-lg-4"></NavItem>
                </Nav>

                <Nav className=" d-md-flex" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                      <Media className="align-items-center">
                        <span className="avatar avatar-sm rounded-circle"></span>
                        <Media className="ml-2 d-none d-lg-block">
                          <span className="mb-0 text-sm font-weight-bold">
                            {ls.get("namauser")}
                          </span>
                        </Media>
                      </Media>
                    </DropdownToggle>
                    <DropdownMenu
                      className="dropdown-menu-arrow"
                      style={{ marginTop: 50, marginLeft: 10 }}
                      right
                    >
                      <DropdownItem to="/Pilih-role" tag={Link}>
                        <i className="ni ni-single-02" />
                        <span>Pilih Role</span>
                      </DropdownItem>

                      <DropdownItem divider />
                      <DropdownItem href="#" onClick={this.onHandleLogout}>
                        <i className="ni ni-user-run" />
                        <span>Logout</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default NavbarLogin;
