import API from "./api";

export const getSongs = () => API.get("/songs");

export const deleteSong = (id) => API.delete(`/songs/${id}`);

export const createSong = (data) => API.post("/songs", data);

export const updateSong = (id, data) =>
  API.put(`/songs/${id}`, data);


// Get Single Song
export const getSongById = (id) => {
  return API.get(`/songs/${id}`);
};

