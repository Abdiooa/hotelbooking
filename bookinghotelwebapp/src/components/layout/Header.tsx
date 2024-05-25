import "./Header.scss";

const Header = () => {
  return (
    <div className="header-container position-relative">
      <div className="header-content text-center text-white position-absolute top-50 start-50 translate-middle">
        <h1>
          Welcome to <span className="hotel-color">RueViesta Hotel</span>
        </h1>
        <h4>Experience the Best Hospitality in Town</h4>
      </div>
    </div>
  );
};

export default Header;
