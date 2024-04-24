import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../MyContext";
import "primeicons/primeicons.css";
import NotificationDisplay from "../../../Components/Notificationdisplay/NotificationDisplay";
import SideBar from "../../../Components/SideBar/SideBar";

const ProviderDashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`/api/v1/job/provider/${user.user._id}`);
        setJobs(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  const handleClick = () => {
    navigate("/");
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
          {isLoading ? (
            <p>Loading...</p>
          ) : jobs.length === 0 ? (
            <p>No jobs found</p>
          ) : (
            <div className="job-posted">
              {jobs.map((job) => (
                <div key={job._id} className="job-item">
                  <h2>{job.position}</h2>
                  <p>Company: {job.company}</p>
                  <p>Location: {job.workLocation}</p>
                  <p>Salary: {job.salary}</p>
                  {/* Add more job details as needed */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProviderDashboard;
