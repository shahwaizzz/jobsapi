const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/student-auth");

router.post("/login", login);
router.route("/register").post(register);

module.exports = router;
