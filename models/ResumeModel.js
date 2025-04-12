const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    file: {
      data: Buffer,
      contentType: String,
      originalName: String,
    },
  },
  { minimize: false, timestamps: true }
);

module.exports.ResumeModel = mongoose.model("Resume", resumeSchema);
