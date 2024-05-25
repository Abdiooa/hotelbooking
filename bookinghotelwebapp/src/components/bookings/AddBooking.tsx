import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddBooking.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getARoom } from "../../apis/room/RoomApis";
import { useAuth } from "../auth/AuthProvider";
import { BookingFormData } from "../../apis/common/Types";
import { bookRoom } from "../../apis/booking/BookingsApis";

interface RoomDonnees {
  roomType: string;
  price: number | "";
}

const AddBooking: React.FC = () => {
  const { authState } = useAuth();
  const { userId } = authState;
  const userIdValue = userId ?? "";
  const { roomId } = useParams();
  const roomIdValue = roomId ?? "";
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState<RoomDonnees>({
    roomType: "",
    price: "",
  });
  const [formData, setFormData] = useState<BookingFormData>({
    checkInDate: new Date(),
    checkOutDate: new Date(),
    userId: parseInt(userIdValue),
  });

  const handleDateChange = (date: Date, type: "checkIn" | "checkOut") => {
    setFormData({ ...formData, [`${type}Date`]: date });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    bookRoom(parseInt(roomIdValue), formData)
      .then((response) => {
        if (response.status === 201) {
          navigate("/my-bookings");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getARoom(parseInt(roomIdValue))
      .then((response) => {
        const room = response.data;
        setRoomData(room);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [roomId]);

  return (
    <div className="container add-booking-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h2>Book a Room</h2>
            <div className="form-group mb-3">
              <label>Room Type:</label>
              <select
                className="form-select"
                name="roomType"
                value={roomData.roomType}
                disabled
              >
                <option value="">Select Room Type</option>
                <option value="Single bed Room">Single bed Room</option>
                <option value="Double bed Room">Double bed Room</option>
                <option value="New Triple Suite">New Triple Suite</option>
                <option value="Double bed room with balcony">
                  Double bed room with balcony
                </option>
                <option value="Single Room">Single Room</option>
                <option value="Vip Double Suite">Vip Double Suite</option>
                <option value="Vip Triple Suite">Vip Triple Suite</option>
                <option value="Family Room">Family Room</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label>Check-in Date:</label>
              <input
                type="date"
                className="form-control"
                name="checkInDate"
                value={formData.checkInDate.toISOString().split("T")[0]}
                onChange={(event) =>
                  handleDateChange(new Date(event.target.value), "checkIn")
                }
              />
            </div>
            <div className="form-group mb-3">
              <label>Check-out Date:</label>
              <input
                type="date"
                className="form-control"
                name="checkOutDate"
                value={formData.checkOutDate.toISOString().split("T")[0]}
                onChange={(event) =>
                  handleDateChange(new Date(event.target.value), "checkOut")
                }
              />
            </div>
            <div className="form-group mb-3">
              <label>Room Price:</label>
              <input
                type="number"
                className="form-control"
                name="roomPrice"
                value={roomData.price?.toString() ?? ""}
                disabled
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Book Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBooking;
