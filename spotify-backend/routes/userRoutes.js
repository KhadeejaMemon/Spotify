const express = require("express");
const router = express.Router();

const {
  likeSong,
  unlikeSong,
  getLikedSongs,
  addToHistory,
  getHistory,
  getProfile,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

// Like Song
router.post("/liked/:songId", protect, likeSong);

// Unlike Song
router.delete("/liked/:songId", protect, unlikeSong);

// Get Liked Songs
router.get("/liked", protect, getLikedSongs);

// Add Song To History
router.post("/history/:songId", protect, addToHistory);

// Get History
router.get("/history", protect, getHistory);

router.get("/profile", protect, getProfile);

module.exports = router;