import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { getAllBooking, updateBooking } from "../../apis/booking/BookingsApis";
import "./Bookings.scss";
import { useAuth } from "../auth/AuthProvider";
import { Booking, UpdateBookingData } from "../../apis/common/Types";

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authState } = useAuth();
  const { userRole } = authState;

  useEffect(() => {
    setIsLoading(true);
    getAllBooking()
      .then((response) => {
        setBookings(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message || "An error occurred");
      });
  }, []);

  const handleConfirmReject = (bookingId: number, status: string) => {
    const updateData: UpdateBookingData = {
      status: status,
    };

    updateBooking(bookingId, updateData)
      .then((response) => {
        if (response.status === 204) {
          setIsLoading(true);
          getAllBooking()
            .then((response) => {
              setBookings(response.data);
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
              setError(error.message || "An error occurred");
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container py-5 bookings-container">
      {userRole === "ADMIN" && (
        <div className="row gy-4">
          {bookings.map((booking, index) => (
            <div key={index} className="col-12 col-md-6">
              <div className="booking-card p-3">
                <div className="booking-details">
                  <div className="row mb-2">
                    <div className="col-6 detail-item">
                      Room Type: <span>{booking.roomType}</span>
                    </div>
                    <div className="col-6 detail-item">
                      Check-In Date: <span>{booking.checkInDate}</span>
                    </div>
                    <div className="col-6 detail-item">
                      Check-Out Date: <span>{booking.checkOutDate}</span>
                    </div>
                    <div className="col-6 detail-item">
                      Status: <span>{booking.status}</span>
                    </div>
                    <div className="col-6 detail-item">
                      Number of Days: <span>{booking.numberOfDays}</span>
                    </div>
                    <div className="col-6 detail-item">
                      Room Price: <span>{booking.roomPrice}</span>
                    </div>
                    <div className="col-6 detail-item">
                      Total Price: <span>{booking.totalPrice}</span>
                    </div>
                  </div>
                </div>
                {booking.status === "PENDING" && (
                  <div className="booking-actions text-end">
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() =>
                        handleConfirmReject(booking.bookingId, "CONFIRM")
                      }
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleConfirmReject(booking.bookingId, "REJECT")
                      }
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
