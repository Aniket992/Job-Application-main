import React from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import "./Messages.css"
import { useNavigate } from "react-router-dom";
import NotificationDisplay from '../../Components/Notificationdisplay/NotificationDisplay';

const Messages = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Home");
  };
  return (
    <div className='Messages'>
        <SideBar/>
        <div className="messages-container">
        <div className="page-header">
            <h1>My Chats</h1>
            <div className="notification-navigation">
              <button onClick={handleClick}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay/>
              </div>
            </div>
          </div>
          <div className="messages-info">
            <h3>No message to display</h3>
          </div>
        </div>
    </div>
  )
}

export default Messages
