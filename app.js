require("dotenv").config();
const express = require("express");
const app = express();
require("express-async-errors");
const bodyParser = require("body-parser");
const connectDb = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const morgan = require("morgan");
const adminAuthRoutes = require("./routes/admin-auth-routes");
const studentAuthRoutes = require("./routes/student-auth-routes");
const adminRoutes = require("./routes/admin-routes");
const studyschemeRoutes = require("./routes/study-scheme-routes");
const studentRoutes = require("./routes/student-routes");
const cors = require("cors");

app.use(morgan("dev"));
app.use("/public", express.static("public"));
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const notesRoutes = require("./routes/notes-routes");
const paperRoutes = require("./routes/paper-routes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    res.status(200).json({});
  }
  next();
});

//my routers
app.use("/auth/admin", adminAuthRoutes);
app.use("/admin", adminRoutes);
app.use("/auth/student", studentAuthRoutes);
app.use("/notes", notesRoutes);
app.use("/paper", paperRoutes);
app.use("/studyscheme", studyschemeRoutes);
app.use("/student", studentRoutes);
// not found middleware
app.use(notFoundMiddleware);
// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

//error handler middleware
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async (req, res) => {
  try {
    await connectDb(
      "mongodb+srv://shahwaiz:JCdUqcyl1nfW75B7@taskmanager.an4it.mongodb.net/prhaku?retryWrites=true&w=majority"
    );
    app.listen(PORT, console.log(`server is listening on port ${PORT} `));
  } catch (error) {
    console.log(error);
  }
};

start();
