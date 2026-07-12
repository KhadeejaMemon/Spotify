import API from "./api";


// Get all users
export const getUsers = () => {
  return API.get("/admin/users");
};


// Delete user
export const deleteUser = (id) => {
  return API.delete(`/admin/users/${id}`);
};