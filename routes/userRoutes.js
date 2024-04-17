import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  addExperienceController,
  addSkillsController,
  deleteUserAccountController,
  updateEducation,
  updateExperience,
  updateLocation,
  updateSkill,
  updateUserController,
} from "../controllers/userController.js";

// router object
const router = express.Router();

// routes
// GET USERS||GET

// UPDATE USER||PUT
router.put("/update-user", userAuth, updateUserController);

// ADD EDUCATION||PATCH
// router.patch("/add-education", userAuth, addEducationController);

//ADD SKILLS||PATCH
router.patch("/add-skills",userAuth,addSkillsController)

//ADD EXPERIENCE||PATCH
router.patch("/add-experience", userAuth, addExperienceController);

//REMOVE EXPERIENCE||DELETE
router.delete("/delete-experience", userAuth);

// // DELETE USER ACCOUNT || DELETE
router.delete("/delete-user", userAuth, deleteUserAccountController);
// ..........................

//...........................
// UPDATE LOCATION
router.put('/update-location', userAuth, updateLocation);
// UPDATE EDUCATION 
router.put('/update-education',userAuth, updateEducation);
// UPDATE EXPERIENCE
router.put('/update-experience',userAuth, updateExperience);
// UPDATE SKILLS 
router.put('/update-skill',userAuth, updateSkill);


export default router;
