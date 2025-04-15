const { Router } = require("express");
const {
  getInterviewQuestionsByUserId,
  addNewQuestion,
  deleteQuestion,
} = require("../controllers/InterviewQuestions");

const iqRouter = Router();

iqRouter.get("/:id", getInterviewQuestionsByUserId);
iqRouter.post("/add", addNewQuestion);
iqRouter.delete("/:id", deleteQuestion);

module.exports = iqRouter;
