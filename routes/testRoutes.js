import express from "express";
import { test, testPostController } from "../controllers/testController.js";

//router object
const router = express.Router();

//routes
router.post("/test-post", testPostController);
router.post("/",test);
//export
export default router;
