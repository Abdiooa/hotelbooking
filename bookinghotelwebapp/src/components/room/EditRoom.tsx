import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { getARoom, updateRoom } from "../../apis/room/RoomApis";
import { useNavigate } from "react-router-dom";
import "./EditRoom.scss";
import { Room, RoomUpdateDto } from "../../apis/common/Types";

const EditRoom = () => {
  const { roomId } = useParams();
  const roomIdValue = roomId ?? "";
  const [roomData, setRoomData] = useState<Room>({
    id: parseInt(roomIdValue),
    roomType: "",
    price: null,
    roomPhoto: null,
    isBooked: null,
    returnedPhoto: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getARoom(parseInt(roomIdValue)).then((response) => {
      const room = response.data;
      setRoomData(room);

      if (room.returnedPhoto) {
        const tof = "data:image/jpeg;base64," + room.returnedPhoto;
        setImagePreview(tof);
        const byteArray = new Uint8Array(room.returnedPhoto);
        const blob = new Blob([byteArray], { type: "image/jpeg" });
        const file = new File([blob], "roomPhoto.jpg", { type: "image/jpeg" });
        setRoomData((prevData) => ({ ...prevData, roomPhoto: file }));
      }
    });
  }, [roomId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setRoomData({ ...roomData, returnedPhoto: null });
    const data: RoomUpdateDto = {
      roomType: roomData.roomType,
      price: roomData.price,
    };

    // console.log(data);

    updateRoom(parseInt(roomIdValue), data)
      .then((response) => {
        if (response.status === 204) {
          navigate("/manage-rooms");
        }
      })
      .catch((error) => {
        setErrorMessage("Error updating room: " + error.message);
      });
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setImagePreview(URL.createObjectURL(file));
      setRoomData({ ...roomData, roomPhoto: file });
    }
  };

  return (
    <div className="container edit-room-container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="edit-room-container py-5">
            <h1 className="mb-4">Edit Room</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview room photo"
                    style={{
                      maxWidth: "400px",
                      maxHeight: "400px",
                      marginTop: "10px",
                    }}
                    className="mb-3"
                  />
                )}
                <label className="form-label">Room Photo</label>
                <input
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  className="form-control"
                  disabled
                  onChange={onFileSelected}
                  name="photo"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Room Type</label>
                <select
                  className="form-control"
                  value={roomData.roomType}
                  onChange={handleChange}
                  name="roomType"
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
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomData.price || ""}
                  onChange={handleChange}
                  placeholder="Enter price"
                  name="price"
                  min="0"
                />
              </div>

              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-start">
                  Update Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
