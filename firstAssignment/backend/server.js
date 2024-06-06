const express = require("express");

const app = express();

const path = require("path");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const cors = require("cors");

require("dotenv").config();

const User = require("./models/User");

const userRoutes = require("./routes/User");
const forgotpasswordRoutes = require("./routes/ForgotPasswordRequest");
const taskRoutes = require("./routes/Task");

const rootDir = require("./util/path");


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(rootDir, "../frontend/public")));

app.use("/api", userRoutes);
app.use("/api", forgotpasswordRoutes);
app.use("/api", taskRoutes);



mongoose
  .connect("mongodb://127.0.0.1:27017/userdata")
  .then((result) => {
    app.listen(3000);
    console.log("connection established");
  })
  .catch((err) => {
    console.log("error connecting to database");
  });
