import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../MyContext";
import "primeicons/primeicons.css";
import NotificationDisplay from "../../../Components/Notificationdisplay/NotificationDisplay";
import SideBar from "../../../Components/SideBar/SideBar";

const FindCandidates = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const [candidates, setCandidates] = useState([]);
  const [resumeUrl, setResumeUrl] = useState("");
  const [candidateId, setCandidateId] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = user.token;
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get("/api/v1/user/get-candidates", { headers: headers });
        setCandidates(response.data.candidates);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    if (candidateId) {
      fetchResume();
    }
  }, [candidateId]);

  const handleFetchResume = (candidateId) => {
    setCandidateId(candidateId);
  };

  const fetchResume = async () => {
    try {
      console.log(candidateId);
      const response = await axios.get("/api/v1/user/get-userResume", {
        responseType: 'blob',
        params: { candidateId: candidateId } // Sending candidateId as query parameter
      });
      const resumeBlob = new Blob([response.data], { type: response.headers['content-type'] });
      const resumeUrl = URL.createObjectURL(resumeBlob);
      console.log(resumeUrl);
      setResumeUrl(resumeUrl);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  return (
    <>
      <div className="jobs-page-body">
        <SideBar />
        <div className="jobs-body">
          <div className="page-header">
            <h1>Find Candidates</h1>
            <div className="notification-navigation">
              <button onClick={handleClick}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay />
              </div>
            </div>
          </div>
          <hr />
          <div>
            <h2>Candidate List</h2>
            <ul>
              {candidates.map((candidate) => (
                <li key={candidate._id}>
                  <h3>{candidate.name}</h3>
                  <p>Email: {candidate.email}</p>
                  {/* Add other candidate details here */}
                  <button onClick={() => handleFetchResume(candidate._id)}>View Resume</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="show-resumes">
            {resumeUrl ? (
              <iframe
                src={resumeUrl}
                title="Resume"
                width="50%"
                height="600px"
              ></iframe>
            ) : (
              <div className="">
                <p>No resume available</p>
                <p>Please upload a resume</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FindCandidates;
