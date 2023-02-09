require("dotenv").config();
const express = require("express");
const app = express();
require("express-async-errors");
const bodyParser = require("body-parser");
const connectDb = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const morgan = require("morgan");
const authRoutes = require("./routes/auth-routes");
const recruiterRoutes = require("./routes/recruiter-routes");
const cors = require("cors");

app.use(morgan("dev"));
app.use("/public", express.static("public"));
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
app.use("/auth", authRoutes);
app.use("/api", recruiterRoutes);
app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async (req, res) => {
  try {
    await connectDb(
      "mongodb+srv://shahwaiz:JCdUqcyl1nfW75B7@taskmanager.an4it.mongodb.net/jobportal?retryWrites=true&w=majority"
    );
    app.listen(PORT, console.log(`server is listening on port ${PORT} `));
  } catch (error) {
    console.log(error);
  }
};

start();
