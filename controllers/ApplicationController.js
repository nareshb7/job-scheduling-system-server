const { isValidObjectId } = require("mongoose");
const { STATUS_CODES } = require("../constants");
const { ApplicationModel } = require("../models/ApplicationModel");
const { InterviewQuestionModel } = require("../models/InterviewQuestionsModel");
const { checkValidation } = require("./helper");
const { getAIAnswers, getAIDescription } = require("./GenAIController");
const { PortalApplicationModel } = require("../models/PortalApplication");

const createNewApplication = async (req, res) => {
  try {
    const {
      jobId,
      company,
      title,
      appliedDate,
      applicationStatus,
      nextFollowup,
      hrNumber,
      hrName,
      description,
      location,
      userId,
      resumeId,
      hrEmail,
      portal,
      url,
    } = req.body;
    if (!checkValidation(req.body)) {
      throw new Error("Fields are required");
    }
    if (!isValidObjectId(userId)) {
      throw new Error("User Id not valid");
    }

    const aiDescription = await getAIDescription(description);
    const data = await ApplicationModel.create({
      jobId,
      company,
      title,
      appliedDate,
      applicationStatus,
      nextFollowup,
      hrData: {
        phone: hrNumber,
        name: hrName,
        email: hrEmail,
      },
      description: aiDescription,
      location,
      userId,
      resumeId,
      portal,
      url,
    });
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

const editInterviewRound = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      roundName,
      performance,
      nextFollowup,
      description,
      questionsAsked,
      nextInterviewDate,
      userId,
      status,
    } = req.body;
    if (!checkValidation(req.body)) {
      throw new Error("Fields are required.");
    }

    const data = await ApplicationModel.findByIdAndUpdate(
      id,
      {
        $push: {
          interviewRounds: {
            nextInterviewDate,
            questionsAsked: questionsAsked,
            description,
            performance,
            roundName,
          },
        },
        $set: { nextFollowup, applicationStatus: status },
      },
      { new: true }
    );
    const parsedAnswer = await getAIAnswers(questionsAsked);

    const interviewQuestions = parsedAnswer.map((question) => ({
      applicationId: id,
      userId,
      company: data.company,
      question: question.question,
      answer: question.answer,
    }));
    await InterviewQuestionModel.insertMany(interviewQuestions);
    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).send(err.message);
  }
};

const portalToMainApplication = async (req, res) => {
  try {
    const { _id, notes, ...rest } = req.body;
    if (!isValidObjectId(_id)) {
      throw new Error("Application id is not valid");
    }

    const isExisted = await PortalApplicationModel.findByIdAndDelete(_id);
    if (!isExisted) {
      throw new Error("Portal Application is not found with this id");
    }

    const data = await ApplicationModel.create({
      ...rest,
      notes,
    });
    res.status(STATUS_CODES.SUCCESS).json({ success: true, data });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).send(err.message);
  }
};

module.exports = {
  createNewApplication,
  getJobApplications,
  editInterviewRound,
  portalToMainApplication,
};
