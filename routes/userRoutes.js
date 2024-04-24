import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import upload from "../config/multer.js";

import {
  changeEmail,
  changePassword,
  deleteUserAccountController,
  getCandidate,
  getUserResumeByProvider,
  getUserResumeController,
  updateEducation,
  updateExperience,
  updateLocation,
  updateSkill,
  uploadResume,
} from "../controllers/userController.js";

// router object
const router = express.Router();


// // DELETE USER
router.delete("/delete-account", userAuth, deleteUserAccountController);
// UPDATE LOCATION
router.put('/update-location', userAuth, updateLocation);
// UPDATE EDUCATION 
router.put('/update-education',userAuth, updateEducation);
// UPDATE EXPERIENCE
router.put('/update-experience',userAuth, updateExperience);
// UPDATE SKILLS 
router.put('/update-skill',userAuth, updateSkill);
//UPDATE PASSWORD
router.put('/change-password',userAuth, changePassword);
//UPDATE EMAIL
router.put('/change-email',userAuth, changeEmail);
//UPLOAD RESUME
router.post('/upload-resume',userAuth,upload.single('resume'),uploadResume);
//GET RESUME By User
router.get('/get-resume',userAuth,getUserResumeController);
//GET USER by provider
router.get('/get-candidates',userAuth,getCandidate)
router.get('/get-userResume',getUserResumeByProvider)
export default router;
