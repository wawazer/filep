import { useHistory, Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import { RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import axios from "axios";

var ls = require("local-storage");

const Role = () => {
  let history = useHistory();

  if (ls.get("namauser") == null) {
    history.push("/login-page");
  }

  function onChangeValue(event) {
    var role = "";

    if (event.target.value == "PIC HEAD OFFICE") {
      role = 3387;
    } else if (event.target.value == "SUPERADMIN") {
      role = 3385;
    } else if (event.target.value == "PIC REGIONAL") {
      role = 3389;
    } else if (event.target.value == "PIC CABANG") {
      role = 3391;
    }

    ls.set("role_user", role);
  }

  const handleSubmit = () => {
    if (ls.get("role_user") != null) {
      history.push("/Admin/userpage");
    } else {
      alert("silakan pilih role");
    }
  };
  return (
    <>
      <main
        className="d-flex align-items-center min-vh-100 py-3 py-md-0"
        style={{ backgroundColor: "#10316E" }}
      >
        <div className="container">
          <div className="card login-card">
            <div className="row no-gutters">
              <div className="col-md-5">
                <img
                  src={require("assets/img/theme/login-bg.png")}
                  alt="login"
                  className="login-card-img"
                />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <p className="login-card-description">Pilih Role</p>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    {ls.get("namauser") != null &&
                      ls
                        .get("role")
                        .hak_akses_desc.split(",")
                        .map((data, key) => (
                          <li
                            key={key}
                            className="demo-radio-buttons-group-label"
                            style={{ listStyleType: "none" }}
                          >
                            <div onChange={onChangeValue}>
                              <FormControlLabel
                                type="radio"
                                control={<Radio />}
                                name="role"
                                value={data}
                                id={data}
                              />
                              {data}
                            </div>
                          </li>
                        ))}
                  </RadioGroup>

                  <ul></ul>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="success"
                      variant="contained"
                      type="button"
                      fullWidth="true"
                      onClick={() => handleSubmit()}
                    >
                      Sign in
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Role;
