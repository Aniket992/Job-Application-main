import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../MyContext";
import "./Application.css";
import SideBar from "../../Components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
const Application = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [resume, setResume] = useState(null);

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    if(resume==null){
      alert("please upload resume");
      return;
    }
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("resume", resume);
      formDataToSend.append("name", user.user.name);
      formDataToSend.append("lastName", user.user.lastName);
      formDataToSend.append("email", user.user.email);
      formDataToSend.append("contact", user.user.contact);
      formDataToSend.append("experience", JSON.stringify(user.user.experience));
      formDataToSend.append("skills", user.user.skills);
      formDataToSend.append("education", JSON.stringify(user.user.education));

      const response = await axios.post(
        "http://localhost:8080/api/v1/application/upload",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("application submitted successfully")
      console.log("Application submitted successfully:", response.data);
      navigate("/FindJobs");
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="application-container">
      <SideBar/>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="application-form"
      >
        <div className="Details">
        <p>Name: {user.user.name}</p>
        <p>Last Name: {user.user.lastName}</p>
        <p>Email: {user.user.email}</p>
        <p>Contact: {user.user.contact}</p>
        </div>
        <div className="userExperiences">
          <h3>Experiences:</h3>
          {user.user.experience.map((exp, index) => (
            <div key={index}>
              <p>POSITION:{exp.position} </p>
              <p>COMPANY NAME:{exp.company}</p>
              <p>DURATION:{exp.duration}</p>
              <p>YEAR:{exp.year}</p>
            </div>
          ))}
        </div>
        <div className="skillsBox">
        <h3>Skills:</h3>
        <p> {user.user.skills}</p>
        </div>

        <div className="userEducation">
        <h3>Qualifications:</h3>
          {user.user.education.map((edu, index) => (
            <div key={index}>
              <p> LEVEL:{edu.level}</p>
              <p>INSTITUTE NAME:{edu.institute}</p>
              <p>PERCENT:{edu.percentage}</p>
              <p>YEAR: {edu.year}</p>
            </div>
          ))}
        </div>
        <div className="resumeBox">
          Upload Resume:
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleResumeUpload}
          />
                  <button type="submit">Submit Application</button>

        </div>
      </form>
    </div>
  );
};

export default Application;
