const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    console.log(req.body);

    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      project: req.body.project,
      assignedTo: req.body.assignedTo,
      dueDate: req.body.dueDate,
      status: "todo",
    });

    const savedTask =
      await task.save();

    res.status(201).json(
      savedTask
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("project")
      .populate("assignedTo");

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Task Status
const updateTaskStatus = async (
  req,
  res
) => {
  try {
    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(
      updatedTask
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Task
const deleteTask = async (
  req,
  res
) => {
  try {
    await Task.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Task deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};