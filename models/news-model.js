const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Provide Title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Provide Descripton"],
      minlength: 30,
    },
    category: {
      type: String,
      required: [true, "Please Provide Category"],
    },
    newsImage: {
      type: String,
      required: [true, "Please Provide Image"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
