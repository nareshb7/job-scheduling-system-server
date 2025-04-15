const { STATUS_CODES } = require("../constants");
const { InterviewQuestionModel } = require("../models/InterviewQuestionsModel");

const getInterviewQuestionsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await InterviewQuestionModel.find({ userId: id });
    res.status(STATUS_CODES.SUCCESS).json({ success: true, data });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

const addNewQuestion = async (req, res) => {
  try {
    const { question, answer, userId } = req.body;
    const data = await InterviewQuestionModel.create({
      userId,
      company: "User",
      question,
      answer,
    });
    res.status(STATUS_CODES.SUCCESS).json({ success: true, data });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

module.exports = {
  getInterviewQuestionsByUserId,
  addNewQuestion,
};
