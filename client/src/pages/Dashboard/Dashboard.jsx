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
        setApplications(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [user.token]); // Include user.token in the dependency array

  const handleClick = () => {
    navigate("/");
  };
  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
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
              <div className="application-label">
              <p>Position:</p>
            <p>Company:</p>
            <p>Status:</p>
            <p>Job-details</p>
              </div>
           

              {applications &&
                applications.map((application) => (
                  <div className="application" key={application._id}>
                    <div className="application-element">
                      <p>{application.jobDetails.position}</p>
                    </div>
                    <div className="application-element">
                      <p>{application.jobDetails.company}</p>
                    </div>
                    <div className="application-element">
                      <p>{application.application.status}</p>
                    </div>
                    <button onClick={() => handleViewJob(application)}>
                      View Job
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {isPopupOpen && (
          <div className="popup-container">
            <div className="popup">
              <h2>Job Description</h2>
              <h3>Company name:</h3>
              <p>{selectedJob.jobDetails.company}</p>
              <h3>Position:</h3>
              <p>{selectedJob.jobDetails.position}</p>
              <h3>Work Location</h3>
              <p>{selectedJob.jobDetails.workLocation}</p>
              <h3>Work Type:</h3>
              <p>{selectedJob.jobDetails.workType}</p>
              <h3>Salary:</h3>
              <p>{selectedJob.jobDetails.salary}</p>
              <h3> Work Details:</h3>
              <p>{selectedJob.jobDetails.jobDescription}</p>
              <h3>Eligibility</h3>
              <p>{selectedJob.jobDetails.eligibility}</p>
              <h3>Perks:</h3>
              <p>{selectedJob.jobDetails.perks}</p>
              <h3>Application Status</h3>
              <p>{selectedJob.jobDetails.status}</p>

              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
