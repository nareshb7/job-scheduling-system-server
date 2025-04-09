const mongoose = require("mongoose");

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
    applicatinStatus: {
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
  },
  { minimize: false, timestamps: true }
);

module.exports.ApplicationModel = mongoose.model(
  "application",
  applicationSchema
);
