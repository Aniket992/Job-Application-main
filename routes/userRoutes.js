import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  changeEmail,
  changePassword,
  deleteUserAccountController,
  updateEducation,
  updateExperience,
  updateLocation,
  updateSkill,
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

export default router;
