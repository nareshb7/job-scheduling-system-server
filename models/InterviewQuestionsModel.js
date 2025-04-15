const mongoose = require("mongoose");

const InterviewQuestionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: String,
    company: {
      type: String,
      required: true,
    },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports.InterviewQuestionModel = mongoose.model(
  "InterviewQuestion",
  InterviewQuestionSchema
);
