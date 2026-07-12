

const express = require("express");
const router = express.Router();

const {
  createSong,
  getSongs,
  getSong,
  updateSong,
  deleteSong,
} = require("../controllers/songController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { uploadSong } = require("../middleware/uploadMiddleware");
const validateSong = require("../validators/songValidator");


// Public Routes
router.get("/", getSongs);
router.get("/:id", getSong);


// Admin Create Song
router.post(
  "/",
  protect,
  admin,
  uploadSong.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  validateSong,
  createSong
);


// Admin Update Song
router.put(
  "/:id",
  protect,
  admin,
  uploadSong.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  updateSong
);


// Admin Delete Song
router.delete("/:id", protect, admin, deleteSong);

module.exports = router;