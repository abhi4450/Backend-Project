const Task = require("../models/Task");
const { Queue } = require("bullmq");

const taskQueue = new Queue("taskQueue", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});

exports.enqueueTask = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { message } = req.body;

    const task = new Task({
      userId: _id,
      message: message,
    });

    await task.save();

    taskQueue.add("task", { message });
    console.log(`Task added to queue for user ${_id}`);

    res.status(200).json({ message: `task added to queue for user ${_id}` });
  } catch (err) {
    res.json({ message: "error enqueueing the task" });
  }
};
