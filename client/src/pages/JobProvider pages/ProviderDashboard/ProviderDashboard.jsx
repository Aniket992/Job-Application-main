import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../MyContext";
import "primeicons/primeicons.css";
import NotificationDisplay from "../../../Components/Notificationdisplay/NotificationDisplay";
import SideBar from "../../../Components/SideBar/SideBar";
import "./ProviderDashboard.css";
import { BASE_URL } from '../../../apiConfig'; 
import Footer from "../../../Components/Footer/Footer";

const ProviderDashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/job/provider/${user.user._id}`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [user]);

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
          <div className="job-posted-container">

            {isLoading ? (
              <p>Loading...</p>
            ) : jobs.length === 0 ? (
              <p>No jobs found</p>
            ) : (
              <div className="job-posted">
                                <h2>{jobs.length}</h2>

                {jobs.map((job) => (
                  <div key={job._id} className="job-item">
                    <h5>{job.position}</h5>
                    <p>Salary: {job.salary}</p>
                    <div className="button-container">
                    <button>Update job</button>
                    <button>delete job</button>
                      </div> 
                    
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      
      </div>
      <Footer/>
    </>
  );
};

export default ProviderDashboard;
