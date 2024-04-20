import "./BasicDetails.css";
import { UserContext } from "../../MyContext";
import React, { useContext, useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import EducationDetails from "../EducationDetails/EducationDetails";
import ExperienceDetails from "../ExperienceDetails/ExperienceDetails";
import Skills from "../Skills/Skills";
import ShowResume from "../ShowResume/ShowResume";
import UploadResume from "../UploadResume/UploadResume";

const BasicDetails = () => {
  const { user, setUser } = useContext(UserContext);
  const [newLocation, setNewLocation] = useState(user.user.location || "");

  const handleLocationChange = (e) => {
    setNewLocation(e.target.value);
  };


  const updateLocation = async () => {
    if(!newLocation){
      toast.error("please provide location");
      return;
    }
    try {
      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.put(
        "/api/v1/user/update-location",
        { location: newLocation },
        { headers: headers }
      );

      setUser({ ...user, user: { ...user.user, location: newLocation } });
      toast.success("Location Updated");
      console.log("Location updated:", response.data);
    } catch (error) {
      console.error("Error updating location:", error);
      toast.error("Error updating location");
    }
  };


  return (
    <div className="main-profile-container">

    <div className="basicdetails-container">
      <div className="basic-details-container">
        <p>{user.user.name}</p>
        <p>{user.user.lastName}</p>
        <p>{user.user.email}</p>
        <div className="location-update">
          <p>Location: </p>
          <input
            type="text"
            placeholder="New Location"
            value={newLocation}
            onChange={handleLocationChange}
          />
          <button onClick={updateLocation}>Update Location</button>
        </div>
      </div>
      <EducationDetails/>
      <ExperienceDetails/>
      <div className="skill-resume-container">
      <Skills/>
      <UploadResume/>
      </div>
    
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </div>
    <ShowResume/>
    </div>

  );
};

export default BasicDetails;
