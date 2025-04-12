const { Router } = require("express");
const {
  resumeUploader,
  getResumesByUserId,
  downloadResume,
  deleteResume,
} = require("../controllers/ResumeController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const resumeRouter = Router();

resumeRouter.get("/download/:id", downloadResume);
resumeRouter.delete("/delete/:id", deleteResume);
resumeRouter.get("/list/:id", getResumesByUserId);
resumeRouter.post("/upload", upload.single("resume"), resumeUploader);

module.exports = resumeRouter;
