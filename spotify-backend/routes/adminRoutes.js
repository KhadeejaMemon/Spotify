const express = require("express");
const router = express.Router();

const { getStats, getUsers,
  deleteUser } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");



router.get("/stats", protect, admin, getStats);

router.get("/users", protect, admin, getUsers);

router.delete("/users/:id", protect, admin, deleteUser);

module.exports = router;