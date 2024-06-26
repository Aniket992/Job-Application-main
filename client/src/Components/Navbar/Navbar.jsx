import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContext";
import NotificationDisplay from "../Notificationdisplay/NotificationDisplay";
import logo from "../../Assets/logo192x192.png";
import {  ToastContainer, Zoom, toast } from 'react-toastify';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  
  const handleSignout = () => {
    const confirmSignout = window.confirm("Are you sure you want to sign out?");

    if (confirmSignout) {
      setUser(null); // Clear the user context
      setShowDropdown(false); // Hide the dropdown after signout
      navigate("/");
    }
  };
  
  const handleLogo = () => {
    toast.success(`Welcome ${user.user.name} . Click Categories to find jobs and get recommended jobs. `);
    };
  
  const handleProfile = () => {
    navigate("/UserProfile");
  };
  
  const handleLogin = () => {
    navigate("/");
  };
  
  const handleSignUp = () => {
    navigate("/Register");
  };
  

  return (
    <>
    <div className="navbar">
      <div className="left">
        <div className="logo" onClick={handleLogo}>
          <img src={logo} alt="" />
          <h1>ecrutify</h1>
        </div>
        <div className="menu">
          <li>
            {user.user.userType === "jobProvider"? (
               <Link className="Link" to={"/PostJobs"}>
               Post Jobs
             </Link>
            ):(
            <Link className="Link" to={"/FindJobs"}>
              Find Jobs
            </Link>
            )}
          </li>
          <li>
            <Link className="Link" to={"/BrowseCompanies"}>
              Browse Companies
            </Link>
          </li>
         
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
    <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Zoom}
/>
    </>
  );
};

export default Navbar;
