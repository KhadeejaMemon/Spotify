const User = require("../models/User");
const Song = require("../models/Song");
const History = require("../models/History");

const { recommendSongs } = require("../services/geminiService");

const normalize = (str) =>
  (str || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();

const getRecommendations = async (req, res) => {
  try {
    // Logged-in user (for liked songs)
    const user = await User.findById(req.user.id)
      .populate("likedSongs", "title");

    // Get user's actual play history from History collection
    const historyItems = await History.find({ user: req.user.id })
      .populate("song", "title")
      .sort({ createdAt: -1 })
      .limit(30);

    // Combine both DB song titles and external (iTunes) song titles
    const historyTitles = historyItems.map((item) =>
      item.isExternal ? item.externalSong?.title : item.song?.title
    ).filter(Boolean);

    // Liked titles
    const likedTitles = user.likedSongs.map((song) => song.title);

    // All songs from database
    const allSongs = await Song.find().populate("artist", "name");

    if (allSongs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No songs available.",
      });
    }

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

    // Match titles with database (tolerant matching)
    const recommendedSongs = allSongs.filter((song) =>
      recommendedTitles.some(
        (title) =>
          normalize(title) === normalize(song.title) ||
          normalize(song.title).includes(normalize(title)) ||
          normalize(title).includes(normalize(song.title))
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