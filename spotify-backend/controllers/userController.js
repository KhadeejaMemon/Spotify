const User = require("../models/User");
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");

// Like Song
const likeSong = async (req, res) => {
  try {
    const { songId } = req.params;

    // Check if song exists
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    // Get logged-in user
    const user = await User.findById(req.user._id);

    // Prevent duplicate likes
    if (user.likedSongs.includes(songId)) {
      return res.status(400).json({
        success: false,
        message: "Song already liked",
      });
    }

    user.likedSongs.push(songId);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Song added to liked songs",
      likedSongs: user.likedSongs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Unlike Song
const unlikeSong = async (req, res) => {
  try {
    const { songId } = req.params;

    const user = await User.findById(req.user._id);

    // Check if song is liked
    if (!user.likedSongs.includes(songId)) {
      return res.status(404).json({
        success: false,
        message: "Song is not in liked songs",
      });
    }

    user.likedSongs = user.likedSongs.filter(
      (id) => id.toString() !== songId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Song removed from liked songs",
      likedSongs: user.likedSongs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Liked Songs
const getLikedSongs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "likedSongs",
      populate: [
        {
          path: "artist",
        },
        {
          path: "album",
        },
      ],
    });

    res.status(200).json({
      success: true,
      count: user.likedSongs.length,
      likedSongs: user.likedSongs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};  



// Add Song To History
const addToHistory = async (req, res) => {
  try {
    const { songId } = req.params;

    // Check if song exists
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    const user = await User.findById(req.user._id);

    // Remove if already exists
    user.history = user.history.filter(
      (id) => id.toString() !== songId
    );

    // Add to beginning
    user.history.unshift(songId);

    // Keep only latest 50 songs
    if (user.history.length > 50) {
      user.history = user.history.slice(0, 50);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Song added to history",
      history: user.history,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get History
const getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "history",
      populate: [
        {
          path: "artist",
        },
        {
          path: "album",
        },
      ],
    });

    res.status(200).json({
      success: true,
      count: user.history.length,
      history: user.history,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const playlistsCount = await Playlist.countDocuments({
      user: userId,
    });

    const likedSongsCount = user.likedSongs?.length || 0;

    res.status(200).json({
      success: true,
      user,
      stats: {
        playlistsCount,
        likedSongsCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  likeSong,
  unlikeSong,
  getLikedSongs,
  addToHistory,
    getHistory,
    getProfile,
};