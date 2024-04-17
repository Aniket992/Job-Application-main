import "./BasicDetails.css";
import { UserContext } from "../../MyContext";
import React, { useContext, useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import EducationDetails from "../EducationDetails/EducationDetails";

const BasicDetails = () => {
  const { user, setUser } = useContext(UserContext);
  const [newLocation, setNewLocation] = useState(user.user.location || "");

  const handleLocationChange = (e) => {
    setNewLocation(e.target.value);
  };

  const notify = () => {
    toast.success("Location Updated");
  };
  const updateLocation = async () => {
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
      notify();
      console.log("Location updated:", response.data);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };


  return (
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
      <ToastContainer
        position="top-center"
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
  );
};

export default BasicDetails;
