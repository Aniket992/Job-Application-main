import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from '../../apiConfig'; 

const Applications = ({ match }) => {
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/application/${match.params.id}`
        );
        setApplication(response.data);
      } catch (error) {
        console.error("Error fetching application:", error);
      }
    };

    fetchApplication();
  }, [match.params.id]);

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Application Details</h2>
      <p>Name: {application.name}</p>
      <p>Last Name: {application.lastName}</p>
      <p>Email: {application.email}</p>
      <p>Contact: {application.contact}</p>
      <p>Experience: {application.experience}</p>
      <p>Skills: {application.skills}</p>
      <p>Education: {application.education}</p>
      <p>
        Resume:{" "}
        <a
          href={`${BASE_URL}/uploads/${application.resume}`}
          download
        >
          Download Resume
        </a>
      </p>
    </div>
  );
};

export default Applications;
