import express from 'express';
import upload from "../config/multer.js";
import { uploadApplicationController,getApplicationController } from '../controllers/ApplicationController.js';

const router = express.Router();

// Route for uploading resume file
router.post('/upload', upload.single('resume'),uploadApplicationController) 


router.get("/:id", getApplicationController);


export default router;
