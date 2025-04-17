const { isValidObjectId } = require("mongoose");
const { STATUS_CODES } = require("../constants");
const { ApplicationModel } = require("../models/ApplicationModel");
const { InterviewQuestionModel } = require("../models/InterviewQuestionsModel");
const { checkValidation } = require("./helper");
const { getAIAnswers, getAIDescription } = require("./GenAIController");

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
      hrEmail,
      portal,
    } = req.body;
    if (!checkValidation(req.body)) {
      throw new Error("Fields are required");
    }
    if (!isValidObjectId(userId)) {
      throw new Error("User Id not valid");
    }

    const aiDescription = await getAIDescription(jobDescription);
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
        email: hrEmail,
      },
      jobDescription: aiDescription,
      companyLocation,
      userId,
      resumeId,
      portal,
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

module.exports = {
  createNewApplication,
  getJobApplications,
  editInterviewRound,
};
