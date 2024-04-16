import React from 'react'
import UserProfile from '../../Components/userProfile/UserProfile'
import SideBar from '../../Components/SideBar/SideBar'
import { useNavigate } from "react-router-dom";
import NotificationDisplay from '../../Components/Notificationdisplay/NotificationDisplay';
import "./Setting.css";
const Setting = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className='setting'>
      <SideBar/>
      <div className="setting-container">
      <div className="page-header">
            <h1>Settings</h1>
            <div className="notification-navigation">
              <button onClick={handleClick}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay />
              </div>
            </div>
          </div>
      <UserProfile/>

      </div>
    </div>
  )
}

export default Setting
