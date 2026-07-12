const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { uploadAlbum } = require("../middleware/uploadMiddleware");

const {
  createAlbum,
  getAlbums,
  getAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albumController");

router.get("/", getAlbums);
router.get("/:id", getAlbum);

router.post(
  "/",
  protect,
  admin,
  uploadAlbum.single("coverImage"),
  createAlbum
);

router.put(
  "/:id",
  protect,
  admin,
  uploadAlbum.single("coverImage"),
  updateAlbum
);

router.delete("/:id", protect, admin, deleteAlbum);

module.exports = router;