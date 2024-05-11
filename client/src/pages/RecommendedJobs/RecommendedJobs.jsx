import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../MyContext";
import SideBar from '../../Components/SideBar/SideBar'
import "./RecommendedJobs.css"
import { useNavigate } from "react-router-dom";
import NotificationDisplay from '../../Components/Notificationdisplay/NotificationDisplay';
import { BASE_URL } from '../../apiConfig'; 
import Footer from "../../Components/Footer/Footer";

const RecommendedJobs = () => {
    const { user } = useContext(UserContext);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/job/get-job`
        );
        if (Array.isArray(user.user.skills)) {
            // Flatten the array if it's nested
            const userSkills = user.user.skills.map(skill => skill.split(' ')).flat();
            console.log(userSkills);
                // Filter jobs based on matching skills in job skills
                const filtered = response.data.jobs.filter(job => {
                    // Check if the job has the 'skills' property
                    if (job.skills) {
                        const jobSkills = job.skills.split(",").map(skill => skill.trim());
                        return jobSkills.some(skill => userSkills.includes(skill));
                    }
                    return false; // If 'skills' property doesn't exist, don't include the job
                });
        
        setJobs(response.data.jobs);
        setFilteredJobs(filtered);
           }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [user.user.skills]);

  const handleApply = (jobId) => {
    user
    ? navigate("/Application", { state: { jobId } })
      : window.confirm("Please login to apply") && navigate("/Login");
  };

  const handleDetailsClick = (job) => {
    setSelectedJob(job);
    setIsPopupOpen(true);
  };

  const handleClick = () => {
    navigate("/Home");
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <>
    <div className='Messages'>
        <SideBar/>
        <div className="messages-container">
        <div className="page-header">
            <h1>Job Matching</h1>
            <div className="notification-navigation">
              <button onClick={handleClick}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay/>
              </div>
            </div>
          </div>
          <div className="messages-info">
            <h3>Recommended jobs</h3>
            <div className="jobs-Recommended-container">
                
                <h5>Showing {filteredJobs.length} results</h5>
                <div className="job-cards-container">
                  {filteredJobs.map((job) => (
                    <div className="job-cards" key={job._id}>
                      <div className="img-div">
                        <img src={job.logo} alt="logo" />
                      </div>
                      <div className="jobInfo">
                        <h4>Company: {job.company}</h4>
                        <p>Job Role: {job.position}</p>
                        <p>Work Type: {job.workType}</p>
                      </div>
                      <div className="apply">
                        <button onClick={() => handleApply(job._id)}>Apply</button>
                        <div className="job-description">
                          <button onClick={() => handleDetailsClick(job)}>
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
           

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
        </div>)}
    </div>
    <Footer/>
    </>
  )
}

export default RecommendedJobs
