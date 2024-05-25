import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";

// import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import { AuthProvider } from "./components/auth/AuthProvider";
import AddRoom from "./components/room/AddRoom";
import RoomListing from "./components/room/RoomListing";
import EditRoom from "./components/room/EditRoom";
import "./App.scss";
import Profile from "./components/auth/Profile";
import AddBooking from "./components/bookings/AddBooking";
import Bookings from "./components/bookings/Bookings";
function App() {
  return (
    <>
      <AuthProvider>
        <main>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add-room" element={<AddRoom />} />
              <Route
                path="/rooms"
                element={
                  <RoomListing showManageActions={false} roomType={undefined} />
                }
              />
              <Route
                path="/manage-rooms"
                element={
                  <RoomListing showManageActions={true} roomType={undefined} />
                }
              />
              <Route path="/edit-room/:roomId" element={<EditRoom />} />
              <Route
                path="/profile"
                element={<Profile showUserProfile={true} />}
              />
              <Route path="/room/:roomId/book-room" element={<AddBooking />} />
              <Route
                path="/my-bookings"
                element={<Profile showUserProfile={false} />}
              />
              <Route path="/bookings" element={<Bookings />} />
            </Routes>
            <Footer />
          </Router>
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
