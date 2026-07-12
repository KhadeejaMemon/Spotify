const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");

const search = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const songs = await Song.find({
      title: { $regex: q, $options: "i" },
    })
      .populate("artist", "name image")
      .populate("album", "title image");

    const artists = await Artist.find({
      name: { $regex: q, $options: "i" },
    });

    const albums = await Album.find({
      title: { $regex: q, $options: "i" },
    }).populate("artists", "name image");

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