const express = require("express");

const router = express.Router();

const { getRecommendations } = require("../controllers/aiController");

const { protect } = require("../middleware/authMiddleware");

// AI Song Recommendations
router.get("/recommend", protect, getRecommendations);

module.exports = router;