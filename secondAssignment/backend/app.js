const express = require("express");

const app = express();

const path = require("path");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const cors = require("cors");

const rootDir = require("./util/path");

const astrologerRoutes = require("./routes/Astrologer");
const userRoutes = require("./routes/User");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(rootDir, "../frontend/public")));

app.use("/api", astrologerRoutes);
app.use("/api", userRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/sencondAssignment")
  .then((result) => {
    app.listen(8000);
    console.log("connection established");
  })
  .catch((err) => {
    console.log("error connecting to database");
  });
