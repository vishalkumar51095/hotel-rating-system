// src/services/authService.js
import { api } from "./api"; // make sure api.js has axios base instance

// Named exports MUST match exactly
export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);

export const getLoggedInEmail = () => {
  return localStorage.getItem("email");
};
