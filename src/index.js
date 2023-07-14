import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/css/layoutadmin.css";

import Index from "views/Index.js";

import Login from "views/page/Login.js";
import Role from "views/page/PilihRole.js";
import Dashboard from "views/page/Dashboard.js";
import DetailFile from "views/page/DetailFile.js";
import CobaLogin from "views/page/CobaLogin";
import UserPage from "views/page/UserPage";
import Admin from "components/Layouts/Admin";
import Signin from "views/page/Signin";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={(props) => <Index {...props} />} />
      <Route
        path="/login-page"
        exact
        render={(props) => <Login {...props} />}
      />
      <Route
        path="/logincoba"
        exact
        render={(props) => <CobaLogin {...props} />}
      />
      <Route path="/Pilih-role" exact render={(props) => <Role {...props} />} />
      <Route
        path="/Dashboard"
        exact
        render={(props) => <Dashboard {...props} />}
      />
      <Route
        path="/UserPage"
        exact
        render={(props) => <UserPage {...props} />}
      />
      <Route path="/index" exact render={(props) => <Index {...props} />} />
      <Route
        path="/DetilByTrx/:companycode/:appcode/:docno/:doctype"
        exact
        render={(props) => <DetailFile {...props} />}
      />
      <Route
        path="/admin/userpage"
        exact
        render={(props) => <Admin {...props} />}
      />
      <Route path="/Signin" exact render={(props) => <Signin {...props} />} />

      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
