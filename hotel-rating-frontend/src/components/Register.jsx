import { useState } from "react";
import { registerUser } from "../services/authService";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data?.message || "User registered successfully!",
      });

      navigate("/login");

    } catch (err) {
  console.error(err);

  const data = err.response?.data;

  const message =
    data?.message ||
    (typeof data?.email === "string" ? data.email : null) ||
    "Registration failed. Please try again.";

  const isEmailExists =
    message.toLowerCase().includes("already exists");

  Swal.fire({
    icon: isEmailExists ? "warning" : "error",
    title: isEmailExists ? "Email Already Registered" : "Registration Failed",
    html: `
      <div style="text-align:left;font-size:15px">
        <p>${message}</p>
        ${
          isEmailExists
            ? `<p style="margin-top:8px;color:#555">
                👉 Try logging in or use another email.
              </p>`
            : ""
        }
      </div>
    `,
    showCancelButton: isEmailExists,
    confirmButtonText: isEmailExists ? "Go to Login" : "OK",
    cancelButtonText: "Try Again",
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#6b7280",
    allowOutsideClick: false,
    showClass: {
      popup: "animate__animated animate__fadeInDown"
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp"
    }
  }).then((result) => {
    if (result.isConfirmed && isEmailExists) {
      navigate("/login");
    }
  });
}

  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

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

        <textarea
          name="about"
          placeholder="About yourself"
          value={form.about}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
