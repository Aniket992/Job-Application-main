import ApplicationModel from "../models/Application.js";

export const uploadApplicationController = async (req, res, next) => {
  try {
    // Extract application data from req.body
    const { name, lastName, email, skills, education, experience, contact } = req.body;

    // Check if all required fields are present
    if (!name || !lastName || !email || !skills || !education || !experience || !contact) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new application object
    const newApplication = new ApplicationModel({
      name,
      lastName,
      email,
      skills,
      education,
      experience,
      contact,
      resume: req.file.filename, // Add filename of the uploaded resume
    });

    // Save the application to the database
    await newApplication.save();

    // Respond with success message
    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getApplicationController = async (req, res, next) => {
  try {
    const application = await ApplicationModel.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    console.error("Error getting application:", error);
    res.status(500).json({ message: "Server error" });
  }
};
