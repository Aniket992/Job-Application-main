import React, { useContext } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../MyContext";

import "primeicons/primeicons.css";

const SideBar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="sidebar">
      <h1>Recruitify</h1>
      <ul>
        <li>
          <NavLink exact className="navLinks" activeClassName="active" to={user.user.userType === "jobProvider" ? "/ProviderDashboard" : "/UserDashboard"}>
            <i className="pi pi-home" style={{ fontSize: "1.5rem", marginRight: "10px" }}></i>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className="navLinks" activeClassName="active" to={user.user.userType === "jobProvider" ? "/PostJobs" : "/FindJobs"}>
            <i className="pi pi-briefcase" style={{ fontSize: "1.5rem", marginRight: "10px" }}></i>
            {user.user.userType === "jobProvider" ? "Post Jobs" : "Find Jobs"}
          </NavLink>
        </li>
        <li>
          <NavLink className="navLinks" activeClassName="active" to={user.user.userType === "jobProvider" ? "/FindCandidates" : "/BrowseCompanies"}>
            <i className={user.user.userType === "jobProvider" ? "pi pi-user-plus" : "pi pi-building"} style={{ fontSize: "1.5rem", marginRight: "10px" }}></i>

            {user.user.userType === "jobProvider" ? "Find Candidate" : "Browse Companies"}
          </NavLink>
        </li>
        <li>
          <NavLink className="navLinks" activeClassName="active" to={"/Messages"}>
            <i className="pi pi-envelope" style={{ fontSize: "1.5rem", marginRight: "10px" }}></i>
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink className="navLinks" activeClassName="active" to={user.user.userType === "jobProvider" ? "/CompanyProfile" : "/UserProfile"}>
            <i className={user.user.userType === "jobProvider" ? "pi pi-building" : "pi pi-user-plus"} style={{ fontSize: "1.5rem", marginRight: "10px" }}></i>
            {user.user.userType === "jobProvider" ? "Company Profile" : "My Public Profile"}
          </NavLink>
        </li>
        <hr />
        <h3>SETTINGS</h3>
        <li>
          <NavLink className="navLinks" activeClassName="active" to={"/Settings"}>
            <i className="pi pi-spin pi-cog" style={{ fontSize: "2rem", marginRight: "10px" }}></i>
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink className="navLinks" activeClassName="active" to={"/HelpCenter"}>
            <i className="pi pi-question-circle" style={{ fontSize: "2rem", marginRight: "10px" }}></i>
            Help Center
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
