import React from "react";
import "./Footer.css"; // Import your CSS file for footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            Your job portal is dedicated to connecting job seekers with
            employers.
          </p>
          {/* Add any additional content about your website */}
        </div>
        <div className="footer-section contact">
          <h2>Contact Information</h2>
          <p>Email: info@yourjobportal.com</p>
          <p>Phone: +1234567890</p>
          {/* Add any additional contact information */}
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/Home">Home</a></li>
            <li><a href="/FindJobs">Jobs</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="/HelpCenter">Contact Us</a></li>
            {/* Add more links as needed */}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Recruitify. All rights reserved.</p>
        {/* Add any additional copyright information */}
      </div>
    </footer>
  );
};

export default Footer;
