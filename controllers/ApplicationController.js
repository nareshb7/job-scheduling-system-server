const { isValidObjectId } = require("mongoose");
const { STATUS_CODES } = require("../constants");
const { ApplicationModel } = require("../models/ApplicationModel");

const createNewApplication = async (req, res) => {
  try {
    const {
      jobId,
      company,
      position,
      appliedDate,
      applicationStatus,
      nextFollowup,
      hrNumber,
      hrName,
      jobDescription,
      companyLocation,
      userId,
      resumeId,
    } = req.body;
    if (
      !jobId ||
      !company ||
      !position ||
      !appliedDate ||
      !applicationStatus ||
      !nextFollowup ||
      !hrNumber ||
      !hrName ||
      !jobDescription ||
      !companyLocation ||
      !userId ||
      !resumeId
    ) {
      throw new Error("Fields are required");
    }
    if (!isValidObjectId(userId)) {
      throw new Error("User Id not valid");
    }
    const data = await ApplicationModel.create({
      jobId,
      company,
      position,
      appliedDate,
      applicationStatus,
      nextFollowup,
      hrData: {
        phone: hrNumber,
        name: hrName,
      },
      jobDescription,
      companyLocation,
      userId,
      resumeId,
    });
    console.log("body::");
    res.status(STATUS_CODES.SUCCESS).json({ success: true, data });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).send(err.message);
  }
};

const getJobApplications = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new Error("Id is not valid");
    }
    const data = await ApplicationModel.find({ userId: id });
    res.status(STATUS_CODES.SUCCESS).json({ data, success: true });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).send(err.message);
  }
};

module.exports = {
  createNewApplication,
  getJobApplications,
};
