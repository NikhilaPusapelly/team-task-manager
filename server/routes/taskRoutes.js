const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

// Admin Middleware
const adminMiddleware = (
  req,
  res,
  next
) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      message:
        "Access denied. Admin only.",
    });
  }

  next();
};

// Create Task
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTask
);

// Get Tasks
router.get(
  "/",
  authMiddleware,
  getTasks
);

// Update Task Status
router.put(
  "/:id",
  authMiddleware,
  updateTaskStatus
);

// Delete Task
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteTask
);

module.exports = router;