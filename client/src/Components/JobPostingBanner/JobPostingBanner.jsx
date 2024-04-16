import React from "react";
import "./JobPostingBanner.css";
import { useNavigate } from "react-router-dom";
const JobPostingBanner = () => {
const navigate=useNavigate();
const handleclick =() =>{
  navigate("/Register")
}
  return (
    <div>
      <div className="JobPostingBanner-container">
        <p>Start posting jobs today</p>
        <h5>simplified recruiting process</h5>
        <button onClick={handleclick}>Sign Up For Free</button>
      </div>
    </div>
  );
};

export default JobPostingBanner;
