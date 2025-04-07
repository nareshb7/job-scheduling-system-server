const mongoose = require("mongoose");

const jobSchema =mongoose.Schema({
    company:{
        type: String,
        require: true,
    },
    position: {
        type: String,
        require: true,
    },
    appliedDate: {
        type: Date,
        require: true,
    },
    applicatinStatus: {
        type: String,
        require: true,
        default:  'Applied',
    },
    nextFollowup: {
        type: Date,
    },
    hrNumber : {
        type: String,
    },
    jobDescription: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true,
    },
    notes: String,
}, {minimize: false, timestamps: true})

module.exports.JobModel = mongoose.model("Jobs", jobSchema)