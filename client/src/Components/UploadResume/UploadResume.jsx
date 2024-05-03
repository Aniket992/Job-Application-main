import React, { useState, useContext } from "react";
import "./UploadResume.css"
import { UserContext } from "../../MyContext";
import axios from "axios";

const UploadResume = () => {
    const { user,setUser } = useContext(UserContext);
    const [resumeFile, setResumeFile] = useState(null);

    const handleResumeUpload = (e) => {
        setResumeFile(e.target.files[0]);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!resumeFile) {
          alert("Please upload your resume.");
          return;
        }
    
        try {
          const formData = new FormData();
          formData.append("resume", resumeFile);
    
          const token = user.token;
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };
          const response = await axios.post("http://localhost:8080/api/v1/user/upload-resume", formData, {
            headers: headers,
          });
          setUser({
            ...user,
            user: { ...user.user, resume: response.data.resume },
          });
          console.log(response.data.resume)
          alert("Resume uploaded successfully");
          console.log("Resume uploaded successfully:", response.data);
        } catch (error) {
          console.error("Error uploading resume:", error);
        }
      };

  return (
    <div>
       <div className="resume-resumeBox">
       Upload Resume:

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="application-form">
          <div className="resumeBox">
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
    </div>
  )
}

export default UploadResume
