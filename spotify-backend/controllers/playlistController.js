const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
// Create Playlist
const createPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.create({
      name: req.body.name,
      description: req.body.description,
      coverImage: req.body.coverImage || "",
      isPublic: req.body.isPublic,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      playlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Playlists
const getPlaylists = async (req, res) => {
  try {
   const playlists = await Playlist.find({
  owner: req.user._id,
})
.populate("owner", "name email")
 .populate("songs", "title thumbnail")
.sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: playlists.length,
      playlists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Playlist
const getPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate("owner", "name email")
      .populate({
        path: "songs",
        populate: [
          { path: "artist" },
          { path: "album" },
        ],
      });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    res.status(200).json({
      success: true,
      playlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Playlist
const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // Only owner can update
    if (playlist.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    playlist.name = req.body.name || playlist.name;
    playlist.description =
      req.body.description || playlist.description;

    playlist.coverImage =
      req.body.coverImage || playlist.coverImage;

    if (req.body.isPublic !== undefined) {
      playlist.isPublic = req.body.isPublic;
    }

    await playlist.save();

    res.status(200).json({
      success: true,
      playlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Playlist
const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // Only owner can delete
    if (playlist.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await playlist.deleteOne();

    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Add Song To Playlist
// Add Song To Playlist
const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    // Only owner can modify playlist
    if (playlist.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Prevent duplicate songs
   const alreadyExists = playlist.songs.some(
  (id) => id.toString() === songId
);

if (alreadyExists) {
  return res.status(400).json({
    success: false,
    message: "Song already exists in playlist",
  });
}

    playlist.songs.push(songId);

    await playlist.save();

    res.status(200).json({
      success: true,
      message: "Song added to playlist successfully",
      playlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Song From Playlist
// Remove Song From Playlist
const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // Only owner can modify
    if (playlist.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Check song exists in playlist
    if (!playlist.songs.includes(songId)) {
      return res.status(404).json({
        success: false,
        message: "Song not found in playlist",
      });
    }

    playlist.songs = playlist.songs.filter(
      (id) => id.toString() !== songId
    );

    await playlist.save();

    res.status(200).json({
      success: true,
      message: "Song removed successfully",
      playlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createPlaylist,
  getPlaylists,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
};