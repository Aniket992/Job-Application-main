import React, { useContext, useState , useEffect} from "react";
import axios from "axios";
import { UserContext } from "../../MyContext";
import "./Application.css";
import SideBar from "../../Components/SideBar/SideBar";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from '../../apiConfig'; 

const Application = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [resume, setResume] = useState(null);
  const location = useLocation();
  const [profileComplete, setProfileComplete] = useState(true); // Assuming profile is initially complete

  useEffect(() => {
    // Check if all necessary user fields are available
    if (
      !user.user.name ||
      !user.user.lastName ||
      !user.user.email ||
      !user.user.skills ||
      !user.user.experience.length ||
      !user.user.education.length ||
      user.user.experience.some(exp => !exp.position || !exp.company || !exp.duration || !exp.startingYear) ||
      user.user.education.some(edu => !edu.level || !edu.institute || !edu.percentage || !edu.year)
    ) {
      setProfileComplete(false);
    }
  }, [user]);

  const redirectToSettings = () => {
    navigate("/Settings");
  };


  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

  

    const jobId = location.state.jobId;

    try {
      const formData = new FormData();
      formData.append("name", user.user.name);
      formData.append("lastName", user.user.lastName);
      formData.append("email", user.user.email);
      formData.append("skills", user.user.skills);
      formData.append("education", JSON.stringify(user.user.education));
      formData.append("experience", JSON.stringify(user.user.experience));
      formData.append("resume", resume);
      formData.append("jobId", jobId);

      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(
        `${BASE_URL}/api/v1/application/upload`,
        formData,
        { headers: headers }
      );

      alert("Application submitted successfully");
      console.log("Application submitted successfully:", response.data);
      navigate("/FindJobs");
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="application-container">
      <SideBar />
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="application-form"
      >
        <div className="Details">
          <p>Name: {user.user.name}</p>
          <p>Last Name: {user.user.lastName}</p>
          <p>Email: {user.user.email}</p>
        </div>
        <div className="userExperiences">
          <h3>Experiences:</h3>
          {user.user.experience.map((exp, index) => (
            <div key={index}>
              <p>POSITION:{exp.position} </p>
              <p>COMPANY NAME:{exp.company}</p>
              <p>DURATION:{exp.duration}</p>
              <p>YEAR:{exp.startingYear}</p>
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
      {!profileComplete && (
       <div className="popup-overlay">
       <div className="popup-content">
         <p>Please complete your profile before applying.</p>
         <button onClick={redirectToSettings}>Go to Settings</button>
       </div>
     </div>
      )}
    </div>
  );
};

export default Application;
