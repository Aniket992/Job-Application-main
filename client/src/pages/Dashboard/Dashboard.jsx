import React, { useState, useEffect, useContext } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import NotificationDisplay from "../../Components/Notificationdisplay/NotificationDisplay";
import axios from "axios";
import { UserContext } from "../../MyContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (user && user.user.userType === "jobSeeker") {
      const fetchApplications = async () => {
        try {
          const token = user.token;
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };

          const response = await axios.get(
            "http://localhost:8080/api/v1/application/applications",
            { headers: headers }
          );
          // setApplications(response.data);
          setApplications(response.data.reverse()); // Reverse the array here

          console.log(response.data);
        } catch (error) {
          console.error("Error fetching applications:", error);
        }
      };
      fetchApplications();
    }
  }, [user]);

  const handleClick = () => {
    navigate("/Home");
  };
  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  if (!user) {
    // User not logged in, redirect to login page
    navigate("/login");
  }

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
          {user.user.userType === "jobSeeker" && (
            <div className="applied-jobs">
              <h3>My Applications</h3>
              <div className="application-label">
                  <p>Position:</p>
                  <p>Company:</p>
                  <p>Status:</p>
                  <p>Job-details</p>
                </div>
              <div className="application-tracker">
                

                {applications &&
                  applications.map((application) => (
                    <div className="application" key={application._id}>
                      <div className="application-element">
                        <p>{application.jobDetails.position}</p>
                      </div>
                      <div className="application-element">
                        <p>{application.jobDetails.company}</p>
                      </div>
                      <div className="application-element status">
                        <p>{application.application.status}</p>
                      </div>
                      <button onClick={() => handleViewJob(application)}>
                        View Job
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
         
        </div>
      </div>
    </>
  );
};

export default Dashboard;
