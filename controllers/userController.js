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


export const updateEducation = async (req, res, next) => {
console.log(req.body);
  const { educations } = req.body;

  try {
    // Validate the presence of education details
    if (!educations || educations.length === 0) {
      return res.status(400).json({ success: false, message: "Please provide education details" });
    }
    const user = await userModel.findOne({_id: req.user.userId });

       user.education = educations 


    await user.save();

    res.status(200).json({
      success: true,
      message: "Education details updated successfully",
      user,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    next("An error occurred while updating education details");
  }
};

//LOCATION UPDATE
export const updateLocation = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in request object
  const { location } = req.body;
  try {
    // Find the user by ID and update their location
    const user = await userModel.findOneAndUpdate(
      { _id: req.user.userId }, // Query to find the user
      { location: location }, // Update the location field
      { new: true } // To return the updated user document
    );

    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error('Error updating user location:', error);
    res.status(500).json({ success: false, message: 'Failed to update location' });
  }
};
// //EDUCATION UPDATE
// export const updateEducation = async (req, res) => {
//   const userId = req.user.id; // Assuming user ID is available in request object
//   const { educations } = req.body;

//   try {
//     // Find the user by ID and update their education details
//     const user = await userModel.findByIdAndUpdate( { _id: req.user.userId }, { education:educations }, { new: true });

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error('Error updating education details:', error);
//     res.status(500).json({ success: false, message: 'Failed to update education details' });
//   }
// };