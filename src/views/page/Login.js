import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Button } from "@mui/material";
import Navbar from "components/Navbars/Navbar.js";
import DarkFooter from "components/Footers/DarkFooter";
import axios from "axios";

var ls = require("local-storage");

const Emoji = (props) => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
);

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = () => {
    axios
      .post("http://eap-prsi.pelindo.co.id/portalsi-ws/portalsi/loginVal", {
        user_name: username,
        user_password: password,
        application_id: 4802,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.kode == "S") {
          ls.set("namauser", res.data.NAMA);
          ls.set("username", res.data.USERNAME);

          ls.set("role", {
            hak_akses_desc: res.data.HAKAKSES_DESC,
            hak_akses: res.data.HAKAKSES,
          });
          history.push("/Pilih-role");
        } else {
          alert(res.data.pesan);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  if (ls.get("namauser") != null) {
    history.push("/Pilih-role");
  }
  return (
    <>
      <main>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-kedua">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />{" "}
          </div>
          <Container className="pt-lg-9 my-6">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 mt-5">
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Username"
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                        />
                      </div>
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          variant="contained"
                          type="button"
                          fullWidth="true"
                          onClick={(e) => handleSubmit()}
                        >
                          Sign in
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <DarkFooter />
    </>
  );
};

export default Login;
