import axios from "axios";
import "./EducationDetails.css";
import { UserContext } from "../../MyContext";
import React, { useContext, useState, useEffect } from "react";

const EducationDetails = () => {
  const { user, setUser } = useContext(UserContext);

  const [education1, setEducation1] = useState(
    user.user.education
      ? user.user.education[0]
      : {
          level: "",
          institute: "",
          percentage: "",
          year: "",
        }
  );
  const [education2, setEducation2] = useState(
    user.user.education
      ? user.user.education[1]
      : {
          level: "",
          institute: "",
          percentage: "",
          year: "",
        }
  );
  const handleInputChange = (e, education, setEducation) => {
    const { name, value } = e.target;
    setEducation({ ...education, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.put(
        "/api/v1/user/update-education",
        {
          educations: [education1, education2],
        },
        { headers: headers }
      );
      setUser({
        ...user,
        user: { ...user.user, education: [education1, education2] },
      });

      console.log("Education details submitted:", response.data);
    } catch (error) {
      console.error("Error submitting education details:", error);
      // Optionally, you can handle errors (e.g., show an error message)
    }
  };

  return (
    <div >
      <form className="education-details-containers" onSubmit={handleSubmit}>

        <div className="education1-container">
            <p>education 1</p>
          <div className="form-group-container">
            <label>Level:</label>
            <select
              name="level"
              value={education1.level}
              onChange={(e) => handleInputChange(e, education1, setEducation1)}
              required
            >
              <option value="">Select level</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
            </select>
          </div>
          <div className="form-group-container">
            <label>Institute Name:</label>
            <input
              type="text"
              name="institute"
              value={education1.institute}
              onChange={(e) => handleInputChange(e, education1, setEducation1)}
              required
            />
          </div>
          <div className="form-group-container">
            <label>Percentage:</label>
            <input
              type="text"
              name="percentage"
              value={education1.percentage}
              onChange={(e) => handleInputChange(e, education1, setEducation1)}
              required
            />
          </div>
          <div className="form-group-container">
            <label>Year:</label>
            <input
              type="text"
              name="year"
              value={education1.year}
              onChange={(e) => handleInputChange(e, education1, setEducation1)}
              required
            />
          </div>
        </div>

        <div className="education2-container">
        <p>education 1</p>
          <div className="form-group-container">
            <label>Level:</label>
            <select
              name="level"
              value={education2.level}
              onChange={(e) => handleInputChange(e, education2, setEducation2)}
              required
            >
              <option value="">Select level</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
            </select>
          </div>
          <div className="form-group-container">
            <label>Institute Name:</label>
            <input
              type="text"
              name="institute"
              value={education2.institute}
              onChange={(e) => handleInputChange(e, education2, setEducation2)}
              required
            />
          </div>
          <div className="form-group-container">
            <label>Percentage:</label>
            <input
              type="text"
              name="percentage"
              value={education2.percentage}
              onChange={(e) => handleInputChange(e, education2, setEducation2)}
              required
            />
          </div>
          <div className="form-group-container">
            <label>Year:</label>
            <input
              type="text"
              name="year"
              value={education2.year}
              onChange={(e) => handleInputChange(e, education2, setEducation2)}
              required
            />
          </div>
        </div>

        <button type="submit">Update Education</button>
      </form>
    </div>
  );
};

export default EducationDetails;
