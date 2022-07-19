const mongoose = require("mongoose");

const studySchemeSchema = new mongoose.Schema({
  class: {
    type: String,
    required: [true, "Please Provide Class"],
  },
  category: {
    type: String,
    required: [true, "Please Provide Category"],
  },
  description: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: [true, "Please Provide Subject"],
  },
  comments: [
    {
      comment: String,
      studentName: String,
      likes: Number,
    },
  ],
  studySchemeDoc: {
    type: String,
    required: [true, "Please Provide Study Scheme Document"],
  },
});

module.exports = mongoose.model("StudyScheme", studySchemeSchema);
