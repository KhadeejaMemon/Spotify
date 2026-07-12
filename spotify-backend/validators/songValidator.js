const validateSong = (req, res, next) => {
  const { title, artist, album } = req.body;

  if (!title || !artist) {
    return res.status(400).json({
      success: false,
      message: "Title and artist are required",
    });
  }

  next();
};

module.exports = validateSong;