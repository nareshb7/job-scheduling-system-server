const { isValidObjectId } = require("mongoose");
const { STATUS_CODES } = require("../constants");
const { ResumeModel } = require("../models/ResumeModel");

const resumeUploader = async (req, res) => {
  try {
    const { name, description, userId } = req.body;
    const file = req.file;
    if (file.size > 3145728) {
      throw new Error("More than 3mb not allowed");
    }
    if (file.mimetype !== "application/pdf") {
      throw new Error("only pdf are allowed");
    }
    const isExisted = await ResumeModel.findOne({
      userId,
      "file.data": file.buffer,
    });
    if (isExisted) {
      throw new Error(
        `File is already uploaded with " ${isExisted.name} " name`
      );
    }

    await ResumeModel.create({
      userId,
      name,
      description,
      file: {
        data: file.buffer,
        contentType: file.mimetype,
        originalName: file.originalname,
      },
    });
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "File Uploaded Successfully", success: true });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

const getResumesByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new Error("Id is not valid");
    }
    const data = await ResumeModel.find({ userId: id });
    res.status(STATUS_CODES.SUCCESS).json({ success: true, data });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

const downloadResume = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new Error("Id is not valid");
    }
    const resume = await ResumeModel.findById(id);
    if (!resume) {
      throw new Error("Resume not found");
    }
    res.set({
      "Content-Type": resume.file.contentType,
      "Content-Disposition": `attachment; filename="${resume.file.originalName}"`,
    });
    res.send(resume.file.data);
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new Error("Id is not valid");
    }
    const resume = await ResumeModel.findByIdAndDelete(id);
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ success: true, message: "Resume Deleted Succesfully" });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

module.exports = {
  resumeUploader,
  getResumesByUserId,
  downloadResume,
  deleteResume,
};
