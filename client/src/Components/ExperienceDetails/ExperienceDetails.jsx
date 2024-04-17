import axios from "axios";
import "./ExperienceDetails.css";
import { UserContext } from "../../MyContext";
import React, { useContext, useState } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";

const ExperienceDetails = () => {
  const { user, setUser } = useContext(UserContext);

  // Initialize experience states with empty objects if user experience is empty
  const [experience1, setExperience1] = useState(
    user.user.experience && user.user.experience.length > 0
      ? user.user.experience[0]
      : {
          position: "",
          company: "",
          duration: "",
          startingYear: "",
        }
  );
  const [experience2, setExperience2] = useState(
    user.user.experience && user.user.experience.length > 1
      ? user.user.experience[1]
      : {
          position: "",
          company: "",
          duration: "",
          startingYear: "",
        }
  );

  const handleInputChange = (e, experience, setExperience) => {
    const { name, value } = e.target;
    setExperience({ ...experience, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.put(
        "/api/v1/user/update-experience",
        {
          experiences: [experience1, experience2],
        },
        { headers: headers }
      );
      setUser({
        ...user,
        user: { ...user.user, experience: [experience1, experience2] },
      });
      toast.success("Experience Updated");

      console.log("Experience details submitted:", response.data);
    } catch (error) {
      console.error("Error submitting experience details:", error);

    }
  };

  return (
    <div>
      <form className="experience-details-containers" onSubmit={handleSubmit}>
        {/* Experience 1 */}
        <div className="experience1-container">
          <p>Experience 1</p>
          <div className="form-group-container">
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={experience1.position}
              onChange={(e) => handleInputChange(e, experience1, setExperience1)}
              required
            />
          </div>
          <div className="form-group-container">
            <label>Company Name:</label>
            <input
              type="text"
              name="company"
              value={experience1.company}
              onChange={(e) => handleInputChange(e, experience1, setExperience1)}
              required
            />
          </div>
          <div className="form-group-container">
            <label>Duration:</label>
            <input
              type="text"
              name="duration"
              value={experience1.duration}
              onChange={(e) => handleInputChange(e, experience1, setExperience1)}
              required
            />
          </div>
          <div className="form-group-container">
            <label>Starting Year:</label>
            <input
              type="text"
              name="startingYear"
              value={experience1.startingYear}
              onChange={(e) => handleInputChange(e, experience1, setExperience1)}
              required
            />
          </div>
        </div>

        {/* Experience 2 */}
        <div className="experience2-container">
          <p>Experience 2</p>
          <div className="form-group-container">
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={experience2.position}
              onChange={(e) => handleInputChange(e, experience2, setExperience2)}
              required
            />
          </div>
          <div className="form-group-container">
            <label>Company Name:</label>
            <input
              type="text"
              name="company"
              value={experience2.company}
              onChange={(e) => handleInputChange(e, experience2, setExperience2)}
              required
            />
          </div>
          <div className="form-group-container">
            <label>Duration:</label>
            <input
              type="text"
              name="duration"
              value={experience2.duration}
              onChange={(e) => handleInputChange(e, experience2, setExperience2)}
              required
            />
          </div>
          <div className="form-group-container">
            <label>Starting Year:</label>
            <input
              type="text"
              name="startingYear"
              value={experience2.startingYear}
              onChange={(e) => handleInputChange(e, experience2, setExperience2)}
              required
            />
          </div>
        </div>

        <button type="submit">Update Experience</button>
      </form>
    </div>
  );
};

export default ExperienceDetails;
