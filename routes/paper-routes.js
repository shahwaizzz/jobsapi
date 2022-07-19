const express = require("express");
const router = express.Router();
const {
  createPaper,
  deletePaper,
  viewAllPapers,
  getSinglePaper,
  editPaper,
} = require("../controllers/admin-controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/papers/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 25,
  },
  fileFilter: fileFilter,
});

router.post("/create-paper", upload.single("paperDoc"), createPaper);
router.route("/").get(viewAllPapers);
router.route("/:id").delete(deletePaper).get(getSinglePaper);
router.patch("/:id", upload.single("paperDoc"), editPaper);

module.exports = router;
