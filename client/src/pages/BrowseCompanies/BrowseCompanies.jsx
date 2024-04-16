import React from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import NotificationDisplay from '../../Components/Notificationdisplay/NotificationDisplay'
import { useNavigate } from "react-router-dom";
import "./BrowseCompanies.css"
const BrowseCompanies = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className='BrowseCompanies'>
        <SideBar/>
        <div className="BrowseCompanies-container">
        <div className="page-header">
            <h1>Find Companies</h1>
            <div className="notification-navigation">
              <button onClick={handleClick}>Back to HomePage</button>
              <div className="notification">
                <NotificationDisplay/>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default BrowseCompanies
