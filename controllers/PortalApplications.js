const { isValidObjectId } = require("mongoose");
const { STATUS_CODES } = require("../constants");
const { checkValidation } = require("./helper");
const { getAIDescription } = require("./GenAIController");
const { PortalApplicationModel } = require("../models/PortalApplication");

const createNewPortalApplication = async (req, res) => {
  try {
    const {
      company,
      description,
      location,
      portal,
      title,
      url,
      userId,
      hirer,
    } = req.body;

    if (!checkValidation(req.body)) {
      throw new Error("Fields are required");
    }
    if (!isValidObjectId(userId)) {
      throw new Error("User id not valid");
    }
    const isExisted = await PortalApplicationModel.findOne({
      userId,
      company,
      title,
    });
    if (isExisted) {
      throw new Error("This job is already applied");
    }
    const aiDescription = await getAIDescription(description);
    const data = await PortalApplicationModel.create({
      company,
      description: aiDescription,
      location: location.split("·")[0],
      portal,
      title,
      url,
      userId,
      hirer,
    });

    res.status(STATUS_CODES.SUCCESS).json({ success: true, data });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

const getPortalApplicationByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new Error("User ID is not valid");
    }
    const data = await PortalApplicationModel.find({ userId: id });

    res.status(STATUS_CODES.SUCCESS).json({ success: true, data });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

module.exports = {
  createNewPortalApplication,
  getPortalApplicationByUserId,
};
