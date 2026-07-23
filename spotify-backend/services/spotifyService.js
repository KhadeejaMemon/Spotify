const axios = require("axios");

let accessToken = null;
let expiresAt = 0;

// Get Spotify Access Token
const getAccessToken = async () => {
  try {
    // Reuse token if still valid
    if (accessToken && Date.now() < expiresAt) {
      return accessToken;
    }

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),

          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = response.data.access_token;

    // expires_in is in seconds
    expiresAt = Date.now() + response.data.expires_in * 1000;

    return accessToken;
  } catch (error) {
  console.log("=========== SPOTIFY ERROR ===========");
  console.log(error.response?.status);
  console.log(error.response?.data);
  console.log(error.message);

  throw error;
}
};

// Search Songs
const searchSongs = async (query) => {
  const token = await getAccessToken();

  const response = await axios.get(
    "https://api.spotify.com/v1/search",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: {
        q: query,
        type: "track",
        limit: 20,
      },
    }
  );

  return response.data.tracks.items;
};

module.exports = {
  searchSongs,
};