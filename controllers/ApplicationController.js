import ApplicationModel from "../models/Application.js";
import jobsModel from "../models/jobsModel.js";

export const uploadApplicationController = async (req, res, next) => {
  try {

    const { name, lastName, email, skills, education, experience,jobId} = req.body;
    const userId = req.user.userId;
    if (!name || !lastName || !email || !skills || !education || !experience||!jobId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newApplication = new ApplicationModel({
      jobId,
      userId,
      name,
      lastName,
      email,
      skills,
      education,
      experience,
      resume: req.file.filename, 
      
    });

    await newApplication.save();

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// export const getApplicationController = async (req, res, next) => {
//   try {
//     const userId = req.user.userId;
//     console.log(userId);
//     const applications = await ApplicationModel.find({ userId });

//     if (!applications || applications.length === 0) {
//       return next("No applications found for this user");
//     }
//     res.status(200).json(applications);
//   } catch (error) {
//     console.error("Error getting applications:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const getApplicationController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    console.log(userId);
    
    // Find all applications for the user
    const applications = await ApplicationModel.find({ userId });
    
    // If no applications found, return 404
    if (!applications.length) {
      return res.status(404).json({ message: "Applications not found" });
    }

    // Array to store application and job details pairs
    const applicationsWithJobs = [];

    // Fetch job details for each application
    for (const application of applications) {
      const jobDetails = await jobsModel.findById(application.jobId);
      applicationsWithJobs.push({ application, jobDetails });
    }

    // Return applications with their corresponding job details
    res.status(200).json(applicationsWithJobs);
  } catch (error) {
    console.error("Error getting applications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

