const { searchSongs } = require("../services/spotifyService");

const searchSpotifySongs = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }

    const tracks = await searchSongs(q);

    // Convert Spotify data into your app format
    const songs = tracks.map((track) => ({
      _id: track.id,
      title: track.name,

      artist: {
        name: track.artists.map((artist) => artist.name).join(", "),
      },

      album: {
        title: track.album.name,
      },

      thumbnail: track.album.images?.[0]?.url || "",

      previewUrl: track.preview_url,

      spotifyUrl: track.external_urls.spotify,

      duration: Math.floor(track.duration_ms / 1000),
    }));

    res.json({
      success: true,
      count: songs.length,
      songs,
    });

  } catch (error) {

  console.log("========== SPOTIFY SEARCH ERROR ==========");

  console.log(error.response?.status);

  console.log(error.response?.data);

  console.log(error.message);

  res.status(500).json({
    success:false,
    message:error.message
  });

}
};

module.exports = {
  searchSpotifySongs,
};