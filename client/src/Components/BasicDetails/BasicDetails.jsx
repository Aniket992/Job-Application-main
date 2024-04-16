import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./BasicDetails.css";
import { UserContext } from "../../MyContext";
import { useNavigate } from "react-router-dom";

const UpdateUserForm = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: "",
    education: user ? user.user.education.slice(0, 2) : [{ level: "", institute: "", percentage: "", year: "" }],
    experience: user ? user.user.experience.slice(0, 2) : [{ company: "", position: "", duration: "", year: "" }],
    skills: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        location: user.user.location || "",
        education: user.user.education.slice(0, 2) || [{ level: "", institute: "", percentage: "", year: "" }],
        experience: user.user.experience.slice(0, 2) || [{ company: "", position: "", duration: "", year: "" }],
        skills: user.user.skills || "",
      });
    }
  }, [user]);

  const handleInputChange = (e, index, section) => {
    const { name, value } = e.target;
    const updatedData = formData[section].map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormData({ ...formData, [section]: updatedData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = user.token;

    // Set up the request headers with the token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.put("/api/v1/user/update-user", formData, {
        headers: headers,
      });
      console.log("User details updated:", response.data);
      setUser(response.data);

      // Reset form data after successful submission
      setFormData({
        location: "",
        education: [{ level: "", institute: "", percentage: "", year: "" }],
        experience: [{ company: "", position: "", duration: "", year: "" }],
        skills: "",
      });
      navigate('/Profile');
      // Update user in context
      // Handle any further actions after submission, like redirecting the user
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const addEducation = () => {
    if (formData.education.length < 2) {
      setFormData({
        ...formData,
        education: [
          ...formData.education,
          { level: "", institute: "", percentage: "", year: "" }
        ]
      });
    }
  };

  const addExperience = () => {
    if (formData.experience.length < 2) {
      setFormData({
        ...formData,
        experience: [
          ...formData.experience,
          { company: "", position: "", duration: "", year: "" }
        ]
      });
    }
  };

  return (
    <>
      {user ? (
        <div className="details">
          <form className="details-form" onSubmit={handleSubmit}>
            <div className="userbasic">
              <h3>{user.user.name}</h3>
              <h3>{user.user.lastName}</h3>
              <h3>{user.user.email}</h3>
              <input
                placeholder="Location"
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <h3>Education (up to two)</h3>
            <div className="education-form">
              {formData.education.map((edu, index) => (
                <div className="educationbox" key={index}>
                  <input
                    placeholder="Education Level (e.g., 10th, 12th, Btech...)"
                    type="text"
                    name="level"
                    value={edu.level}
                    onChange={(e) => handleInputChange(e, index, "education")}
                  />
                  <input
                    placeholder="Institute Name"
                    type="text"
                    name="institute"
                    value={edu.institute}
                    onChange={(e) => handleInputChange(e, index, "education")}
                  />
                  <input
                    placeholder="Percentage (0-100)"
                    type="text"
                    name="percentage"
                    value={edu.percentage}
                    onChange={(e) => handleInputChange(e, index, "education")}
                  />
                  <input
                    placeholder="Year (e.g., 2024)"
                    type="text"
                    name="year"
                    value={edu.year}
                    onChange={(e) => handleInputChange(e, index, "education")}
                  />
                </div>
              ))}
              <button type="button" onClick={addEducation}>Add Education</button>
            </div>

            <h3>Experience (up to two)</h3>
            <div className="experience-form">
              {formData.experience.map((exp, index) => (
                <div className="experiencebox" key={index}>
                  <input
                    placeholder="Company Name"
                    type="text"
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleInputChange(e, index, "experience")}
                  />
                  <input
                    placeholder="Position"
                    type="text"
                    name="position"
                    value={exp.position}
                    onChange={(e) => handleInputChange(e, index, "experience")}
                  />
                  <input
                    placeholder="Duration (e.g., 1 year, 2 months...)"
                    type="text"
                    name="duration"
                    value={exp.duration}
                    onChange={(e) => handleInputChange(e, index, "experience")}
                  />
                  <input
                    placeholder="Year (e.g., 2024)"
                    type="text"
                    name="year"
                    value={exp.year}
                    onChange={(e) => handleInputChange(e, index, "experience")}
                  />
                </div>
              ))}
              <button type="button" onClick={addExperience}>Add Experience</button>
            </div>

            <input
              placeholder="Skills"
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />

            <button type="submit">Update Details</button>
          </form>
        </div>
      ) : (
        <div className="no-user">
          <h1>Please Login to update your Profile</h1>
        </div>
      )}
    </>
  );
};

export default UpdateUserForm;
