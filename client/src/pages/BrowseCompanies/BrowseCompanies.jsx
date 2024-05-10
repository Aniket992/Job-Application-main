import React, { useContext, useState, useEffect } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import NotificationDisplay from "../../Components/Notificationdisplay/NotificationDisplay";
import { useNavigate } from "react-router-dom";
import "./BrowseCompanies.css";
import { UserContext } from "../../MyContext";
import axios from "axios";
import { BASE_URL } from "../../apiConfig";
import Footer from "../../Components/Footer/Footer";

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
        const response = await axios.get(`${BASE_URL}/api/v1/job/companies`);
        setCompanies(response.data.companies.reverse());
        setSelectedCompany(response.data.companies[0]);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const fetchJobs = async (company) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/job/provider/${company._id}`
      );

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
      : window.confirm("Please login to apply") && navigate("/");
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
    <>
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
                  <div className="img-div">
                    <img src={company.companyLogo} alt="logo" />
                  </div>
                  <div className="jobInfo">
                  <h2>{company.companyName}</h2>
                  <p>{company.email}</p>
                  </div>
                  <p>{company.location}</p>

                </div>
              ))}
            </div>
            <div className="company-info">
              {selectedCompany && (
                <div className="company-description">
                  <h2>Company Name:{selectedCompany.companyName}</h2>
                  <h3>Hr Name: {selectedCompany.name}</h3>
                  <p>{selectedCompany.about}</p>
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
                                <button onClick={() => handleApply(job._id)}>
                                  Apply
                                </button>
                                <div className="job-description">
                                  <button
                                    onClick={() => handleDetailsClick(job)}
                                  >
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

    </div>
    <Footer/>

    </>
  );
};

export default BrowseCompanies;
