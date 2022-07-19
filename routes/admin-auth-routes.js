const express = require("express");
const router = express.Router();

const { login, getAdmin } = require("../controllers/admin-auth");

router.post("/login", login);
router.route("/getadmin").get(getAdmin);

module.exports = router;
