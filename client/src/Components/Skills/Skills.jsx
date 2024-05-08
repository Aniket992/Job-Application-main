import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../MyContext";
import "./Skills.css";
import { BASE_URL } from '../../apiConfig'; 

const Skills = () => {
  const { user, setUser } = useContext(UserContext);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    setNewSkill(""); // Reset newSkill when the component mounts or user changes
  }, [user]);

  const handleSkillChange = (e) => {
    setNewSkill(e.target.value);
  };

  const updateSkills = async () => {
    if (!newSkill) {
      toast.error("Please provide a skill");
      return;
    }
    try {
      const token = user.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.put(
        `${BASE_URL}/api/v1/user/update-skill`,
        { skill: newSkill },
        { headers: headers }
      );

      setUser({
        ...user,
        user: { ...user.user, skills: [...user.user.skills, newSkill] },
      });
      
      toast.success("Skill added successfully");
      console.log("Skills updated:", response.data);
    } catch (error) {
      console.error("Error updating skills:", error);
      toast.error("Error updating skills");
    }
  };

  return (
      <div className="skills-container">
                  <p>Skills: {user.user.skills.join(", ")}</p>

        <div className="skills-update">
          <input
            type="text"
            placeholder="New Skill"
            value={newSkill}
            onChange={handleSkillChange}
          />
          <button onClick={updateSkills}>Add Skill</button>
        </div>
    </div>
  );
};

export default Skills;
