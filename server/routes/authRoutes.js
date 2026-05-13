const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  signup,
  login,
} = require("../controllers/authController");

const router = express.Router();

// Public Routes
router.post("/signup", signup);
router.post("/login", login);

// Protected Route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected profile route",
    user: req.user,
  });
});

module.exports = router;