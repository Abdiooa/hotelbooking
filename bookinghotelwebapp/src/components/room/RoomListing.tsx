import { useState, useEffect } from "react";
import RoomPaginator from "./RoomPaginator";
import {
  deleteARoom,
  getAllRooms,
  filterByRoomType,
} from "../../apis/room/RoomApis";
import "./RoomListing.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

interface Room {
  id: number;
  roomType: string;
  price: number;
  isBooked: boolean;
  returnedPhoto: any;
  processedImg: string;
}

interface RoomListingProps {
  showManageActions: boolean;
  roomType?: string;
}

const RoomListing: React.FC<RoomListingProps> = ({
  showManageActions,
  roomType,
}) => {
  const [data, setData] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);
  const { authState, isLoggedIn } = useAuth();
  const { userRole } = authState;
  const isLogged = isLoggedIn();

  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        let response;
        if (roomType) {
          response = await filterByRoomType(roomType);
        } else {
          response = await getAllRooms();
        }
        const rooms = response.data.map((room: Room) => ({
          ...room,
          processedImg: "data:image/jpeg;base64," + room.returnedPhoto,
        }));
        setData(rooms);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roomType]);

  const handleDeleteRoom = (roomId: number) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      deleteARoom(roomId)
        .then(() => {
          setData(data.filter((room) => room.id !== roomId));
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const handleClearSearch = async () => {
    setIsLoading(true);
    try {
      const response = await getAllRooms();
      const rooms = response.data.map((room: Room) => ({
        ...room,
        processedImg: "data:image/jpeg;base64," + room.returnedPhoto,
      }));
      setData(rooms);
      setIsLoading(false);
      setCurrentPage(1);
      roomType = undefined;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(data.length / roomsPerPage);

  if (isLoading) {
    return <div className="text-center">Loading rooms...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container room-listing mt-5">
      <div className="d-flex justify-content-between align-items-center mb-2">
        {location.pathname !== "/" && (
          <h1 className="display-5">
            {showManageActions ? "Manage Rooms" : "Rooms"}
          </h1>
        )}
        {location.pathname === "/" && <Link to="/rooms">Browse all rooms</Link>}
        {showManageActions && isLogged && userRole === "ADMIN" && (
          <Link to="/add-room" className="btn btn-primary">
            Add Room
          </Link>
        )}
        {location.pathname === "/" && roomType && (
          <button onClick={handleClearSearch} className="btn btn-secondary">
            Clear Search
          </button>
        )}
      </div>
      <div className="row">
        {data
          .slice((currentPage - 1) * roomsPerPage, currentPage * roomsPerPage)
          .map((room) => (
            <div key={room.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={room.processedImg}
                  className="card-img-top"
                  alt={room.roomType}
                />
                <div className="card-body">
                  <h5 className="card-title">{room.roomType}</h5>
                  <p className="card-text">Price: ${room.price}</p>
                  {showManageActions && isLogged && userRole === "ADMIN" && (
                    <div className="actions d-flex justify-content-between">
                      <Link
                        to={`/edit-room/${room.id}`}
                        className="btn btn-secondary"
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteRoom(room.id)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  )}
                  {isLogged && userRole === "USER" && (
                    <Link
                      to={`/room/${room.id}/book-room`}
                      className="btn btn-success book-now-btn"
                    >
                      Book Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {location.pathname !== "/" && (
        <RoomPaginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default RoomListing;
