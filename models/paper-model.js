const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  board: String,
  subject: String,
  class: String,
  type: {
    type: String,
    required: [true, "Please Provide Type"],
    enum: ["Past Paper", "Guess Paper", "Test Series"],
  },
  university: String,
  paperDoc: {
    type: String,
    required: [true, "Please Provide Paper Documents"],
  },
  description: {
    type: String,
    required: true,
  },
  comments: [
    {
      comment: String,
      studentName: String,
      likes: Number,
    },
  ],
});

module.exports = mongoose.model("Paper", paperSchema);
