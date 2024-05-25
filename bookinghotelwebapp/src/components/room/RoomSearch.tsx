import { useState, ChangeEvent, FormEvent } from "react";
import "./RoomSearch.scss";
import { SearchRoomsData } from "../../apis/common/Types";
import RoomListing from "./RoomListing";

const RoomSearch = () => {
  const [formData, setFormData] = useState<SearchRoomsData>({
    checkInDate: new Date(),
    checkOutDate: new Date(),
    roomType: "",
  });
  const [searchRoomType, setSearchRoomType] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchRoomType(formData.roomType);
  };

  return (
    <>
      <div className="container room-search-container shadow mt-n5 py-5">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-xs-12 col-md-3 mb-3">
              <div className="form-group">
                <label htmlFor="checkInDate">Check-in Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="checkInDate"
                  name="checkInDate"
                  value={formData.checkInDate.toISOString().split("T")[0]}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            <div className="col-xs-12 col-md-3 mb-3">
              <div className="form-group">
                <label htmlFor="checkOutDate">Check-out Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="checkOutDate"
                  name="checkOutDate"
                  value={formData.checkOutDate.toISOString().split("T")[0]}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            <div className="col-xs-12 col-md-3 mb-3">
              <div className="form-group">
                <label htmlFor="roomType">Room Type</label>
                <select
                  className="form-control form-select"
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
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
            </div>
            <div className="col-xs-12 col-md-3 mb-3">
              <button type="submit" className="btn btn-secondary btn-search">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      <RoomListing
        showManageActions={false}
        roomType={searchRoomType || undefined}
      />
    </>
  );
};

export default RoomSearch;
