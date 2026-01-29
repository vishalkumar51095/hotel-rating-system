import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import HotelList from "./components/HotelList";
import HotelDetail from "./components/HotelDetail";
import CreateUser from "./components/CreateUser";
import RatingList from "./components/RatingList";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen"> {/* full height flex container */}
        <NavBar />
        <main className="flex-1"> {/* flex-1 makes main content grow */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users/new" element={<CreateUser />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/ratings" element={<RatingList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
