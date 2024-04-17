import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
    // addEducationController,
  addExperienceController,
  addSkillsController,
  deleteUserAccountController,
  updateEducation,
  updateLocation,
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

// UPDATE LOCATION
router.put('/update-location', userAuth, updateLocation);

// UPDATE EDUCATION 
router.put('/update-education',userAuth, updateEducation);



export default router;
