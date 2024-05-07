import { UserContext } from "../../MyContext";
import React, { useContext, useState, useEffect } from "react";
import "./ProviderProfile.css";
import { ToastContainer, Zoom, toast } from "react-toastify";
import axios from "axios";

const ProviderProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [newLocation, setNewLocation] = useState(user.user.location || "");
  const [companyName, setCompanyName] = useState(user.user.companyName || "");
  const [logo, setLogo] = useState(user.user.companyLogo || "");

  const handleLocationChange = (e) => {
    setNewLocation(e.target.value);
  };

  const handleNameChange = (e) => {
    setCompanyName(e.target.value);
  };
  const handleLogoChange = (e) => {
    setLogo(e.target.value);
  };
  const updateLocation = async () => {
    if (!newLocation) {
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
  const updateCompanyInfo = async () => {
    if (!logo || !companyName) {
      toast.error("please provide Logo Link and Company Name");
      return;
    }
    try {
      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.put(
        "/api/v1/user/update-CompanyInfo",
        { logo: logo, companyName: companyName },
        { headers: headers }
      );

      setUser({
        ...user,
        user: { ...user.user, companyLogo: logo, companyName: companyName },
      });
      toast.success("Info Updated");
      console.log(" updated info:", response.data);
    } catch (error) {
      console.error("Error updating  info:", error);
      toast.error("Error updating info");
    }
  };
  console.log(user.user.companyLogo);
  return (
    <div className="Provider">
      <div className="main-profile-container">
        <div className="Pbasicdetails-container">
          <div className="logo-name-container">
          <img src={user.user.companyLogo} alt="Logo" crossorigin="anonymous" />

            <label>
              <p>Company Name: </p>

              <input
                type="text"
                placeholder="companyName"
                value={companyName}
                onChange={handleNameChange}
              />
            </label>
            <label>
              <p>Company Logo: </p>

              <input
                type="text"
                placeholder="Logo Link"
                value={logo}
                onChange={handleLogoChange}
              />
            </label>
            <button onClick={updateCompanyInfo}>Update Info</button>
          </div>
          <div className="Pbasic-details-container">
            <p></p>
            <p> <b>Hr Name:</b>     {user.user.name} {user.user.lastName}</p>
            <p></p>
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
      </div>
    </div>
  );
};

export default ProviderProfile;
