const { Router } = require("express");
const {
  getInterviewQuestionsByUserId,
  addNewQuestion,
} = require("../controllers/InterviewQuestions");

const iqRouter = Router();

iqRouter.get("/:id", getInterviewQuestionsByUserId);
iqRouter.post("/add", addNewQuestion);

module.exports = iqRouter;
