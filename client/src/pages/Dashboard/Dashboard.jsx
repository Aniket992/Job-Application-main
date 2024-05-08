import React, { useState, useEffect, useContext } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import NotificationDisplay from "../../Components/Notificationdisplay/NotificationDisplay";
import axios from "axios";
import { UserContext } from "../../MyContext";
import { BASE_URL } from "../../apiConfig";
import Footer from "../../Components/Footer/Footer";

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
            `${BASE_URL}/api/v1/application/applications`,
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
    console.log(selectedJob);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "applied":
        return "green";
      case "shortlisted":
        return "orange";
      case "interviewed":
        return "violet";
      case "hired":
        return "light green";
      default:
        return "gray"; // Default color
    }
  };

  if (!user) {
    // User not logged in, redirect to login page
    navigate("/");
  }

  return (
    <>
      <div className="Dashboard-Container">
        <SideBar />
        <div className="values-container">
          <div className="page-header">
            <h1>My Applications</h1>
            <div className="notification-navigation">
              <button onClick={handleClick}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay />
              </div>
            </div>
          </div>
          {user.user.userType === "jobSeeker" && (
            <div className="applied-jobs">
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
                        <p
                          style={{
                            backgroundColor: getStatusColor(
                              application.application.status
                            ),
                          }}
                        >
                          {application.application.status}
                        </p>
                      </div>
                      <button onClick={() => handleViewJob(application.jobDetails)}>
                        View Job
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup-container">

<div className="popup">
            <div className="popup-item">
              <p1>Company name:</p1>
              <p>{selectedJob.company}</p>
            </div>
            <div className="popup-item">
              <p1>Position:</p1>
              <p>{selectedJob.position}</p>
            </div>
            <div className="popup-item">
              <p1>Work Location:</p1>
              <p>{selectedJob.workLocation}</p>
            </div>
            <div className="popup-item">
              <p1>Work Type:</p1>
              <p>{selectedJob.workType}</p>
            </div>
            <div className="popup-item">
              <p1>Salary:</p1>
              <p>{selectedJob.salary}</p>
            </div>
            <div className="popup-item">
              <p1> Work Details:</p1>
              <p>{selectedJob.jobDescription}</p>
            </div>
            <div className="popup-item">
              <p1>Eligibility:</p1>
              <p>{selectedJob.eligibility}</p>
            </div>{" "}
            <div className="popup-item">
              <p1>Perks:</p1>
              <p>{selectedJob.perks}</p>
            </div>
            <div className="popup-item">
              <p1>Skills required:</p1>
              <p>{selectedJob.skills}</p>
            </div>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Dashboard;
