const express = require("express");
const router = express.Router();
const {
  ebookComment,
  paperComment,
  studyschemeComment,
  notesComment,
  signupNewsletter,
  getAllNews,
  likePaperComment,
  likeEbookComment,
  likeNotesComment,
  likeStudySchemeComment,
  getNewsByCategory,
  search,
} = require("../controllers/student-controller");

router.post("/notes/comment/:id", notesComment);
router.post("/ebook/comment/:id", ebookComment);
router.post("/paper/comment/:id", paperComment);
router.post("/studyscheme/comment/:id", studyschemeComment);
router.post("/signup-newsletter", signupNewsletter);
router.get("/news", getNewsByCategory);
router.post("/paper/like", likePaperComment);
router.post("/ebook/like", likeEbookComment);
router.post("/notes/like", likeNotesComment);
router.post("/studyscheme/like", likeStudySchemeComment);
router.get("/search", search);

module.exports = router;
