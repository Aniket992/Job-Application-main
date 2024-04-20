import userModel from "../models/userModel.js";
import multer from "multer";

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
    const error = "please provide skill";
    return res.status(400).json({ error });
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

//UPDATE EDUCATION
export const updateEducation = async (req, res, next) => {
  console.log(req.body);
  const { educations } = req.body;

  try {
    // Validate the presence of education details
    if (!educations || educations.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide education details" });
    }
    const user = await userModel.findOne({ _id: req.user.userId });

    user.education = educations;

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
export const updateLocation = async (req, res, next) => {
  const { location } = req.body;
  if (!location) {
    next("Please Provide Fields");
  }
  const userId = req.user.id;
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: req.user.userId },
      { location: location },
      { new: true }
    );

    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error("Error updating user location:", error);
    next("Error updating user location");
  }
};

//EXPERIENCE.............
export const updateExperience = async (req, res, next) => {
  console.log(req.body);
  const { experiences } = req.body;

  try {
    // Validate the presence of education details
    if (!experiences || experiences.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide experience details" });
    }
    const user = await userModel.findOne({ _id: req.user.userId });

    user.experience = experiences;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Experience details updated successfully",
      user,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    next("An error occurred while updating experience details");
  }
};
//SKILL UPDATE
export const updateSkill = async (req, res, next) => {
  const { skill } = req.body;
  if (!skill) {
    next("Please Provide Fields");
  }
  const userId = req.user.id;
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: req.user.userId },
      { $push: { skills: skill } },
      { new: true }
    );

    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error("Error updating user skills:", error);
    next("Error updating user skills");
  }
};
//Update PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.user.id;
    const user = await userModel.findOne({ _id: req.user.userId });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    (user.password = newPassword), { new: true };

    await user.save();

    return res
      .status(200)
      .json({ message: "Password changed successfully", user });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//UPDATE EMAIL
export const changeEmail = async (req, res) => {
  try {
    const { newEmail } = req.body;
    const userId = req.user.id;

    const existingUser = await userModel.findOne({ email: newEmail });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email is already registered with another user" });
    }

    const user = await userModel.findOne({ _id: req.user.userId });
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    user.email = newEmail;
    await user.save();

    return res
      .status(200)
      .json({ message: "Email changed successfully", user });
  } catch (error) {
    console.error("Error changing Email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UPLOAD RESUME
export const uploadResume = async (req, res, next) => {
  try {
    const  resume = req.file.filename;
    const userId = req.user.userId;


    const user = await userModel.findOne({ _id: req.user.userId });
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    user.resume = resume;
    await user.save();


    res.status(200).json({ message: "resume uploaded successfully" ,resume});
  } catch (error) {
    console.error("Error submitting resume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//GET RESUME
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

export const getUserResumeController = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findOne({ _id: req.user.userId });

    if (!user || !user.resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Get the directory name of the current module
    const __dirname = dirname(fileURLToPath(import.meta.url));

    const filepath = path.join(__dirname, "../uploads/", user.resume);
    res.sendFile(filepath);
  } catch (error) {
    console.error("Error fetching user resume:", error);
    res.status(500).json({ message: "Server error" });
  }
};

