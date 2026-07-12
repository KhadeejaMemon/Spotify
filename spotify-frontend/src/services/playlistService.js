import API from "./api";

export const getPlaylists = async () => {
  const res = await API.get("/playlists");
  return res.data;
};

export const getPlaylist = async (id) => {
  const res = await API.get(`/playlists/${id}`);
  return res.data;
};

export const createPlaylist = async (data) => {
  const res = await API.post("/playlists", data);
  return res.data;
};

export const updatePlaylist = async (id, data) => {
  const res = await API.put(`/playlists/${id}`, data);
  return res.data;
};

export const deletePlaylist = async (id) => {
  const res = await API.delete(`/playlists/${id}`);
  return res.data;
};

export const addSongToPlaylist = async (playlistId, songId) => {
  const res = await API.post(
    `/playlists/${playlistId}/songs/${songId}`
  );
  return res.data;
};

export const removeSongFromPlaylist = async (
  playlistId,
  songId
) => {
  const res = await API.delete(
    `/playlists/${playlistId}/songs/${songId}`
  );
  return res.data;
};