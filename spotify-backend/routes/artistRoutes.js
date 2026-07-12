const express = require("express");
const router = express.Router();

const {
  createArtist,
  getArtists,
  getArtist,
  updateArtist,
  deleteArtist,
} = require("../controllers/artistController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { uploadArtist } = require("../middleware/uploadMiddleware");

// Public Routes
router.get("/", getArtists);
router.get("/:id", getArtist);

// Admin Routes
router.post(
  "/",
  protect,
  admin,
  uploadArtist.single("image"),
  createArtist
);

router.put(
  "/:id",
  protect,
  admin,
  uploadArtist.single("image"),
  updateArtist
);

router.delete("/:id", protect, admin, deleteArtist);

module.exports = router;