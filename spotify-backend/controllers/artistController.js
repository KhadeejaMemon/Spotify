const Artist = require("../models/Artist");
const Song = require("../models/Song");
const Album = require("../models/Album");
// Create Artist
const createArtist = async (req, res) => {
  try {

    const artist = await Artist.create({

      name: req.body.name,
      bio: req.body.bio,
      country: req.body.country,
      verified: req.body.verified,

      image: req.file
        ? `/uploads/artists/${req.file.filename}`
        : "",

    });

    res.status(201).json({
      success: true,
      artist,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Artists
const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: artists.length,
      artists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Artist
// Get Single Artist
const getArtist = async (req, res) => {
  try {

    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success:false,
        message:"Artist not found"
      });
    }


    const songs = await Song.find({
      artist: artist._id
    })
    .populate("album")
    .sort({
      createdAt:-1
    });


    const albums = await Album.find({
      artist: artist._id
    })
    .sort({
      createdAt:-1
    });


    res.status(200).json({

      success:true,

      artist,

      songs,

      albums

    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

// Update Artist
const updateArtist = async (req, res) => {
  try {

    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    artist.name = req.body.name || artist.name;
    artist.bio = req.body.bio || artist.bio;
    artist.country = req.body.country || artist.country;
    artist.verified = req.body.verified ?? artist.verified;

    if (req.file) {
      artist.image = `/uploads/artists/${req.file.filename}`;
    }

    await artist.save();

    res.status(200).json({
      success: true,
      artist,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Delete Artist
const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Artist deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createArtist,
  getArtists,
  getArtist,
  updateArtist,
  deleteArtist,
};