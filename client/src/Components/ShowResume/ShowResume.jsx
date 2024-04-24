import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./ShowResume.css";
import { UserContext } from "../../MyContext";

const ShowResume = () => {
  const { user } = useContext(UserContext);
  const [resumeUrl, setResumeUrl] = useState("");

  const fetchResume = async () => {
    try {
      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get("/api/v1/user/get-resume", { responseType: 'blob', headers: headers });

      const resumeBlob = new Blob([response.data], { type: response.headers['content-type'] });
      const resumeUrl = URL.createObjectURL(resumeBlob);
      setResumeUrl(resumeUrl);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  useEffect(() => {
    fetchResume();
  }, [user.user.resume]);

  return (
    <div className="show-resume">
      <button onClick={fetchResume}>View Resume</button>
      {resumeUrl ? (
        <iframe
          src={resumeUrl}
          title="Resume"
          width="100%"
          height="600px"
        ></iframe>
      ) : (
        <div className="">
          <p>No resume available</p>
          <p>Please upload a resume</p>
        </div>
      )}
    </div>
  );
};

export default ShowResume;
