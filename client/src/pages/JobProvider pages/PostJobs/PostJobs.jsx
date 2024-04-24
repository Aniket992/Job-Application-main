import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../MyContext";
import "primeicons/primeicons.css";
import NotificationDisplay from "../../../Components/Notificationdisplay/NotificationDisplay";
import SideBar from "../../../Components/SideBar/SideBar";
import PostJob from "../../../Components/PostJob/PostJob";

const PostJobs = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();



  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="jobs-page-body">
        <SideBar />
        <div className="jobs-body">
          <div className="page-header">
            {user.user.userType ==="jobSeeker"? (<h1>Find Jobs</h1>):(<h1>Post Jobs</h1>)}
            
            <div className="notification-navigation">
              <button onClick={handleClick}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay />
              </div>
            </div>
          </div>
          <hr />
          <PostJob/>
            </div>
         
        </div>
      </>
  );
};
      export default PostJobs; 
