import API from "./api";


export const searchSpotifySongs = async (query) => {
  try {

    const res = await API.get(
      `/spotify/search?q=${query}`
    );

    return res.data;

  } catch (error) {

    console.log(
      "Spotify Search Error:",
      error
    );

    throw error;

  }
};