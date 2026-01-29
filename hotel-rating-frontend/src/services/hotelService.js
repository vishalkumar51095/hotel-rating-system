import { api } from "./api";

export const getAllHotels = () => api.get("/hotels/");
export const getHotelById = (id) => api.get(`/hotels/${id}`);
export const createHotel = (hotel) => api.post("/hotels/", hotel);
