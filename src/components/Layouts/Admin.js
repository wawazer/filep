import React from "react";
import { useLocation, Route } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
// import AdminFooter from "components/Footers/AdminFooter.js";
import UserPage from "views/page/UserPage";
import Sidebar from "components/Sidebar/Sidebar.js";
import NavbarLogin from "components/Navbars/NavbarLogin";

import routes from "routes.js";
var ls = require("local-storage");

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Dashboard";
  };

  return (
    <>
      <AdminNavbar />
      <section className="section-userpage-cover section-shaped my-0">
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
            <polygon className="fill-white" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("assets/img/brand/logopfile-dark.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <UserPage />
      </div>
    </>
  );
};

export default Admin;
