const Admin = require("../models/admin-model");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    throw new BadRequestError("Please Provide Username and Password");
  }

  const newAdmin = await Admin.findOne({
    username: username,
    password: password,
  });
  console.log(newAdmin, "dfdfsaddf");
  if (!newAdmin) {
    console.log(newAdmin);
    throw new UnauthenticatedError("User not found");
  }
  const token = newAdmin.createJWT();
  res.status(StatusCodes.OK).json({ msg: "Login successful", token });
};
const getAdmin = async (req, res) => {
  const admins = await Admin.find({});
  res.status(200).json(admins);
};
module.exports = {
  login,
  getAdmin,
};
