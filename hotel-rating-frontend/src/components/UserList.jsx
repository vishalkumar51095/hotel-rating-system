import { useEffect, useState } from "react";
import { getAllUsers, createUser } from "../services/userService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // <-- import SweetAlert2

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    about: "",
  });

  const loadUsers = () => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...newUser,
      ratings: [],
    };

    try {
      await createUser(payload);
      loadUsers();        // refresh list
      setShowForm(false); // hide form
      setNewUser({ name: "", email: "", about: "" });

      // 🎉 SweetAlert2 Success Popup
      Swal.fire({
        icon: "success",
        title: "User Added!",
        text: `${payload.name} has been added successfully!`,
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create user!",
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "+ Add New User"}
        </button>
      </div>

      {/* CREATE USER FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="border p-4 rounded mb-6 bg-gray-50 space-y-3"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={newUser.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <textarea
            name="about"
            placeholder="About user"
            value={newUser.about}
            onChange={handleChange}
            rows="3"
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create User
          </button>
        </form>
      )}

      {/* USER LIST */}
      <ul className="space-y-3">
        {users.map((u) => (
          <li key={u.userId} className="border p-4 rounded">
            <Link
              to={`/users/${u.userId}`}
              className="text-blue-600 font-semibold text-lg"
            >
              {u.name}
            </Link>

            <p className="text-gray-600">{u.email}</p>
            <p className="text-sm">{u.about}</p>

            <p className="text-sm mt-1">
              Ratings: <strong>{u.ratings?.length || 0}</strong>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
