import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import JobMatch from "../../Components/JobMatch/JobMatch";
import NotificationDisplay from "../../Components/Notificationdisplay/NotificationDisplay";
const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <div className="Dashboard-Container">
        <SideBar />
        <div className="values-container">
          <div className="page-header">
            <h1>Dashboard</h1>
            <div className="notification-navigation">
              <button onClick={handleClick}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay />
              </div>
            </div>
          </div>
          <div className="applied-jobs">
            <h3>My Applications</h3>
            <div className="application-tracker">
            <p>ABCD</p>

              <div>
                <label htmlFor="applied">Applied</label>
                <input type="radio" id="applied" name="status" />
              </div>
              <div>
                <label htmlFor="shortlisted">Shortlisted</label>
                <input type="radio" id="shortlisted" name="status" />
              </div>
              <div>
                <label htmlFor="interviewed">Interviewed</label>
                <input type="radio" id="interviewed" name="status" />
              </div>
              <div>
                <label htmlFor="final-round">Final Round</label>
                <input type="radio" id="final-round" name="status" />
              </div>
              <div>
                <label htmlFor="selected">Selected</label>
                <input type="radio" id="selected" name="status" />
              </div>
            </div>
          </div>
          <JobMatch/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
