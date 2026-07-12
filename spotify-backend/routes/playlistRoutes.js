const express = require("express");
const router = express.Router();
const {
  createPlaylist,
  getPlaylists,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = require("../controllers/playlistController");

const protect = require("../middleware/authMiddleware");

// Public Routes
router.get("/", protect, getPlaylists);
router.get("/:id", protect, getPlaylist);

// Protected Routes
router.post("/", protect, createPlaylist);
router.put("/:id", protect, updatePlaylist);
router.delete("/:id", protect, deletePlaylist);


router.post(
  "/:playlistId/songs/:songId",
  protect,
  addSongToPlaylist
);

router.delete(
  "/:playlistId/songs/:songId",
  protect,
  removeSongFromPlaylist
);
module.exports = router;