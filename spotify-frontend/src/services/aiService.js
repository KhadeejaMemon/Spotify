import API from "./api";

export const getRecommendations = async () => {
  const res = await API.get("/ai/recommend");
  return res.data;
};