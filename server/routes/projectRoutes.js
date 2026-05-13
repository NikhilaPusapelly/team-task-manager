const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  deleteProject,
} = require("../controllers/projectController");

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

// Create Project
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createProject
);

// Get Projects
router.get(
  "/",
  authMiddleware,
  getProjects
);

// Delete Project
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProject
);

module.exports = router;