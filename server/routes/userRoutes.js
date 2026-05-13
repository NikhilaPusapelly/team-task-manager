const express = require("express");

const router = express.Router();

const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");

// Get All Users
router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const users = await User.find()
        .select("-password");

      res.status(200).json(users);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;