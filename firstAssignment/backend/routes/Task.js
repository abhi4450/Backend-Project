const express = require("express");

const router = express.Router();

const userAuth = require("../middleware/auth");
const TaskController = require("../controllers/Task");

router.post("/user/task", userAuth.authenticate, TaskController.enqueueTask);

module.exports = router;
