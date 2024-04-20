import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  browseCompanies,
  createJobController,
  deleteJobController,
  getAllJobsController,
  updateJobController,
} from "../controllers/jobsController.js";

const router = express.Router();

// CREATE JOB||POST
router.post("/create-job", userAuth, createJobController);
// GET JOBS||GET
router.get("/get-job", getAllJobsController);
// UPDATE JOBS|| PATCH
router.patch("/update-job/:id", userAuth, updateJobController);
//DELETE JOBS || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

//COMPANIES...........
//GET COMPANIES
router.get("/companies", browseCompanies);

export default router;
