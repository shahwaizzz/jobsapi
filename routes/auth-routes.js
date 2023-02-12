const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

const {
  login,
  register,
  applicationLogin,
  applicationRegister,
} = require("../controllers/auth-controller");

router.post("/recruiter/login", login);
router.post("/recruiter/register", upload.single("logo"), register);
router.post("/applicant/login", applicationLogin);
router.route("/applicant/register").post(applicationRegister);

module.exports = router;
