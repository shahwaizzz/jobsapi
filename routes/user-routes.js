const express = require("express");
const router = express.Router();
const {
  createJob,
  updateJob,
  getAllJob,
  getSingleJob,
  deleteJob,
  getRecruiters,
  getApplicants,
  populateDB,
  getImage,
  getProfilePic,
} = require("../controllers/user-controller");

router.route("/jobs").post(createJob).get(getAllJob);
router.route("/job/:id").delete(deleteJob).get(getSingleJob).patch(updateJob);

router.get("/users/recruiters", getRecruiters);
router.get("/users/applicants", getApplicants);
router.get("/populate-db", populateDB);
router.get("/get-image/:id", getImage);
router.get("/get-profile/:id", getProfilePic);

module.exports = router;
