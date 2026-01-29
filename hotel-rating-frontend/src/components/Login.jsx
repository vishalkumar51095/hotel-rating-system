import { useState } from "react";
import { loginUser } from "../services/authService";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      // Save token & email
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data?.message || "Login successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");

    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
