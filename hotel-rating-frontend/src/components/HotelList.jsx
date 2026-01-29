import { useEffect, useState } from "react";
import { getAllHotels } from "../services/hotelService";
import { getRatingByUserId, createRating } from "../services/ratingService";
import Swal from "sweetalert2";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [user, setUser] = useState(null);
  const [userRatings, setUserRatings] = useState([]);
  const [newRating, setNewRating] = useState({});

  // Load current user from localStorage
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setUser({
        email,
        name: email.split("@")[0], // derive name from email
        role: "USER", // or fetch from backend if you have role field
      });
    }
  }, []);

  // Load hotels
  const loadHotels = async () => {
    try {
      const res = await getAllHotels();
      setHotels(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Load ratings by user
  const loadUserRatings = async (userId) => {
    try {
      const res = await getRatingByUserId(userId);
      setUserRatings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadHotels();
    if (user?.email) {
      // Here you can fetch user id from backend if needed, else skip
      // For now assuming user id is not required to fetch ratings
      // Or map email to id if your API supports
    }
  }, [user]);

  // Submit rating
  const submitRating = async (hotelId) => {
    const ratingValue = Number(newRating[hotelId]?.rating);
    const feedback = newRating[hotelId]?.feedback || "";

    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      Swal.fire("Invalid Rating", "Rating must be 1-5", "warning");
      return;
    }

    try {
      // If you have userId from backend, use that instead
      await createRating({
        userId: user?.email, // replace with user id if backend requires
        hotelId,
        rating: ratingValue,
        feedback,
      });

      Swal.fire("Success", "Rating submitted!", "success");
      setNewRating({ ...newRating, [hotelId]: { rating: "", feedback: "" } });
    } catch (err) {
      Swal.fire("Error", "Failed to submit rating", "error");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Hotels</h2>

      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="border p-4 mb-4 rounded shadow-sm bg-white flex justify-between"
        >
          {/* Hotel info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{hotel.name}</h3>
            <p className="text-gray-600">{hotel.location}</p>
            <p className="text-sm mt-1">{hotel.about}</p>
          </div>

          {/* Rating form for users */}
          {user && user.role !== "ADMIN" && (
            <div className="w-64 pl-4 border-l space-y-2">
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
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 w-full"
              >
                Submit Rating
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
