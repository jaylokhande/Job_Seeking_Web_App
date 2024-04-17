import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication
} from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

// router.post("/post", isAuthenticated, postApplication);
router.get("/employer/getall", isAuthorized, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthorized, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthorized, jobseekerDeleteApplication);
router.post("/post", isAuthorized, postApplication);

export default router;