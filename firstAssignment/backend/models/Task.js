const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
