require("dotenv").config();
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jobSchema = new mongoose.Schema({
  jobName: {
    type: String,
    required: [true, "Please Provide Name"],
  },
  jobDescription: {
    type: String,
  },
  city: {
    type: String,
  },
  jobType: {
    type: String,
  },
  jobStatus: {
    type: String,
  },
  companyEmail: {
    type: String,
    required: [true, "Please Provide Email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid and Unique email",
    ],
  },
});
module.exports = mongoose.model("Job", jobSchema);
