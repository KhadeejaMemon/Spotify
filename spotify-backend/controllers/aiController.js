const User = require("../models/User");
const Song = require("../models/Song");

const { recommendSongs } = require("../services/geminiService");

const getRecommendations = async (req, res) => {
  try {
    // Logged-in user
    const user = await User.findById(req.user.id)
      .populate("history", "title")
      .populate("likedSongs", "title");

    // All songs from database
    const allSongs = await Song.find().populate("artist", "name");

    if (allSongs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No songs available.",
      });
    }

    // History titles
    const historyTitles = user.history.map((song) => song.title);

    // Liked titles
    const likedTitles = user.likedSongs.map((song) => song.title);

    // Available songs
    const availableSongs = allSongs.map((song) => ({
      title: song.title,
      artist: song.artist,
    }));

    // Gemini recommendation
    const recommendedTitles = await recommendSongs(
      historyTitles,
      likedTitles,
      availableSongs
    );

    // Match titles with database
    const recommendedSongs = allSongs.filter((song) =>
      recommendedTitles.some(
        (title) =>
          title.toLowerCase().trim() ===
          song.title.toLowerCase().trim()
      )
    );

    res.json({
      success: true,
      songs: recommendedSongs,
    });
  } catch (error) {
  console.log("========== AI ERROR ==========");
  console.log(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

module.exports = {
  getRecommendations,
};