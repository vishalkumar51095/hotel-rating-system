import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ email: payload.sub, name: payload.sub.split("@")[0] });
    }
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      {user ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
          <p className="text-gray-700">
            You are now logged in to the <strong>Hotel Rating Application</strong>. Explore users, hotels, and ratings to manage and review your favorite hotels.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">Welcome to Hotel Rating Application</h1>
          <p className="text-gray-700">
            Please login or register to access users, hotels, and ratings features.
          </p>
        </>
      )}
    </div>
  );
}
