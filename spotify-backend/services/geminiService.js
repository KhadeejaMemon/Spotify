const { GoogleGenAI } = require("@google/genai");

let ai;

const getClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return ai;
};
const MODEL = "gemini-flash-latest";   // 👈 sirf ye line change hui hai

const recommendSongs = async (
  history = [],
  liked = [],
  availableSongs = []
) => {
  try {

    const availableList = availableSongs
      .map(song => `${song.title} - ${song.artist?.name || "Unknown Artist"}`)
      .join("\n");

    const prompt = `
You are an expert music recommendation AI.

You MUST recommend songs ONLY from the Available Songs list.

========================

Available Songs:

${availableList}

========================

Recently Played:

${history.length ? history.join(", ") : "None"}

========================

Liked Songs:

${liked.length ? liked.join(", ") : "None"}

========================

Rules:

1. Recommend EXACTLY 10 songs.
2. Recommend ONLY songs from Available Songs.
3. Never invent song names.
4. Never invent artists.
5. Return ONLY JSON.

Example:

[
"Perfect",
"Enemy",
"Photograph",
"Believer"
]
`;

    const response = await getClient().models.generateContent({

      model: MODEL,

      contents: prompt,

      config: {
        responseMimeType: "application/json",
      },

    });

    return JSON.parse(response.text);

  } catch (error) {
  console.log("========== GEMINI ERROR ==========");
  console.log(error.response?.data || error.message || error);

  throw error;
}
};
module.exports = {
  recommendSongs,
};