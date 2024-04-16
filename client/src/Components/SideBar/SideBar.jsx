import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom"; // Import NavLink instead of Link

import "primeicons/primeicons.css";
const SideBar = () => {
  return (
    <div className="sidebar">
      <h1>Recruitify</h1>
      <ul>
        <li>
          <NavLink exact className="navLinks" activeclassname="active" to={"/Dashboard"}>
            <i
              className="pi pi-home"
              style={{ fontSize: "1.5rem", marginRight: "10px" }}
            ></i>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navLinks"
            activeclassname="active"
            to={"/FindJobs"}
          >
            <i
              className="pi pi-briefcase"
              style={{ fontSize: "1.5rem", marginRight: "10px" }}
            ></i>
            Find Jobs
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navLinks"
            activeclassname="active"
            to={"/BrowseCompanies"}
          >
            <i
              className="pi pi-amazon"
              style={{ fontSize: "1.5rem", marginRight: "10px" }}
            ></i>
            Browse Companies
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navLinks"
            activeclassname="active"
            to={"/Messages"}
          >
            <i
              className="pi pi-envelope"
              style={{ fontSize: "1.5rem", marginRight: "10px" }}
            ></i>
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navLinks"
            activeclassname="active"
            to={"/Profile"}
          >
            <i
              className="pi pi-user"
              style={{ fontSize: "1.5rem", marginRight: "10px" }}
            ></i>
            My Public Profile
          </NavLink>
        </li>
        <hr />
        <h3>SETTINGS</h3>
        <li>
          <NavLink
            className="navLinks"
            activeclassname="active"
            to={"/Settings"}
          >
            <i
              className="pi pi-spin pi-cog"
              style={{ fontSize: "2rem", marginRight: "10px" }}
            ></i>
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navLinks"
            activeclassname="active"
            to={"/HelpCenter"}
          >
            <i
              className="pi pi-question-circle
"
              style={{ fontSize: "2rem", marginRight: "10px" }}
            ></i>
            Help Center
          </NavLink>
        </li>
        {/* Add more categories as needed */}
      </ul>
    </div>
  );
};

export default SideBar;
