import { api } from "./api";

export const getAllUsers = () => api.get("/users/");
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (user) => api.post("/users/", user);

export const getUserByEmail = (email) => {
  return api.get(`/users/email/${email}`);
};