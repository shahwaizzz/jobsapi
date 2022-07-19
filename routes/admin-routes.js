const express = require("express");
const router = express.Router();
const {
  createEbook,
  getAllEbooks,
  getSingleEbook,
  updateEbook,
  deleteEbook,
  getAllNews,
  createNews,
  deleteNews,
  editNews,
  getSingleNews,
  downloadPDF,
  getUsers,
} = require("../controllers/admin-controller");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "ebookImage") {
      cb(null, "./public/ebook/images/");
    } else {
      cb(null, "./public/ebook/docs/");
    }
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "ebookDoc") {
    // if uploading resume
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else {
    // else uploading image
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      // check file type to be png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: fileFilter,
});

//multer configuration for news
const newsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/news/images/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const newsFileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const newsUpload = multer({
  storage: newsStorage,
  limits: {
    fileSize: 1024 * 1024 * 25,
  },
  fileFilter: newsFileFilter,
});

//ebooks routing
router.post(
  "/create-ebook",
  upload.fields([
    { name: "ebookImage", maxCount: 1 },
    { name: "ebookDoc", maxCount: 1 },
  ]),
  createEbook
);
router.route("/ebooks").get(getAllEbooks);
router.route("/ebooks/:id").get(getSingleEbook).delete(deleteEbook);
router.patch(
  "/ebooks/:id",
  upload.fields([
    { name: "ebookImage", maxCount: 1 },
    { name: "ebookDoc", maxCount: 1 },
  ]),
  updateEbook
);
router.route("/download/:id").get(downloadPDF);
//news routes
router.post("/news", newsUpload.single("newsImage"), createNews);
router.route("/news").get(getAllNews);
router.route("/news/:id").get(getSingleNews).delete(deleteNews).patch(editNews);

router.get("/students", getUsers);

module.exports = router;
