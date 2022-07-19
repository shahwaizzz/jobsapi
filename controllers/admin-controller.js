const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const Ebook = require("../models/ebook-model");
const Notes = require("../models/notes-model");
const News = require("../models/news-model");
const Paper = require("../models/paper-model");
const studySchemeModel = require("../models/study-scheme-model");
const Student = require("../models/student-model");
//-------- Ebooks -------------
const createEbook = async (req, res) => {
  console.log("in create ebook");
  console.log("body : ", req.body);
  const ebook = await Ebook.create({
    ...req.body,
    ebookImage: req.files.ebookImage[0].path,
    ebookDoc: req.files.ebookDoc[0].path,
  });

  res.status(StatusCodes.CREATED).json({ msg: "Ebook Created Succesfully" });
};
const getAllEbooks = async (req, res) => {
  const ebooks = await Ebook.find({});
  if (ebooks.length === 0) {
    throw new NotFoundError("No Ebooks Found");
  }
  res.status(StatusCodes.OK).json({ ebooks });
};
const getSingleEbook = async (req, res) => {
  const ebook = await Ebook.findOne({ _id: req.params.id });
  if (!ebook) {
    throw new NotFoundError("Ebook Not Found");
  }
  res.status(StatusCodes.OK).json({ ebook });
};
const updateEbook = async (req, res) => {
  const ebook = await Ebook.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!ebook) {
    throw new NotFoundError("Ebook does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Ebook Updated" });
};
const deleteEbook = async (req, res) => {
  const deletedEbook = await Ebook.findByIdAndDelete({ _id: req.params.id });
  if (!deletedEbook) {
    throw new NotFoundError("Ebook not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Ebook Deleted" });
};
// ------------ Notes --------
const createNotes = async (req, res) => {
  // console.log(req.file);
  const note = await Notes.create({
    ...req.body,
    notesDoc: req.files.notesDoc[0].path,
    notesImage: req.files.notesImage[0].path,
  });

  res.status(StatusCodes.CREATED).json({ msg: "Notes Created Succesfully" });
};
const getAllNotes = async (req, res) => {
  const notes = await Notes.find({});
  if (notes.length === 0) {
    throw new NotFoundError("No Notes Found");
  }
  res.status(StatusCodes.OK).json({ notes });
};
const getSingleNotes = async (req, res) => {
  const notes = await Notes.findOne({ _id: req.params.id });
  if (!notes) {
    throw new NotFoundError("Notes Not Found");
  }
  res.status(StatusCodes.OK).json({ notes });
};
const getNotesByClass = async (req, res) => {
  const notes = await Notes.find({ class: req.params.class });
  if (notes.length === 0) {
    throw new NotFoundError("Notes not found");
  }
  res.status(StatusCodes.OK).json({ notes });
};
const getNotesByChapter = async (req, res) => {
  const notes = await Notes.find({ chapter: req.params.chapter });
  if (notes.length === 0) {
    throw new NotFoundError("Notes not found");
  }
  res.status(StatusCodes.OK).json({ notes });
};
const updateNotes = async (req, res) => {
  const notes = await Notes.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!notes) {
    throw new NotFoundError("Notes does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Notes Updated" });
};
const deleteNotes = async (req, res) => {
  const deletedNotes = await Notes.findByIdAndDelete({ _id: req.params.id });
  if (!deletedNotes) {
    throw new NotFoundError("Notes not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Notes Deleted" });
};
// news
const createNews = async (req, res) => {
  const news = await News.create({ ...req.body, newsImage: req.file.path });
  res.status(StatusCodes.CREATED).json({ msg: "News Created" });
};
const editNews = async (req, res) => {
  const news = await News.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ msg: "News Updated" });
};
const deleteNews = async (req, res) => {
  const news = await News.findByIdAndDelete({ _id: req.params.id });
  res.status(StatusCodes.OK).json({ msg: "News Deleted" });
};
const getAllNews = async (req, res) => {
  const news = await News.find({});
  if (news.length === 0) {
    throw new NotFoundError("No News Found");
  }
  res.status(StatusCodes.OK).json({ news });
};
const getSingleNews = async (req, res) => {
  const news = await News.findOne({ _id: req.params.id });
  if (!news) {
    throw new NotFoundError("News does not exist");
  }
  res.status(StatusCodes.OK).json({ news });
};
// paper
const createPaper = async (req, res) => {
  console.log(req.file);
  const paper = await Paper.create({ ...req.body, paperDoc: req.file.path });
  res.status(StatusCodes.CREATED).json({ msg: "Paper Created" });
};
const viewAllPapers = async (req, res) => {
  const papers = await Paper.find({});
  if (papers.length === 0) {
    throw new NotFoundError("No Papers Found");
  }
  res.status(StatusCodes.OK).json({ papers });
};
const getSinglePaper = async (req, res) => {
  const paper = await Paper.findOne({ _id: req.params.id });
  if (!paper) {
    throw new NotFoundError("Paper does not found");
  }
  res.status(StatusCodes.OK).json({ paper });
};
const editPaper = async (req, res) => {
  const updatedPaper = await Paper.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedPaper) {
    throw new NotFoundError("Paper does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Paper Updated" });
};
const deletePaper = async (req, res) => {
  const deletedPaper = await Paper.findByIdAndDelete({ _id: req.params.id });
  res.status(StatusCodes.OK).json({ msg: "Paper Deleted" });
};
const createStudyScheme = async (req, res) => {
  const studyScheme = await studySchemeModel.create({
    ...req.body,
    studySchemeDoc: req.file.path,
  });
  res.status(StatusCodes.CREATED).json({ msg: "Study Scheme Created" });
};
const viewAllStudySchemes = async (req, res) => {
  const studySchemes = await studySchemeModel.find({});
  if (studySchemes.length === 0) {
    throw new NotFoundError("No Study Schemes Found");
  }
  res.status(StatusCodes.OK).json({ studySchemes });
};
const getSingleStudyScheme = async (req, res) => {
  const studyScheme = await studySchemeModel.findOne({ _id: req.params.id });
  if (!studyScheme) {
    throw new NotFoundError("Study Scheme does not found");
  }
  res.status(StatusCodes.OK).json({ studyScheme });
};
const editStudyScheme = async (req, res) => {
  const updatedStudyScheme = await studySchemeModel.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedStudyScheme) {
    throw new NotFoundError("Study Scheme does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Study Scheme Updated" });
};
const deleteStudyScheme = async (req, res) => {
  const deletedStudyScheme = await Paper.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!deletedStudyScheme) {
    throw new NotFoundError("Study Scheme does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Study Scheme Deleted" });
};
const downloadPDF = async (req, res) => {
  const id = req.params.id;
  const notes = await Notes.findOne({ _id: id });
  if (notes) {
    return res.sendfile(notes.notesDoc);
  }
  const ebook = await Ebook.findOne({ _id: id });
  if (ebook) {
    return res.sendfile(ebook.ebookDoc);
  }
  const studyscheme = await studySchemeModel.findOne({ _id: id });
  if (studyscheme) {
    return res.sendfile(studyscheme.studySchemeDoc);
  }
  const paper = await Paper.findOne({ _id: id });
  if (paper) {
    return res.sendfile(paper.paperDoc);
  }
  res.status(StatusCodes.OK).json({ msg: "No file found" });
};
const getUsers = async (req, res) => {
  const users = await Student.find({});
  if (users.length === 0) {
    throw new NotFoundError("No Students Found");
  }
  res.status(StatusCodes.OK).json({ users });
};

module.exports = {
  createEbook,
  deleteEbook,
  getAllEbooks,
  updateEbook,
  getSingleEbook,
  createNotes,
  getAllNotes,
  getSingleNotes,
  getNotesByClass,
  getNotesByChapter,
  updateNotes,
  deleteNotes,
  createNews,
  deleteNews,
  editNews,
  getAllNews,
  getSingleNews,
  createPaper,
  viewAllPapers,
  getSinglePaper,
  editPaper,
  deletePaper,
  createStudyScheme,
  viewAllStudySchemes,
  getSingleStudyScheme,
  editStudyScheme,
  deleteStudyScheme,
  downloadPDF,
  getUsers,
};
