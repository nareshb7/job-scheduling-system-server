const mongoose = require("mongoose");

const PortalApplicationSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    description: {
      type: Object,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    portal: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    hirer: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    appliedDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { minimize: false, timestamps: true }
);

module.exports.PortalApplicationModel = mongoose.model(
  "PortalApplication",
  PortalApplicationSchema
);
