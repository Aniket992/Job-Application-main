import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContext";
import NotificationDisplay from "../Notificationdisplay/NotificationDisplay";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  
  const handleSignout = () => {
    const confirmSignout = window.confirm("Are you sure you want to sign out?");

    if (confirmSignout) {
      setUser(null); // Clear the user context
      setShowDropdown(false); // Hide the dropdown after signout
    }
  };
  
  const handleLogo = () => {
    navigate("/Home");
  };
  
  const handleProfile = () => {
    navigate("/UserProfile");
  };
  
  const handleLogin = () => {
    navigate("/Login");
  };
  
  const handleSignUp = () => {
    navigate("/Register");
  };
  

  return (
    <div className="navbar">
      <div className="left">
        <div className="logo" onClick={handleLogo}>
          <h1>Recruitify</h1>
        </div>
        <div className="menu">
          <li>
            <Link className="Link" to={"/FindJobs"}>
              Find Jobs
            </Link>
          </li>
          <li>
            <Link className="Link" to={"/BrowseCompanies"}>
              Browse Companies
            </Link>
          </li>
          {/* <li>
            <Link className="Link" to={"/AboutUs"}>
              About Us
            </Link>
          </li> */}
        </div>
      </div>

      <div className="right">
       
        <div className="loggedIn">
          {user ? (
            <div className="dropdown">
              <button onClick={() => setShowDropdown(!showDropdown)}>
                {user.user.name}
              </button>
              {showDropdown && (
                <div className="dropdown-content">
                  <p onClick={handleProfile}>Profile</p>
                  <p onClick={handleSignout}>Sign-out</p>
                </div>
              )}
            </div>
          ) : (
            <div className="login-signup">
              <button
                onClick={handleLogin}
                style={{ backgroundColor: "", color: "white" }}
              >
                Login In
              </button>
              <button onClick={handleSignUp}>Sign Up</button>
            </div>
          )}
        </div>
        <div className="notification">
          <NotificationDisplay />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
