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
    title: {
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
    description: {
      type: Object,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    notes: String,
    jobId: String,
    resumeId: String,
    interviewRounds: [InterviewRoundSchema],
    portal: {
      type: String,
      required: true,
      default: "Career Website",
    },
    url: {
      type: String,
      required: true,
      default: "",
    },
  },
  { minimize: false, timestamps: true }
);

module.exports.ApplicationModel = mongoose.model(
  "application",
  applicationSchema
);
