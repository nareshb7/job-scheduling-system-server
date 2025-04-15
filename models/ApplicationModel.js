const mongoose = require("mongoose");

const InterviewRoundSchema = new mongoose.Schema({
  date: String,
  roundName: String,
  performance: String,
  nextInterviewDate: String,
  questionsAsked: Array,
  description: String,
});

const applicationSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },

    appliedDate: {
      type: Date,
      required: true,
    },
    applicationStatus: {
      type: String,
      required: true,
      default: "Applied",
    },
    nextFollowup: {
      type: Date,
    },
    hrData: {
      name: String,
      phone: String,
      email: String,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    companyLocation: {
      type: String,
      required: true,
    },
    notes: String,
    jobId: String,
    resumeId: String,
    interviewRounds: [InterviewRoundSchema],
  },
  { minimize: false, timestamps: true }
);

module.exports.ApplicationModel = mongoose.model(
  "application",
  applicationSchema
);
