import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../MyContext";
import "primeicons/primeicons.css";
import NotificationDisplay from "../../../Components/Notificationdisplay/NotificationDisplay";
import SideBar from "../../../Components/SideBar/SideBar";
import PostJob from "../../../Components/PostJob/PostJob";
import "./PostJobs.css";
import { BASE_URL } from '../../../apiConfig'; 
import Footer from "../../../Components/Footer/Footer";

const PostJobs = () => {
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

  const handleJobPosted = () => {
    fetchJobs(); 
  };

  const handleClick = () => {
    navigate("/Home");
  };

  return (
    <>
      <div className="jobs-page-body">
        <SideBar />
        <div className="jobs-body">
          <div className="page-header">
            {user.user.userType === "jobSeeker" ? (<h1>Find Jobs</h1>) : (<h1>Post Jobs</h1>)}
            
            <div className="notification-navigation">
              <button onClick={handleClick}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay />
              </div>
            </div>
          </div>
          <hr />

          <div className="job-posted-container">

          
            <PostJob onJobPosted={handleJobPosted} />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PostJobs;
