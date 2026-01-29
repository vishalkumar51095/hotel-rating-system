import { useEffect, useState } from "react";
import { getAllHotels } from "../services/hotelService";
import { getRatingByUserId, createRating } from "../services/ratingService";
import { getLoggedInEmail } from "../services/authService";
import { getUserByEmail } from "../services/userService" ;

import Swal from "sweetalert2";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [user, setUser] = useState(null);
  const [userRatings, setUserRatings] = useState([]);
  const [newRating, setNewRating] = useState({});

  
  /* ---------------- LOAD USER ---------------- */
  const loadUser = async () => {
    try {
      const email = getLoggedInEmail();

      if (!email) return;

      const res = await getUserByEmail(email);
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user", err);
    }
  };

  /* ---------------- LOAD HOTELS ---------------- */
  const loadHotels = async () => {
    try {
      const res = await getAllHotels();
      setHotels(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- LOAD USER RATINGS ---------------- */
  const loadUserRatings = async (userId) => {
    try {
      const res = await getRatingByUserId(userId);
      setUserRatings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    loadUser();
    loadHotels();
  }, []);

  /* ---------------- LOAD RATINGS AFTER USER ---------------- */
  useEffect(() => {
    if (user?.id) {
      loadUserRatings(user.id);
    }
  }, [user]);

  /* ---------------- CHECK IF USER RATED HOTEL ---------------- */
  const userRatedHotel = (hotelId) =>
    userRatings.some((r) => r.hotelId === hotelId);

  /* ---------------- SUBMIT RATING ---------------- */
  const submitRating = async (hotelId) => {
    if (!user) return;

    const ratingValue = Number(newRating[hotelId]?.rating);
    const feedback = newRating[hotelId]?.feedback || "";

    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Rating",
        text: "Rating must be between 1 and 5",
      });
      return;
    }

    const ratingData = {
      userId: user.id,
      hotelId,
      rating: ratingValue,
      feedback,
    };

    try {
      await createRating(ratingData);

      Swal.fire({
        icon: "success",
        title: "Rating Submitted",
        timer: 1500,
        showConfirmButton: false,
      });

      loadUserRatings(user.id);
      setNewRating({ ...newRating, [hotelId]: { rating: "", feedback: "" } });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to submit rating",
      });
    }
  };

  /* ======================= UI ======================= */

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* ---------------- USER RATINGS ---------------- */}
      {userRatings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Hotels You Have Rated
          </h2>

          {userRatings.map((r) => (
            <div
              key={r.ratingId}
              className="border p-4 mb-3 rounded bg-gray-50"
            >
              <p><strong>Hotel:</strong> {r.hotelName || r.hotelId}</p>
              <p><strong>Rating:</strong> {r.rating}/5 ⭐</p>
              {r.feedback && <p><strong>Feedback:</strong> {r.feedback}</p>}
            </div>
          ))}
        </div>
      )}

      {/* ---------------- ALL HOTELS ---------------- */}
      <h2 className="text-2xl font-bold mb-4">All Hotels</h2>

      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="border p-4 mb-4 rounded flex justify-between"
        >
          {/* Hotel Info */}
          <div className="flex-1 pr-4">
            <h3 className="font-semibold text-lg">{hotel.name}</h3>
            <p className="text-gray-600">{hotel.location}</p>
            <p className="text-sm">{hotel.about}</p>
          </div>

          {/* USER RATING FORM */}
          {user?.role !== "ADMIN" && !userRatedHotel(hotel.id) && (
            <div className="w-64 border-l pl-4 space-y-2">
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rating (1-5)"
                value={newRating[hotel.id]?.rating || ""}
                onChange={(e) =>
                  setNewRating({
                    ...newRating,
                    [hotel.id]: {
                      ...newRating[hotel.id],
                      rating: e.target.value,
                    },
                  })
                }
                className="border p-1 rounded w-full"
              />

              <input
                type="text"
                placeholder="Feedback"
                value={newRating[hotel.id]?.feedback || ""}
                onChange={(e) =>
                  setNewRating({
                    ...newRating,
                    [hotel.id]: {
                      ...newRating[hotel.id],
                      feedback: e.target.value,
                    },
                  })
                }
                className="border p-1 rounded w-full"
              />

              <button
                onClick={() => submitRating(hotel.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded w-full hover:bg-yellow-600"
              >
                Submit Rating
              </button>
            </div>
          )}

          {/* ALREADY RATED */}
          {user?.role !== "ADMIN" && userRatedHotel(hotel.id) && (
            <div className="pl-4 text-green-600 font-semibold">
              ✔ Already Rated
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
