import Header from "../layout/Header";
import HotelService from "../room/HotelService";
import RoomSearch from "../room/RoomSearch";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container">
        <RoomSearch />
        <HotelService />
        <hr />
      </div>
    </>
  );
};

export default Home;
