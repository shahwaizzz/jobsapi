const express = require("express");
const router = express.Router();

const {
  login,
  register,
  applicationLogin,
  applicationRegister,
} = require("../controllers/auth-controller");

router.post("/recruiter/login", login);
router.route("/recruiter/register").post(register);
router.post("/applicant/login", applicationLogin);
router.route("/applicant/register").post(applicationRegister);

module.exports = router;
