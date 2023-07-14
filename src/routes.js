import UserPage from "views/page/UserPage";
import Role from "views/page/PilihRole.js";
import React from "react";

var routes = [
  {
    path: "/userpage",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <UserPage />,
    layout: "/admin",
  },
  {
    path: "/Pilih-role",
    name: "Pilih Role",
    icon: "ni ni-circle-08 text-green",
    component: <Role />,
    layout: "",
  },
];
export default routes;
