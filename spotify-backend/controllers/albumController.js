

const User = require("../models/User");
const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Playlist = require("../models/Playlist");

// Dashboard Stats
const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const songs = await Song.countDocuments();
    const artists = await Artist.countDocuments();
    const albums = await Album.countDocuments();
    const playlists = await Playlist.countDocuments();

    res.json({
      success: true,
      stats: {
        users,
        songs,
        artists,
        albums,
        playlists,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const createAlbum = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const album = await Album.create({
      title: req.body.title,
      artist: req.body.artist,
      description: req.body.description,
      releaseDate: req.body.releaseDate,
      coverImage: req.file
        ? `/uploads/albums/${req.file.filename}`
        : "",
    });

    res.status(201).json({
      success: true,
      album,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Albums
const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find()
      .populate("artist")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: albums.length,
      albums,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Single Album
const getAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate("artist");

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found",
      });
    }

    const songs = await Song.find({ album: album._id }).populate("artist");

    res.status(200).json({
      success: true,
      album,
      songs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Album
const updateAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found",
      });
    }

    album.title = req.body.title || album.title;
    album.artist = req.body.artist || album.artist;
    album.description = req.body.description || album.description;
    album.releaseDate = req.body.releaseDate || album.releaseDate;

    if (req.file) {
      album.coverImage = `/uploads/albums/${req.file.filename}`;
    }

    await album.save();

    res.status(200).json({
      success: true,
      album,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Album
const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Album deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAlbum,
  getAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum,
    getStats,
  getUsers,
  deleteUser,
};