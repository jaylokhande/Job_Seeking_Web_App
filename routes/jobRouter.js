import express from "express";
import {getAllJobs ,postJob ,getMyJobs } from '../controllers/jobController.js'
import { isAuthorized } from "../middlewares/auth.js";
const router = express.Router();

router.get("/getall",getAllJobs)
router.post("/post",isAuthorized,postJob)
router.get("/getmyjobs",isAuthorized,getMyJobs)
export default router ;