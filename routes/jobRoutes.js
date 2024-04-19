import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  browseCompanies,
  createJobController,
  deleteJobController,
  getAllJobsController,
  jobStatsController,
  rateJobController,
  updateJobController,
} from "../controllers/jobsController.js";

const router = express.Router();

// routes
// CREATE JOB||POST
router.post("/create-job", userAuth, createJobController);

// GET JOBS||GET
router.get("/get-job", getAllJobsController);

// UPDATE JOBS|| PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

//DELETE JOBS || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

// // JOBS STATS FILTER || GET
router.get("/job-stats", userAuth, jobStatsController);

// Rate a Job
// // RATE A JOB || POST
router.post("/rate-job/:id", userAuth, rateJobController);

//COMPANIES...........
//GET COMPANIES
router.get("/companies", browseCompanies);

export default router;
