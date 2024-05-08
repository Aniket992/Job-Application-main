import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./FindJobs.css";
import SideBar from "../../Components/SideBar/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContext";
import Footer from "../../Components/Footer/Footer";
import "primeicons/primeicons.css";
import NotificationDisplay from "../../Components/Notificationdisplay/NotificationDisplay";
import { BASE_URL } from "../../apiConfig";
const FindJobs = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state || {};

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    employmentType: "",
    categories: category || "",
    jobLevel: "",
    salaryRange: "",
  });
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/job/get-job`);
        console.log(response.data);
        setJobs(response.data.jobs.reverse());
        setFilteredJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleClick = () => {
    navigate("/Home");
  };

  const handleApply = (jobId) => {
    user
      ? navigate("/Application", { state: { jobId } })
      : window.confirm("Please login to apply") && navigate("/");
  };

  const handleDropdownChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
  };

  useEffect(() => {
    const applyFilters = () => {
      let filteredJobs = jobs.filter((job) => {
        if (
          !filters.employmentType ||
          filters.employmentType === job.workType
        ) {
          if (!filters.categories || filters.categories === job.category) {
            if (!filters.jobLevel || filters.jobLevel === job.level) {
              if (!filters.salaryRange || filters.salaryRange === job.salary) {
                return true;
              }
            }
          }
        }
        return false;
      });
      setFilteredJobs(filteredJobs);
    };
    applyFilters();
  }, [filters, jobs]);

  const handleSearch = () => {
    const positionRegex = new RegExp(searchTitle, "i");
    const locationRegex = new RegExp(searchLocation, "i");

    const filteredJobs = jobs.filter(
      (job) =>
        positionRegex.test(job.position) && locationRegex.test(job.workLocation)
    );

    setFilteredJobs(filteredJobs);
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
      <div className="jobs-page-body">
        <SideBar />
        <div className="jobs-body">
          <div className="page-header">
            {user.user.userType === "jobSeeker" ? (
              <h1>Find Jobs</h1>
            ) : (
              <h1>Post Jobs</h1>
            )}

            <div className="notification-navigation">
              <button onClick={handleClick}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay />
              </div>
            </div>
          </div>
          <hr />
          <div className="job-list">
            <div className="filters">
              <div className="job-searchbar">
                <input
                  type="text"
                  placeholder="Job Title or Keyword"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
              </div>
              <div className="filters-input">
                <h5>Type of Employment</h5>
                <select
                  value={filters.employmentType}
                  onChange={(e) =>
                    handleDropdownChange("employmentType", e.target.value)
                  }
                >
                  <option value="">Select Type of Employment</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="filters-input">
                <h5>Categories</h5>
                <select
                  value={filters.categories}
                  onChange={(e) =>
                    handleDropdownChange("categories", e.target.value)
                  }
                >
                  <option value="">Select Category</option>
                  <option value="Business">Business</option>
                  <option value="Technology">Technology</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Design">Design</option>
                  <option value="Finance">Finance</option>
                  <option value="Human Resource">Human Resource</option>
                </select>
              </div>

              <div className="filters-input">
                <h5>Job Level</h5>
                <select
                  value={filters.jobLevel}
                  onChange={(e) =>
                    handleDropdownChange("jobLevel", e.target.value)
                  }
                >
                  <option value="">Select Job Level</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Director Level">Director Level</option>
                </select>
              </div>

              <div className="filters-input">
                <h5>Salary Range</h5>
                <select
                  value={filters.salaryRange}
                  onChange={(e) =>
                    handleDropdownChange("salaryRange", e.target.value)
                  }
                >
                  <option value="">Select Salary Range/Month</option>
                  <option value="Below ₹30,000">Below ₹30,000</option>
                  <option value="₹30,000 - ₹50,000">₹30,000 - ₹50,000</option>
                  <option value="₹50,000 - ₹80,000">₹50,000 - ₹80,000</option>
                  <option value="Above ₹80,000">Above ₹80,000</option>
                </select>
              </div>
            </div>

            <div className="jobs-container">
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
                      <button onClick={() => handleApply(job._id)}>
                        Apply
                      </button>
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

export default FindJobs;
