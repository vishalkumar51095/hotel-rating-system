import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/userService";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(id).then(res => setUser(res.data));
  }, [id]);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.about}</p>
      <h3 className="text-xl mt-4">Ratings</h3>
      {user.ratings.length === 0 && <p>No ratings yet</p>}
      <ul>
        {user.ratings.map(r => (
          <li key={r.ratingId} className="border p-2 mb-2 rounded">
            <strong>{r.hotel.name}</strong> - {r.rating} ⭐
            <p>{r.feedback}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
