// NotificationDisplay.js
import React, { useState } from "react";
import "./NotificationDisplay.css";

const NotificationDisplay = () => {
  const [showNotification, setShowNotification] = useState(false); // State for showing notification

  const handleNotificationClick = () => {
    setShowNotification(!showNotification); // Toggle notification display
  };

  return (
    <div className="notification-container">
      <div className="notification" onClick={handleNotificationClick}>
        <i className="pi pi-bell" style={{ fontSize: "2rem", margin: "auto", cursor: "pointer" }}></i>
      </div>
      {showNotification && (
        <div className="Notification-container">
          <p>Notification 1</p>
          <p>Notification 2</p>
        </div>
      )}
    </div>
  );
};

export default NotificationDisplay;
