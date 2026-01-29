import { useEffect, useState } from "react";
import {
  getAllRatings,
  getRatingByUserId,
  getRatingByHotelId,
} from "../services/ratingService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function RatingList() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadRatings = async () => {
    try {
      const res = await getAllRatings();
      const ratingsData = res.data;

      const ratingsWithNames = await Promise.all(
        ratingsData.map(async (r) => {
          let userName = r.userId;
          let hotelName = r.hotelId;

          try {
            const userRes = await getRatingByUserId(r.userId);
            if (userRes?.data?.name) userName = userRes.data.name;
          } catch {}

          try {
            const hotelRes = await getRatingByHotelId(r.hotelId);
            if (hotelRes?.data?.name) hotelName = hotelRes.data.name;
          } catch {}

          return { ...r, userName, hotelName };
        })
      );

      setRatings(ratingsWithNames);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to load ratings.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      Swal.fire({
        icon: "info",
        title: "Login Required 🔐",
        html: `
          <p>You must be logged in to view hotel ratings.</p>
          <p style="margin-top:6px;color:#555">
            Please login to continue.
          </p>
        `,
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#2563eb",
        allowOutsideClick: false,
      }).then(() => {
        navigate("/login");
      });

      return;
    }

    loadRatings();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading ratings...</p>;
  }

  if (!ratings || ratings.length === 0) {
    return <p className="p-6 text-gray-500">No ratings found.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Hotel Ratings</h2>

      {ratings.map((r) => (
        <div
          key={r.ratingId}
          className="border p-4 mb-4 rounded bg-white shadow hover:shadow-md transition"
        >
          <p>
            <strong>User:</strong> {r.userName}
          </p>
          <p>
            <strong>Hotel:</strong> {r.hotelName}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {r.rating}/5
          </p>
          {r.feedback && (
            <p>
              <strong>Feedback:</strong> {r.feedback}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
