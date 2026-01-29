import { api } from "./api";

export const getAllRatings = () => api.get("/ratings/");
export const getRatingByUserId = (userId) => api.get(`/ratings/users/${userId}`);
export const getRatingByHotelId = (hotelId) => api.get(`/ratings/hotels/${hotelId}`);
export const createRating = (rating) => api.post("/ratings/", rating);
export const updateRating = (id, rating) => api.put(`/ratings/${id}`, rating);
export const deleteRating = (id) => api.delete(`/ratings/${id}`);
