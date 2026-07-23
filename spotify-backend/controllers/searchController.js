const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");

// Escape special regex characters so search never crashes
const escapeRegex = (text) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const search = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const safeQuery = escapeRegex(q);

    const songs = await Song.find({
      title: { $regex: safeQuery, $options: "i" },
    })
      .populate("artist", "name image")
      .populate("album", "title image");

    const artists = await Artist.find({
      name: { $regex: safeQuery, $options: "i" },
    });

    const albums = await Album.find({
      title: { $regex: safeQuery, $options: "i" },
    }).populate("artist", "name image");

    res.status(200).json({
      success: true,
      songs,
      artists,
      albums,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  search,
};