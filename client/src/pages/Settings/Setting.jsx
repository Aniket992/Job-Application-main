import React, { useState, useEffect,useContext } from 'react';
import UserProfile from '../../Components/userProfile/UserProfile';
import UserCredentials from '../../Components/UserCredentiials/UserCredentials';
import SideBar from '../../Components/SideBar/SideBar';
import { useNavigate } from "react-router-dom";
import NotificationDisplay from '../../Components/Notificationdisplay/NotificationDisplay';
import "./Setting.css";
import { UserContext } from "../../MyContext";
import ShowResume from '../../Components/ShowResume/ShowResume';
import ProviderProfile from '../../Components/ProviderProfile/ProviderProfile';

const Setting = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('UserProfile');

  const handleClick = () => {
    navigate("/Home");
  };

  useEffect(() => {
    const storedOption = localStorage.getItem('selectedOption');
    if (storedOption) {
      setSelectedOption(storedOption);
    }
    return () => {
      localStorage.removeItem('selectedOption');
    };
  }, []); 

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    localStorage.setItem('selectedOption', option); 
  };

  const renderSelectedOption = () => {
    if (user ) {
      switch (selectedOption) {
        case 'UserProfile':
          return <UserProfile />;
        case 'Credentials':
          return <UserCredentials />;
        default:
          return null;
      }
   
    } else {
      return (
        <div>
          <h2 style={{color:"white"}}>Please log in to update profile.</h2>
        </div>
      );
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
            <li className={selectedOption === 'UserProfile' ? 'active' : ''} onClick={() => handleOptionChange('UserProfile')}>User Profile</li>
            <li className={selectedOption === 'Credentials' ? 'active' : ''} onClick={() => handleOptionChange('Credentials')}>User Credentials</li>
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
