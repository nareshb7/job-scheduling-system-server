const { Router } = require("express");
const {
  createNewPortalApplication,
  getPortalApplicationByUserId,
} = require("../controllers/PortalApplications");
const {
  portalToMainApplication,
} = require("../controllers/ApplicationController");

const portalRouter = Router();

portalRouter.get("/:id", getPortalApplicationByUserId);
portalRouter.post("/add", createNewPortalApplication);
portalRouter.post("/update", portalToMainApplication);

module.exports = portalRouter;
