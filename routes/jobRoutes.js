import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { createJobController, deleteJobController, getAllJobsController,jobStatsController,rateJobController,updateJobController } from '../controllers/jobsController.js'

const router = express.Router()

// routes
// CREATE JOB||POST
router.post('/create-job',userAuth,createJobController);

// GET JOBS||GET
router.get('/get-job',getAllJobsController);

// UPDATE JOBS|| PATCH
router.patch('/update-job/:id',userAuth,updateJobController);

//DELETE JOBS || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

// // JOBS STATS FILTER || GET
router.get("/job-stats", userAuth, jobStatsController);

// Rate a Job
// // RATE A JOB || POST
router.post('/rate-job/:id', userAuth, rateJobController);

// Bookmark a Job
// // BOOKMARK A JOB || POST
// router.post('/bookmark-job/:id', userAuth, bookmarkJobController);


// / GET ALL JOB CATEGORIES || GET
// router.get('/job-categories', userAuth, getAllJobCategoriesController);
// Create Job Category


  
// // CREATE JOB CATEGORY || POST
// router.post('/create-job-category', userAuth, createJobCategoryController);
// Update Job Category

 
  
// // UPDATE JOB CATEGORY || PATCH
// router.patch('/update-job-category/:id', userAuth, updateJobCategoryController);


// Delete Job Category

 
  
// // DELETE JOB CATEGORY || DELETE
// router.delete('/delete-job-category/:id', userAuth, deleteJobCategoryController);
// Get Jobs by Category

 
  
// // GET JOBS BY CATEGORY || GET
// router.get('/jobs-by-category/:category', userAuth, getJobsByCategoryController);
// Search Jobs

 
  
// // SEARCH JOBS || GET
// router.get('/search-jobs', userAuth, searchJobsController);
// Get Recommended Jobs

 
  
// // GET RECOMMENDED JOBS || GET
// router.get('/recommended-jobs', userAuth, getRecommendedJobsController);
// Get Job Details

 
  
// // GET JOB DETAILS || GET
// router.get('/job-details/:id', userAuth, getJobDetailsController);




export default router




