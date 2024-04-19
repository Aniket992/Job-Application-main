import express from 'express';
import upload from "../config/multer.js";
import { uploadApplicationController,getApplicationController } from '../controllers/ApplicationController.js';
import userAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route for uploading resume file
router.post('/upload',userAuth,upload.single('resume'),uploadApplicationController) 


router.get("/applications",userAuth, getApplicationController);


export default router;
