import userModel from "../models/userModel.js";
import multer from "multer";

export const updateUserController = async (req, res, next) => {
  const { location,education, experience, skills } = req.body;
  
  // Check if required fields are provided
  if (!location||!skills||!experience||!education) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  try {
    // Find the user by user ID
    const user = await userModel.findOne({ _id: req.user.userId });

    // Update user details
    user.location = location;

    // Add education details
    if (education && education.length > 0) {
      education.forEach(edu => {
        user.education.push({
          level: edu.level,
          institute: edu.institute,
          percentage: edu.percentage,
          year: edu.year
        });
      });
    }

    // Add experience details
    if (experience && experience.length > 0) {
      experience.forEach(exp => {
        user.experience.push({
          company: exp.company,
          position: exp.position,
          duration: exp.duration,
          year: exp.year
        });
      });
    }

    // Add skills
    if (skills) {
      user.skills.push(skills);
    }
    const allDetailsAvailable = location && education && education.length > 0 &&
    experience && experience.length > 0 && skills;
  
  if (allDetailsAvailable) {
    user.isProfileComplete = true;
  }
    // Save the updated user
    await user.save();

    // Create a new JWT token
    const token = user.createJWT();

    // Respond with updated user and token
    res.status(200).json({
      user,
      token
    });
  } catch (error) {
    // Handle any errors
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addExperienceController = async (req, res, next) => {
  const { company, position, duration, year } = req.body;
  if (!company || !duration || !position || !year) {
    next("Please Provide All Fields");
  }
  const user = await userModel.findOne({ _id: req.user.userId });
  
  user.experience.push({
    company,
    position,
    duration,
    year,
  });

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};

// controller
export const addSkillsController = async (req, res, next) => {
  const { skills } = req.body;
  if (!skills) {
    // next("please provide skill")
    const error = "please provide skill"
    return res.status(400).json( {error} );
  }
  const user = await userModel.findOne({ _id: req.user.userId });

  user.skills.push(skills);

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};


export const deleteUserAccountController = async (req, res, next) => {
  const user = await userModel.findOne({ _id: req.user.userId });
  if (user.isDeleted) {
    next("account not found");
  } else {
    user.isDeleted = true;
    // next("account deleted Successfully");
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: " Successfully deleted",
  });
};

export const removeExperienceController = async (req, res, next) => {};

export const addEducationController = async (req, res, next) => {
  try {
    const { level, institute, percentage, year } = req.body;

    // Validate the presence of education details
    if (!level || !institute || !percentage || !year) {
      return next("Please provide all education details");
    }

    // Find the user by user ID
    const user = await userModel.findOne({ _id: req.user.userId });

    // If the user is not found, return an error
    if (!user) {
      return next("User not found");
    }

    // Add education details to the user's profile
    user.education.push({
      level,
      institute,
      percentage,
      year,
    });

    // Save the updated user profile
    await user.save();

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Education details added successfully",
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        education: user.education,
      },
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    next("An error occurred while adding education details");
  }
};

