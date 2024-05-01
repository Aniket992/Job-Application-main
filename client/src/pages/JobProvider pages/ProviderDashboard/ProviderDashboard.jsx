import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../MyContext";
import "primeicons/primeicons.css";
import NotificationDisplay from "../../../Components/Notificationdisplay/NotificationDisplay";
import SideBar from "../../../Components/SideBar/SideBar";
import "./ProviderDashboard.css";
const ProviderDashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 

  const handleClick = () => {
    navigate("/Home");
  };

  return (
    <>
      <div className="jobs-page-body">
        <SideBar />
        <div className="jobs-body">
          <div className="page-header">
            <h1>Dashboard</h1>
            <div className="notification-navigation">
              <button onClick={handleClick}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay />
              </div>
            </div>
          </div>
          <hr />
         
        </div>
      </div>
    </>
  );
};

export default ProviderDashboard;
