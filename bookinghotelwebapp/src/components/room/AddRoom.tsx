import { useState, ChangeEvent, FormEvent } from "react";
import "./AddRoom.scss";
import { RoomData } from "../../apis/common/Types";
import { addRoom } from "../../apis/room/RoomApis";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const [roomData, setRoomData] = useState<RoomData>({
    roomType: "",
    price: null,
    roomPhoto: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!roomData.roomType || !roomData.price || !roomData.roomPhoto) {
      console.error("Please fill out all fields");
      return;
    }

    try {
      const response = await addRoom(roomData);
      if (response.status === 201) {
        setImagePreview(null);
        navigate("/manage-rooms");
      }
    } catch (error) {
      console.error("Error adding room:", error);
    }
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="add-room-container py-5">
            <h1 className="mb-4">Add Room</h1>
            <form onSubmit={handleSubmit}>
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
              <div className="mb-3">
                <label className="form-label">Room Photo</label>
                <input
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  className="form-control"
                  onChange={onFileSelected}
                  name="photo"
                />
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
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-start">
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
