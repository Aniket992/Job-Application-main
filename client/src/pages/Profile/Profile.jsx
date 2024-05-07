import React, { useState, useContext } from "react";
import axios from "axios";
import "./Profile.css";
import SideBar from "../../Components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContext";
import Footer from "../../Components/Footer/Footer";
import "primeicons/primeicons.css";
import NotificationDisplay from "../../Components/Notificationdisplay/NotificationDisplay";

const Profile = () => {
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
      <div className="seeker-profile">
        <SideBar />
        <div className="profile-body">
          <div className="page-header">
            <h1>My Profile</h1>
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
                  <div className="profile-image">AM</div>
                  <div className="uservalue">
                    <h3>{user.user.name + user.user.lastName}</h3>
                    <p>{user.user.location}</p>
                    <p>{user.user.email}</p>
                  </div>
                </div>
                <div className="About-me">
                  <h1>About-Me:</h1>
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
                <div className="experience">
                  <h1>Experience:</h1>
                  <div className="experience-info">
                    {user.user.experience.map((exp, index) => (
                      <div key={index}>
                        <p>POSITION: {exp.position} </p>
                        <p>COMPANY NAME: {exp.company}</p>
                        <p>DURATION: {exp.duration}</p>
                        <p>YEAR: {exp.startingYear}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="education">
                  <h1>Education:</h1>
                  <div className="experience-info">
                    {user.user.education.map((edu, index) => (
                      <div key={index}>
                        <p>LEVEL: {edu.level} </p>
                        <p>INSTITUTE: {edu.institute}</p>
                        <p>PERCENTAGE: {edu.percentage}</p>
                        <p>YEAR: {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="skills">
                  <h1>Skills:</h1>
                  <div className="experience-info">
                    <p>{user.user.skills.join(", ")}</p>
                  </div>
                </div>
              </div>
            
            </div>
          ) : (
            <div className="no-user">
              <h1>Please Login to view your Profile</h1>
            </div>
          )}
          <hr />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
