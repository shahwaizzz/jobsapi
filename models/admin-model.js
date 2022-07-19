const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide User"],
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
  },
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
  },
});
adminSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_Lifetime,
    }
  );
};
module.exports = mongoose.model("Admin", adminSchema);
