import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import axios from "axios";

var ls = require("local-storage");

const Signin = () => {
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
                  <div className="brand-wrapper">
                    <img
                      src={require("assets/img/brand/logopfile-dark.png")}
                      alt="logo"
                      className="logo"
                    />
                  </div>
                  <p className="login-card-description">
                    Sign into your account
                  </p>
                  <form action="#!">
                    <div className="form-group">
                      <label htmlFor="email" className="sr-only">
                        Username
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="***********"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <input
                      name="login"
                      id="login"
                      className="btn btn-block login-btn mb-4"
                      type="button"
                      defaultValue="Login"
                      onClick={(e) => handleSubmit()}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signin;
