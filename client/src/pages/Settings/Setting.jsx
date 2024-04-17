import React, { useState } from 'react';
import UserProfile from '../../Components/userProfile/UserProfile';
import UserCredentials from '../../Components/UserCredentiials/UserCredentials'; // Corrected import
import SideBar from '../../Components/SideBar/SideBar';
import { useNavigate } from "react-router-dom";
import NotificationDisplay from '../../Components/Notificationdisplay/NotificationDisplay';
import "./Setting.css";

const Setting = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('UserProfile'); // Initial option selected

  const handleClick = () => {
    navigate("/");
  };

  const renderSelectedOption = () => {
    switch (selectedOption) {
      case 'UserProfile':
        return <UserProfile />;
      case 'Credentials':
        return <UserCredentials />;
      // case 'Privacy':
      //   return <Privacy />;
      default:
        return null;
    }
  };

  return (
    <div className='setting'>
      <SideBar />
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
        <div className="settings-options">
          <ul>
            <li className={selectedOption === 'UserProfile' ? 'active' : ''} onClick={() => setSelectedOption('UserProfile')}>User Profile</li>
            <li className={selectedOption === 'Credentials' ? 'active' : ''} onClick={() => setSelectedOption('Credentials')}>User Credentials</li>
            {/* <li onClick={() => setSelectedOption('Privacy')}>Privacy</li> */}
          </ul>
        </div>

        <div className="selected-option">
          {renderSelectedOption()}
        </div>
      </div>
    </div>
  );
};

export default Setting;
