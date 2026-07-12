const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
 addHistory,
 getHistory
} = require("../controllers/historyController");



router.post(
 "/:songId",
 protect,
 addHistory
);



router.get(
 "/",
 protect,
 getHistory
);



module.exports = router;