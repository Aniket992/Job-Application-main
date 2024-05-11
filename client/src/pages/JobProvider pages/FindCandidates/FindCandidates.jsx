import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../MyContext";
import "primeicons/primeicons.css";
import NotificationDisplay from "../../../Components/Notificationdisplay/NotificationDisplay";
import SideBar from "../../../Components/SideBar/SideBar";
import "./FindCandidates.css";
import { BASE_URL } from '../../../apiConfig'; 
import Footer from "../../../Components/Footer/Footer";

const FindCandidates = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState([]);
  const [resumeUrl, setResumeUrl] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]); 
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

  const handleFetchResume = async (candidateId) => {
    fetchCandidate(candidateId);
    setCandidateId(candidateId);
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/user/get-userResume`, {
        responseType: 'blob',
        params: { candidateId } // Sending candidateId as query parameter
      });
      const resumeBlob = new Blob([response.data], { type: response.headers['content-type'] });
      const resumeUrl = URL.createObjectURL(resumeBlob);
      setResumeUrl(resumeUrl);
      console.log(resumeUrl);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  const fetchCandidate = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/user/get-candidate/${userId}`);
      setCandidate(response.data); 
    } catch (error) {
      console.error("Error fetching candidate details:", error);
    }
  };

  const fetchApplicants = async (jobId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/application/applicants/${jobId}`);
      // Update applications state with fetched applicants and set the initial status to "Applied"
      const updatedApplications = response.data.applicants.map(application => ({
        ...application,
        status: "Applied"
      }));
      setApplications(updatedApplications);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      // Make API call to update the status
      await axios.put(`${BASE_URL}/api/v1/application/statusUpdate/${applicationId}`, { status: newStatus });
      // Update the status in the local state
      setApplications(prevApplications => prevApplications.map(application => {
        if (application._id === applicationId) {
          return { ...application, status: newStatus };
        }
        return application;
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <div className="jobs-page-body">
        <SideBar />
        <div className="jobs-body">
          <div className="page-header">
            <h1>Find Candidates</h1>
            <div className="notification-navigation">
              <button onClick={() => navigate("/Home")}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay />
              </div>
            </div>
          </div>
          <hr />
          <div className="candidates-container">
            <div className="candi-jobs">
              Job posted
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
                          <button onClick={() => fetchApplicants(job._id)}>View Applicants</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="candi-applications">
              Applications
              <div className="applications-candidate">
                {applications.map((application) => (
                  <li key={application._id}>
                    <h3>{application.name}</h3>
                    <p>Status: {application.status}</p>
                    <select onChange={(e) => handleStatusChange(application._id, e.target.value)}>
                      <option value="Applied">Applied</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interviewed">Interviewed</option>
                      <option value="Hired">Hired</option>
                    </select>
                    <button onClick={() => handleFetchResume(application.userId)}>View Resume</button>
                    <p>Email: {application.email}</p>
                  </li>
                ))}
              </div>
            </div>
            <div className="applicant">
              {candidate && (
                <>
                  <h3>{candidate.name} {candidate.lastName}</h3>
                  <h4>Education:</h4>
                  <ul>
                    {candidate.education && candidate.education.map((edu, index) => (
                      <li key={index}>
                        {edu.level} - {edu.institute} ({edu.year})
                      </li>
                    ))}
                  </ul>
                  <h4>Experience:</h4>
                  <ul>
                    {candidate.experience && candidate.experience.map((exp, index) => (
                      <li key={index}>
                        {exp.position} at {exp.company} ({exp.duration})
                      </li>
                    ))}
                  </ul>
                  <h4>Skills:</h4>
                  <ul>
                    {candidate.skills && candidate.skills.map((skill, index) => (
                      <li key={index}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <div className="show-resumes">
                {resumeUrl ? (
                  <iframe src={resumeUrl} title="Resume" width="100%" height="290px"></iframe>
                ) : (
                  <div className="">
                    <p>please select applicant</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default FindCandidates;
