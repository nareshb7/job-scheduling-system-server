const { Router } = require("express");
const {
  createNewPortalApplication,
  getPortalApplicationByUserId,
} = require("../controllers/PortalApplications");

const portalRouter = Router();

portalRouter.get("/:id", getPortalApplicationByUserId);
portalRouter.post("/add", createNewPortalApplication);

module.exports = portalRouter;
