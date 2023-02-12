const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const Applicant = require("../models/applicant-model");
const Job = require("../models/jobs-model");
const Recruiter = require("../models/recruiter-model");
const { applicantsData, recruitersData } = require("../data");
const createJob = async (req, res) => {
  const ebook = await Job.create({
    ...req.body,
  });
  res.status(StatusCodes.CREATED).json({ msg: "Job Created Succesfully" });
};
const getAllJob = async (req, res) => {
  const job = await Job.find({});
  if (job.length === 0) {
    throw new NotFoundError("No Jobs Found");
  }
  res.status(StatusCodes.OK).json({ job });
};
const getSingleJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id });
  if (!job) {
    throw new NotFoundError("Job Not Found");
  }
  res.status(StatusCodes.OK).json({ Job });
};
const updateJob = async (req, res) => {
  const job = await Job.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!job) {
    throw new NotFoundError("Job does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Job Updated" });
};
const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete({ _id: req.params.id });
  if (!job) {
    throw new NotFoundError("Job not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Job Deleted" });
};

const getRecruiters = async (req, res) => {
  const recruiters = await Recruiter.find({});
  if (recruiters.length === 0) {
    throw new NotFoundError("No recruiters found");
  }
  res.status(StatusCodes.OK).json({ recruiters });
};
const getApplicants = async (req, res) => {
  const applicants = await Applicant.find({});
  if (applicants.length === 0) {
    throw new NotFoundError("No applicants found");
  }
  res.status(StatusCodes.OK).json({ applicants });
};
const populateDB = async (req, res) => {
  const applicants = await Applicant.insertMany(applicantsData);
  const recruiters = await Recruiter.insertMany(recruitersData);
  res.status(StatusCodes.OK).json({ msg: "Users Created" });
};
const getImage = async (req, res) => {
  const recruiter = await Recruiter.findOne({ _id: req.params.id });
  res.sendFile(recruiter.logo);
};
const getProfilePic = async (req, res) => {
  const applicant = await Applicant.findOne({ _id: req.params.id });
  res.sendFile(applicant.profilePic);
};

module.exports = {
  createJob,
  getAllJob,
  deleteJob,
  updateJob,
  getSingleJob,
  getApplicants,
  getRecruiters,
  populateDB,
  getImage,
  getProfilePic,
};
