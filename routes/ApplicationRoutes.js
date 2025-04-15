const { Router } = require("express");
const {
  createNewApplication,
  getJobApplications,
  editInterviewRound,
} = require("../controllers/ApplicationController");

const applicationRouter = Router();

applicationRouter.get("/:id", getJobApplications);
applicationRouter.post("/create", createNewApplication);
applicationRouter.post("/update/:id", editInterviewRound);

module.exports = applicationRouter;
