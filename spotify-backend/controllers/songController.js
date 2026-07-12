const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");

// Create Song
// Create Song
const createSong = async (req, res) => {
  try {
    const { title, artist, album, genre, duration } = req.body;

    // Check Artist
    const artistExists = await Artist.findById(artist);

    if (!artistExists) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    // Check Album (optional)
    if (album) {
      const albumExists = await Album.findById(album);

      if (!albumExists) {
        return res.status(404).json({
          success: false,
          message: "Album not found",
        });
      }
    }

    // Files
    const thumbnail = req.files?.thumbnail
      ? `/uploads/songs/${req.files.thumbnail[0].filename}`
      : "";

    const audio = req.files?.audio
      ? `/uploads/audio/${req.files.audio[0].filename}`
      : "";

    if (!audio) {
      return res.status(400).json({
        success: false,
        message: "Audio file is required",
      });
    }

    const song = await Song.create({
      title,
      artist,
      album: album || null,
      genre,
      duration,
      thumbnail,
      audio,
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Songs
// Get All Songs
const getSongs = async (req, res) => {
  try {
    let { sort } = req.query;

    let sortOption = {};

    if (sort === "latest") {
      sortOption = { createdAt: -1 };
    } else if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else {
      sortOption = { createdAt: -1 };
    }

    const songs = await Song.find()
      .populate("artist", "name image")
      .populate("album", "title image")
      .sort(sortOption);

    const total = await Song.countDocuments();

    res.status(200).json({
      success: true,
      totalSongs: total,
      songs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Song
const getSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate("artist")
      .populate("album")
      .populate("uploadedBy", "name email");

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    res.status(200).json({
      success: true,
      song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Song
const updateSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    song.title = req.body.title || song.title;
    song.artist = req.body.artist || song.artist;
    song.album = req.body.album || song.album;
    song.genre = req.body.genre || song.genre;
    song.duration = req.body.duration || song.duration;

    if (req.files?.thumbnail) {
      song.thumbnail = `/uploads/songs/${req.files.thumbnail[0].filename}`;
    }

    if (req.files?.audio) {
      song.audio = `/uploads/audio/${req.files.audio[0].filename}`;
    }

    await song.save();

    await song.populate("artist", "name image");
    await song.populate("album", "title coverImage");

    res.status(200).json({
      success: true,
      message: "Song updated successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Song
const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Song deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSong,
  getSongs,
  getSong,
  updateSong,
  deleteSong,
};