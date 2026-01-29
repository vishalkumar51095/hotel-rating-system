import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode JWT payload
      const payload = JSON.parse(atob(token.split(".")[1]));
      // Assuming roles is an array in JWT, e.g., ["USER"] or ["ADMIN"]
      
      setUser({ 
        email: payload.sub, 
        name: payload.sub.split("@")[0],
        roles: payload.roles || ["USER"]
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    Swal.fire("Logged out", "You have been logged out successfully", "success");
    navigate("/");
  };

  const isAdmin = user?.roles.includes("ADMIN");

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="font-bold text-xl">Hotel Rating App</h1>

      <div className="space-x-4 flex items-center">
        {!user && (
          <>
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/hotels" className="hover:underline">Hotels</Link>
            <Link to="/ratings" className="hover:underline">Ratings</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link> {/* <-- Add this */}
          </>
        )}

        {user && (
          <>
            <Link to="/" className="hover:underline">Home</Link>
            {isAdmin && <Link to="/users" className="hover:underline">Users</Link>}
            <Link to="/hotels" className="hover:underline">Hotels</Link>
            <Link to="/ratings" className="hover:underline">Ratings</Link>

            <span className="flex items-center space-x-2 ml-4">
              <svg
                className="w-6 h-6 rounded-full bg-white text-blue-600 p-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.2c-3.2 0-9.6 1.6-9.6 4.9V22h19.2v-2.9c0-3.3-6.4-4.9-9.6-4.9z"/>
              </svg>
              <span>{user.name}</span>
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-2 py-1 rounded hover:bg-red-700 ml-2"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
