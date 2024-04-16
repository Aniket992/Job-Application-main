import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./FindJobs.css";
import SideBar from "../../Components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContext";
import bell from "../../Assets/notification-icon.png";
import Footer from "../../Components/Footer/Footer";
import "primeicons/primeicons.css";
import NotificationDisplay from "../../Components/Notificationdisplay/NotificationDisplay";

const FindJobs = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    employmentType: [],
    categories: [],
    jobLevel: [],
    salaryRange: [],
  });
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/job/get-job`
        );
        setJobs(response.data.jobs);
        setFilteredJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleClick = () => {
    navigate("/");
  };

  const handleApply = () => {
    user
      ? navigate("/Application")
      : window.confirm("Please login to apply") && navigate("/Login");
  };

  const handleCheckboxChange = (filterType, value) => {
    const updatedFilters = { ...filters };
    if (updatedFilters[filterType].includes(value)) {
      updatedFilters[filterType] = updatedFilters[filterType].filter(
        (item) => item !== value
      );
    } else {
      updatedFilters[filterType] = [...updatedFilters[filterType], value];
    }
    setFilters(updatedFilters);
  };

  useEffect(() => {
    const applyFilters = () => {
      let filteredJobs = jobs.filter((job) => {
        if (
          filters.employmentType.length === 0 ||
          filters.employmentType.includes(job.workType)
        ) {
          if (
            filters.categories.length === 0 ||
            filters.categories.includes(job.category)
          ) {
            if (
              filters.jobLevel.length === 0 ||
              filters.jobLevel.includes(job.jobLevel)
            ) {
              if (
                filters.salaryRange.length === 0 ||
                filters.salaryRange.includes(job.salary)
              ) {
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
    console.log(job);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const renderFilterOptions = (options, filterType) => {
    return options.map((option) => (
      <div key={option}>
        <label>
          <input
            type="checkbox"
            value={option}
            onChange={() => handleCheckboxChange(filterType, option)}
            checked={filters[filterType].includes(option)}
          />
          {option}
        </label>
      </div>
    ));
  };

  return (
    <>
      <div className="jobs-page-body">
        <SideBar />
        <div className="jobs-body">
          <div className="page-header">
            <h1>Find Jobs</h1>
            <div className="notification-navigation">
              <button onClick={handleClick}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay />
              </div>
            </div>
          </div>
          <hr />
          <div className="job-searchbar">
            <input
              type="text"
              placeholder="Job Title or Keyword"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <div className="vertical-line"></div>
            <input
              type="text"
              placeholder="Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <p>popular:UI/UX Designer, Android Developer, Accountant</p>
          <hr />
          <div className="job-list">
            <div className="filters">
              <h3>Type of Employment</h3>
              {renderFilterOptions(
                ["full-time", "Part-time", "Contract", "Freelance"],
                "employmentType"
              )}

              <h3>Categories</h3>
              {renderFilterOptions(
                ["Technology", "Finance", "Healthcare", "Education"],
                "categories"
              )}

              <h3>Job Level</h3>
              {renderFilterOptions(
                ["Entry Level", "Mid Level", "Senior Level"],
                "jobLevel"
              )}

              <h3>Salary Range</h3>
              {renderFilterOptions(
                [
                  "Below $30,000",
                  "$30,000 - $50,000",
                  "$50,000 - $80,000",
                  "Above $80,000",
                ],
                "salaryRange"
              )}
            </div>

            <div className="jobs-container">
              <div className="sorting">
                <h1>
                  All Jobs <h5>showing {filteredJobs.length} results</h5>
                </h1>
                <p>page: 1/2</p>
                <p>Sort By</p>
              </div>
              {filteredJobs.map((job) => (
                <div className="job-cards" key={job._id}>
                  <div className="img-div">
                    <img src={job.logo} alt="logo" />
                  </div>
                  <div className="jobInfo ">
                    <h4>Company: {job.company}</h4>
                    <p>Job Role: {job.position}</p>
                    <p>Work Type: {job.workType}</p>
                  </div>
                  <div className="apply">
                    <button onClick={handleApply}> Apply</button>
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
      <Footer />
    </>
  );
};

export default FindJobs;
