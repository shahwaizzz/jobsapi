const Student = require("../models/student-model");
const { StatusCodes } = require("http-status-codes");
const register = async (req, res) => {
  console.log("Request dot body = ",req.body)
  const student = await Student.create({ ...req.body });
  const token = await student.createJWT();
  res.status(StatusCodes.CREATED).json({ token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log(req);
    throw new BadRequestError("Please Provide Email and Password");
  }

  const student = await Student.findOne({ email });
  if (!student) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await student.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Your password does not match");
  }
  const token = student.createJWT();
  res.status(StatusCodes.OK).json({ student: { name: student.name }, token });
};

module.exports = {
  login,
  register,
};
