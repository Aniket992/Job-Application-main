import axios from "axios";
import "./PostJob.css";
import { UserContext } from "../../MyContext";
import React, { useContext, useState, useEffect } from "react";
import { BASE_URL } from '../../apiConfig'; 

const PostJob = ({ onJobPosted }) => {
  const { user, setUser } = useContext(UserContext);
  const [jobData, setJobData] = useState({
    logo: "",
    company: "",
    position: "",
    workType: "full-time",
    workLocation: "Pan-India",
    salary: "",
    category: "",
    jobDescription: "",
    eligibility: "",
    perks: "",
    skills: "",
    level: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    const requiredFields = [
      "logo",
      "company",
      "position",
      "workType",
      "workLocation",
      "salary",
      "category",
      "jobDescription",
      "eligibility",
      "perks",
      "skills",
      "level",
    ];
    const emptyFields = requiredFields.filter((field) => !jobData[field]);

    if (emptyFields.length > 0) {
      alert(`Please fill in all required fields: ${emptyFields.join(", ")}`);
      return;
    }

    try {
      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      console.log(jobData);
      const response = await axios.post(
        `${BASE_URL}/api/v1/job/post-job`,
        jobData,

        { headers: headers }
      );
      console.log(response.data);
      alert("success");
      onJobPosted();
    } catch (error) {
      alert(error);
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="post-job-container">
      {/* <h2>Provide job details</h2> */}
      <form className="post-job-form " onSubmit={handleSubmit}>
        <label>
          Logo link:
          <input
            type="text"
            name="logo"
            value={jobData.logo}
            onChange={handleChange}
          />
        </label>
        <label>
          Company Name:
          <input
            type="text"
            name="company"
            value={ jobData.company}
            onChange={handleChange}
          />
        </label>
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={jobData.position}
            onChange={handleChange}
          />
        </label>
        <label>
          Work Type:
          <select
            name="workType"
            value={jobData.workType}
            onChange={handleChange}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
           </select>
        </label>
        <label>
          Work Location:
          <input
            type="text"
            name="workLocation"
            value={jobData.workLocation}
            onChange={handleChange}
          />
        </label>
        <label>
          Salary:
          <select name="salary" value={jobData.salary} onChange={handleChange}>
            <option value="">Select Salary Range/Month</option>
            <option value="Below ₹30,000">Below ₹30,000</option>
            <option value="₹30,000 - ₹50,000">₹30,000 - ₹50,000</option>
            <option value="₹50,000 - ₹80,000">₹50,000 - ₹80,000</option>
            <option value="Above ₹80,000">Above ₹80,000</option>
          </select>
        </label>
        <label>
          Category:
          <select
            name="category"
            value={jobData.category}
            onChange={handleChange}
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
        </label>

        <label>
          Eligibility:
          <input
            type="text"
            name="eligibility"
            value={jobData.eligibility}
            onChange={handleChange}
          />
        </label>
        <label>
          skills:
          <input
            type="text"
            name="skills"
            value={jobData.skills}
            onChange={handleChange}
          />
        </label>
        <label>
          Level:
          <select name="level" value={jobData.level} onChange={handleChange}>
            <option value="">Select Job Level</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
            <option value="Director Level">Director Level</option>
          </select>
        </label>
        <label>
          Job Description:
          <textarea
            name="jobDescription"
            value={jobData.jobDescription}
            onChange={handleChange}
          />
        </label>
        <label>
          Perks:
          <textarea
            name="perks"
            value={jobData.perks}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
