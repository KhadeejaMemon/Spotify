// const express = require("express");

// const router = express.Router();

// const {
//   searchSpotifySongs,
// } = require("../controllers/spotifyController");

// // Search Spotify Songs
// router.get("/search", searchSpotifySongs);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { searchSpotifySongs } = require("../controllers/spotifyController");

router.get("/search", searchSpotifySongs);

module.exports = router;