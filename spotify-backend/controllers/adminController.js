const User = require("../models/User");
const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Playlist = require("../models/Playlist");

const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const songs = await Song.countDocuments();
    const artists = await Artist.countDocuments();
    const albums = await Album.countDocuments();
    const playlists = await Playlist.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        users,
        songs,
        artists,
        albums,
        playlists,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStats,
  getUsers,
  deleteUser,
};