const { Router } = require("express");
const {
  createNewApplication,
  getJobApplications,
} = require("../controllers/ApplicationController");

const applicationRouter = Router();

applicationRouter.get("/:id", getJobApplications);
applicationRouter.post("/create", createNewApplication);

module.exports = applicationRouter;
