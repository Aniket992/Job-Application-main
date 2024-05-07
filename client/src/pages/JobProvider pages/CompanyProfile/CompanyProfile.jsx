import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../MyContext";
import "./CompanyProfile.css";
import "primeicons/primeicons.css";
import NotificationDisplay from "../../../Components/Notificationdisplay/NotificationDisplay";
import SideBar from "../../../Components/SideBar/SideBar";

const CompanyProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditingText, setIsEditingText] = useState(false);
  const [text, setText] = useState(user.user.text);
  const [remainingChars, setRemainingChars] = useState(100);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [about, setAbout] = useState(user.user.about);

  const handleClick = () => {
    navigate("/Home");
  };

  const handleEditTextClick = () => {
    setIsEditingText(true);
  };

  const handleSaveTextClick = async () => {
    setIsEditingText(false);
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/user/updateText",
        { text: text },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Text updated:", response.data);
    } catch (error) {
      console.error("Error updating text:", error);
    }
  };

  const handleAboutEditClick = () => {
    setIsEditingAbout(true);
  };

  const handleAboutSaveClick = async () => {
    setIsEditingAbout(false);
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/user/updateAbout",
        { about: about },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("About updated:", response.data);
    } catch (error) {
      console.error("Error updating about:", error);
    }
  };

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= 120) {
      setText(inputText);
      setRemainingChars(120 - inputText.length);
    }
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  return (
    <>
      <div className="jobs-page-body">
        <SideBar />
        <div className="jobs-body">
          <div className="page-header">
            <h1>Company Profile</h1>
            <div className="notification-navigation">
              <button onClick={handleClick}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay />
              </div>
            </div>
          </div>
          <hr />

          {user ? (
            <div className="info-container">
              <div className="main-info">
                <div className="profile-cover">
                  <div className="bgtext">
                    {isEditingText ? (
                      <>
                        <input
                          type="text"
                          value={text}
                          onChange={handleTextChange}
                        />
                        <div>{remainingChars} remaining characters</div>
                        <button onClick={handleSaveTextClick}>Save</button>
                      </>
                    ) : (
                      <>
                        <h3>{text}</h3>
                        <i
                          className="pi pi-pencil"
                          style={{
                            fontSize: "1.5rem",
                            marginRight: "10px",
                            cursor: "pointer",
                          }}
                          onClick={handleEditTextClick}
                        ></i>
                      </>
                    )}
                  </div>
                  <div className="profile-image">
                    <img src={user.user.companyLogo} alt="" />
                  </div>
                  <div className="uservalue">
                    <h3>
                      Hr: {user.user.name} {user.user.lastName}
                    </h3>
                    <p>{user.user.location}</p>
                    <p>{user.user.email}</p>
                    {/* <p>Looking for position: Software Developer</p> */}
                  </div>
                </div>
                <div className="About-me">
                  <h1>About {user.user.companyName}:</h1>
                  {isEditingAbout ? (
                    <>
                    <input 
                    type="text"
                        value={about}
                        onChange={handleAboutChange}
                      />
                      <button onClick={handleAboutSaveClick}>Save</button>
                    </>
                  ) : (
                    <>
                      <p>{about}</p>
                      <i
                        className="pi pi-pencil"
                        style={{
                          fontSize: "1.5rem",
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                        onClick={handleAboutEditClick}
                      ></i>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-user">
              <h1>Please Login to view your Profile</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
