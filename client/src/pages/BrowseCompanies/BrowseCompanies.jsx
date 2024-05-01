import React, { useContext, useState, useEffect } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import NotificationDisplay from "../../Components/Notificationdisplay/NotificationDisplay";
import { useNavigate } from "react-router-dom";
import "./BrowseCompanies.css";
import { UserContext } from "../../MyContext";
import axios from "axios";

const BrowseCompanies = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Home");
  };

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/job/companies"
        );
        setCompanies(response.data.companies);
        setSelectedCompany(response.data.companies[0]);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  return (
    <div className="BrowseCompanies">
      <SideBar />
      <div className="BrowseCompanies-container">
        <div className="page-header">
          <h1>Find Companies</h1>
          <div className="notification-navigation">
            <button onClick={handleClick}>Back to HomePage</button>
            <div className="notification">
              <NotificationDisplay />
            </div>
          </div>
        </div>

        {user.user.userType === "jobProvider" ? (
          <div className="job-provider-container">
            <h1>Get Right Candidate</h1>
            {/* Add content specific to job providers here */}
          </div>
        ) : (
          <div className="browse-companies-container">
            <div className="company-list">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="company-card"
                  onClick={() => handleCompanyClick(company)}
                >
                  <h2>{company.name}</h2>
                  <p>{company.email}</p>
                </div>
              ))}
            </div>
            <div className="company-info">
              {selectedCompany && (
                <div className="company-description">
                  <h2>{selectedCompany.name}</h2>
                  <p>{selectedCompany.description}</p>
                  {/* Add more details here */}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCompanies;
