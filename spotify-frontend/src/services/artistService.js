import API from "./api";

export const getArtists = () => API.get("/artists");

export const getArtist = (id) => API.get(`/artists/${id}`);

export const createArtist = (data) => API.post("/artists", data);

export const updateArtist = (id, data) =>
  API.put(`/artists/${id}`, data);

export const deleteArtist = (id) => {
  return API.delete(`/artists/${id}`);
};