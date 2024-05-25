import { useEffect, useState } from "react";
import { Booking } from "../../apis/common/Types";
import { useAuth } from "./AuthProvider";
import { getUserById } from "../../apis/auth/AuthApis";
import { getUserBookings } from "../../apis/booking/BookingsApis";
import "./Profile.scss";
interface ProfileProps {
  showUserProfile: boolean;
}

const Profile: React.FC<ProfileProps> = ({ showUserProfile }) => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { authState } = useAuth();
  const { userId, userRole } = authState;

  useEffect(() => {
    setIsLoading(true);
    const id = userId ?? "";
    getUserById(parseInt(id))
      .then((response) => {
        setProfile(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });

    getUserBookings(parseInt(id))
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, [userId]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container py-5 profile">
      {showUserProfile && (
        <div className="row mb-4">
          <div className="col-md-4 text-center">
            <img
              src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
              alt="Profile"
              className="img-fluid rounded-circle profile-image"
            />
          </div>
          <div className="col-md-8">
            <h1>
              {profile.firstName} {profile.lastName}
            </h1>
            <p>Email: {profile.email}</p>
            <p>Role: {profile.role}</p>
          </div>
        </div>
      )}
      {userRole === "USER" && (
        <>
          <h2>Booking History</h2>
          <div className="booking-history">
            {bookings.map((booking, index) => (
              <div key={index} className="booking-item">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img
                      src={"data:image/jpeg;base64," + booking.returnedPhoto}
                      alt={booking.roomType}
                      className="booking-room-image"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-2">
                        <p>Room Type:</p>
                        <p>{booking.roomType}</p>
                      </div>
                      <div className="col-md-2">
                        <p>Check-in:</p>
                        <p>
                          {new Date(booking.checkInDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="col-md-2">
                        <p>Check-out:</p>
                        <p>
                          {new Date(booking.checkOutDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="col-md-2">
                        <p>Number of days:</p>
                        <p>{booking.numberOfDays ?? "N/A"}</p>
                      </div>
                      <div className="col-md-2">
                        <p>Room price:</p>
                        <p>
                          ${booking.roomPrice?.toFixed(2) ?? "N/A"} per night
                        </p>
                      </div>
                      <div className="col-md-2">
                        <p>Total price:</p>
                        <p>${booking.totalPrice.toFixed(2)}</p>
                      </div>
                      <div className="col-md-2">
                        <p>Status:</p>
                        <p
                          className={`booking-status ${booking.status.toLowerCase()}`}
                        >
                          {booking.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
