import API from "./api";

export const getStats = () =>
  API.get("/admin/stats");

export const getUsers = () =>
  API.get("/admin/users");

export const deleteUser = (id) =>
  API.delete(`/admin/users/${id}`);