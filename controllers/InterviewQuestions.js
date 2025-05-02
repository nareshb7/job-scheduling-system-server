const { STATUS_CODES } = require("../constants");
const { InterviewQuestionModel } = require("../models/InterviewQuestionsModel");
const { getAIAnswers } = require("./GenAIController");

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
    let { question, answer, userId } = req.body;
    let topicTags = [];
    if (!answer) {
      const [aiAnswer] = await getAIAnswers(question);
      question = aiAnswer?.question || question;
      answer = aiAnswer.answer || answer;
      topicTags = aiAnswer.topicTags || topicTags;
    }
    const data = await InterviewQuestionModel.create({
      userId,
      company: "User",
      question,
      answer,
      topicTags,
    });
    res.status(STATUS_CODES.SUCCESS).json({ success: true, data });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await InterviewQuestionModel.findByIdAndDelete(id);
    res.status(STATUS_CODES.SUCCESS).json({ success: true, data });
  } catch (err) {
    res.status(STATUS_CODES.ERROR).json(err.message);
  }
};

module.exports = {
  getInterviewQuestionsByUserId,
  addNewQuestion,
  deleteQuestion,
};
