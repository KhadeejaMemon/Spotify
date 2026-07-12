import API from "./api";

export const getAlbums = async () => {
  const res = await API.get("/albums");
  return res.data;
};

export const getAlbum = async (id) => {
  const res = await API.get(`/albums/${id}`);
  return res.data;
};


export const createAlbum = (data) =>
  API.post("/albums", data);

export const updateAlbum = (id, data) =>
  API.put(`/albums/${id}`, data);

export const deleteAlbum = (id) =>
  API.delete(`/albums/${id}`);