import React, { useContext } from "react";
import "./Profile.css";
import SideBar from "../../Components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../MyContext";
import bell from "../../Assets/notification-icon.png";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "primeicons/primeicons.css";
import NotificationDisplay from "../../Components/Notificationdisplay/NotificationDisplay";

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Home");
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
                    <h3>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolore, voluptates
                    </h3>
                  </div>
                  <div className="profile-image">AM</div>
                  <div className="uservalue">
                    <h3>{user.user.name + user.user.lastName}</h3>
                    <p>{user.user.location}</p>
                    <p>{user.user.email}</p>
                    {/* <p>Looking for position: Software Developer</p> */}
                  </div>
                </div>
                <div className="About-me">
                  <h1>About-Me:</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nostrum atque voluptatem eaque, in dolor iste distinctio,
                    sed, sit quam soluta sint veritatis iusto tenetur quisquam
                    consectetur delectus aliquam libero qui ut harum. Ratione
                    deserunt quisquam deleniti impedit, sint et tempore facere.
                    Fugiat, assumenda? Porro aspernatur eius sunt expedita illo
                    eum eligendi veniam dolorum iste quia nemo minus, iure,
                    repudiandae dignissimos.
                  </p>
                </div>
                <div className="experience">
                  <h1>Experience:</h1>
                  <div className="experience-info">
                    {user.user.experience.map((exp, index) => (
                      <div key={index}>
                        <p>POSITION: {exp.position} </p>
                        <p>COMPANY NAME: {exp.company}</p>
                        <p>DURATION: {exp.duration}</p>
                        <p>YEAR: {exp.year}</p>
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
              {/* <div className="additional-info">
                <div className="social-links">
                  <h3>Additional Details</h3>
                  <button>Portfolio</button>
                  <button>Twitter</button>
                  <button>Edit</button>
                </div>
                <button>Edit</button>
              </div> */}
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
