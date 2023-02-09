const Recruiter = require("../models/recruiter-model");
const Applicant = require("../models/applicant-model");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const register = async (req, res) => {
  const recruiter = await Recruiter.create({ ...req.body });
  const token = await recruiter.createJWT();
  res.status(StatusCodes.CREATED).json({ token });
};
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please Provide Email and Password");
  }
  const newRecruiter = await Recruiter.findOne({
    username: username,
    password: password,
  });
  if (!newRecruiter) {
    console.log(newRecruiter);
    throw new UnauthenticatedError("User not found");
  }
  const token = newRecruiter.createJWT();
  res.status(StatusCodes.OK).json({ msg: "Login successful", token });
};
const applicationLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please Provide Email and Password");
  }
  const applicant = await Applicant.findOne({
    username: username,
    password: password,
  });
  if (!applicant) {
    console.log(newRecruiter);
    throw new UnauthenticatedError("User not found");
  }
  const token = applicant.createJWT();
  res.status(StatusCodes.OK).json({ msg: "Login successful", token });
};
const applicationRegister = async (req, res) => {
  const applicant = await Applicant.create({ ...req.body });
  const token = await applicant.createJWT();
  res.status(StatusCodes.CREATED).json({ token });
};

module.exports = {
  login,
  register,
  applicationLogin,
  applicationRegister,
};
