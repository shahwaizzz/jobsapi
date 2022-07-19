const express = require("express");
const router = express.Router();
const {
  createNotes,
  getAllNotes,
  getSingleNotes,
  getNotesByClass,
  getNotesByChapter,
  updateNotes,
  deleteNotes,
} = require("../controllers/admin-controller");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "notesImage") {
      cb(null, "./public/notes/images/");
    } else {
      cb(null, "./public/notes/docs/");
    }
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "notesDoc") {
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

//ebooks routing
router.post(
  "/create-notes",
  upload.fields([
    { name: "notesImage", maxCount: 1 },
    { name: "notesDoc", maxCount: 1 },
  ]),
  createNotes
);
router.route("/").get(getAllNotes);
router.route("/:id").get(getSingleNotes).delete(deleteNotes);
router.patch(
  "/:id",
  upload.fields([
    { name: "notesImage", maxCount: 1 },
    { name: "notesDoc", maxCount: 1 },
  ]),
  updateNotes
);
// router.get("/class/:class", getNotesByClass);
router.get("/class/:class", getNotesByClass);
router.get("/chapter/:chapter", getNotesByChapter);

module.exports = router;
