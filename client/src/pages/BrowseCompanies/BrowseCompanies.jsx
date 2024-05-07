import React, { useContext, useState, useEffect } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import NotificationDisplay from "../../Components/Notificationdisplay/NotificationDisplay";
import { useNavigate } from "react-router-dom";
import "./BrowseCompanies.css";
import { UserContext } from "../../MyContext";
import axios from "axios";

const BrowseCompanies = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Home");
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/job/companies"
        );
        setCompanies(response.data.companies);
        setSelectedCompany(response.data.companies[0]);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const fetchJobs = async (company) => {
    try {
      const response = await axios.get(`/api/v1/job/provider/${company._id}`);
    
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = (jobId) => {
    user
    ? navigate("/Application", { state: { jobId } })
      : window.confirm("Please login to apply") && navigate("/Login");
  };

  const handleCompanyClick = (company) => {
    setJobs(null);
    setSelectedCompany(company);
    console.log(company);
    fetchJobs(company);
  };
  const handleDetailsClick = (job) => {
    setSelectedJob(job);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="BrowseCompanies">
      <SideBar />
      <div className="BrowseCompanies-container">
        <div className="page-header">
          <h1>Find Companies</h1>
          <div className="notification-navigation">
            <button onClick={handleClick}>Back to HomePage</button>
            <div className="notification">
              <NotificationDisplay />
            </div>
          </div>
        </div>

        {user.user.userType === "jobProvider" ? (
          <div className="job-provider-container">
            <h1>Get Right Candidate</h1>
            {/* Add content specific to job providers here */}
          </div>
        ) : (
          <div className="browse-companies-container">
            <div className="company-list">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="company-card"
                  onClick={() => handleCompanyClick(company)}
                >
                  <h2>{company.name}</h2>
                  <p>{company.email}</p>
                </div>
              ))}
            </div>
            <div className="company-info">
              {selectedCompany && (
                <div className="company-description">
                  <h2>Company Name:</h2>
                  <h3>Hr Name: {selectedCompany.name}</h3>
                  <p>{selectedCompany.description}</p>
                  <p>{selectedCompany.email}</p>

                  <p>Openings</p>
                  <div className="BopeningJobs">
                    <div className="Bjob-posted-container">
                      {isLoading ? (
                        <p>select company to view jobs</p>
                      ) : !jobs ? (
                        <p>No jobs found</p>
                      ) : (
                        <div className="Bjob-posted">
                          
                          {jobs.map((job) => (
                         
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
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <h2>Job Description</h2>
            <h3>Company name:</h3>
            <p>{selectedJob.company}</p>
            <h3>Position:</h3>
            <p>{selectedJob.position}</p>
            <h3>Work Location</h3>
            <p>{selectedJob.workLocation}</p>
            <h3>Work Type:</h3>
            <p>{selectedJob.workType}</p>
            <h3>Salary:</h3>
            <p>{selectedJob.salary}</p>
            <h3> Work Details:</h3>
            <p>{selectedJob.jobDescription}</p>
            <h3>Eligibility</h3>
            <p>{selectedJob.eligibility}</p>
            <h3>Perks:</h3>
            <p>{selectedJob.perks}</p>
            <h3>Application Status</h3>
            <p>{selectedJob.status}</p>

            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseCompanies;
