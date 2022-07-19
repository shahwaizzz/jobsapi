const Ebook = require("../models/ebook-model");
const Paper = require("../models/paper-model");
const Notes = require("../models/notes-model");
const StudyScheme = require("../models/study-scheme-model");
const News = require("../models/news-model");
const Newsletter = require("../models/newsletter-emails-model");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const ebookComment = async (req, res) => {
  const doc = await Ebook.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { comments: req.body } },
    {
      new: true,
      runValidators: true,
    }
  );
  console.log("heelo");
  if (!doc) {
    throw new NotFoundError("This document does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Comment Added" });
};
const paperComment = async (req, res) => {
  const doc = await Paper.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { comments: req.body } },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!doc) {
    throw new NotFoundError("This document does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Comment Added" });
};
const notesComment = async (req, res) => {
  const doc = await Notes.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { comments: req.body } },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!doc) {
    throw new NotFoundError("This document does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Comment Added" });
};
const studyschemeComment = async (req, res) => {
  const doc = await StudyScheme.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { comments: req.body } },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!doc) {
    throw new NotFoundError("This document does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Comment Added" });
};
const likePaperComment = async (req, res) => {
  const likes = await Paper.findOneAndUpdate(
    { _id: req.body.id, "comments._id": req.body.commentId },
    { $inc: { "comments.$.likes": 1 } }
  );
  res.status(StatusCodes.OK).json({ msg: "Comment Liked" });
};
const likeStudySchemeComment = async (req, res) => {
  const likes = await StudyScheme.findOneAndUpdate(
    { _id: req.body.id, "comments._id": req.body.commentId },
    { $inc: { "comments.$.likes": 1 } }
  );
  res.status(StatusCodes.OK).json({ msg: "Comment Liked" });
};
const likeEbookComment = async (req, res) => {
  const likes = await Ebook.findOneAndUpdate(
    { _id: req.body.id, "comments._id": req.body.commentId },
    { $inc: { "comments.$.likes": 1 } }
  );
  res.status(StatusCodes.OK).json({ msg: "Comment Liked" });
};
const likeNotesComment = async (req, res) => {
  const likes = await Notes.findOneAndUpdate(
    { _id: req.body.id, "comments._id": req.body.commentId },
    { $inc: { "comments.$.likes": 1 } }
  );
  res.status(StatusCodes.OK).json({ msg: "Comment Liked" });
};
const signupNewsletter = async (req, res) => {
  const email = Newsletter.create(req.body);
  res
    .status(StatusCodes.OK)
    .json({ msg: "Congratulations! Signed up as newslettter" });
};
const getAllNews = async (req, res) => {
  const news = await News.find({});
  if (news.length === 0) {
    throw new NotFoundError("No News Found");
  }
  res.status(StatusCodes.OK).json({ news });
};
const getNewsByCategory = async (req, res) => {
  const news = await News.find({ category: req.query.category });
  if (news.length === 0) {
    throw new NotFoundError("No News Found");
  }
  res.status(StatusCodes.OK).json({ news });
};
const search = async (req, res) => {
  const searchquery = req.query.query;
  const ebook = await Ebook.find({
    $or: [
      { title: { $regex: searchquery, $options: "$i" } },
      { category: { $regex: searchquery, $options: "$i" } },
    ],
  });
  const notes = await Notes.find({
    $or: [
      { title: { $regex: searchquery, $options: "$i" } },
      { subject: { $regex: searchquery, $options: "$i" } },
      { class: { $regex: searchquery, $options: "$i" } },
    ],
  });
  const news = await News.find({
    $or: [
      { title: { $regex: searchquery, $options: "$i" } },
      { description: { $regex: searchquery, $options: "$i" } },
      { category: { $regex: searchquery, $options: "$i" } },
    ],
  });
  const studyscheme = await StudyScheme.find({
    $or: [
      { class: { $regex: searchquery, $options: "$i" } },
      { category: { $regex: searchquery, $options: "$i" } },
      { subject: { $regex: searchquery, $options: "$i" } },
    ],
  });
  const papers = await Paper.find({
    $or: [
      { board: { $regex: searchquery, $options: "$i" } },
      { subject: { $regex: searchquery, $options: "$i" } },
      { class: { $regex: searchquery, $options: "$i" } },
      { type: { $regex: searchquery, $options: "$i" } },
      { university: { $regex: searchquery, $options: "$i" } },
    ],
  });

  res.status(StatusCodes.OK).json({ ebook, notes, news, studyscheme, papers });
};
module.exports = {
  ebookComment,
  paperComment,
  notesComment,
  studyschemeComment,
  signupNewsletter,
  getAllNews,
  getNewsByCategory,
  likePaperComment,
  likeEbookComment,
  likeNotesComment,
  likeStudySchemeComment,
  search,
};
