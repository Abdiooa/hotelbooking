import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const NavBar: React.FC = () => {
  const { authState, isLoggedIn, handleLogout } = useAuth();
  const { userRole } = authState;

  const isLogged = isLoggedIn();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          RueViestaHotel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/rooms">
                Browse all rooms
              </Link>
            </li>
            {/* {isLogged && userRole === "ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" to="/bookings">
                  Browse all bookings
                </Link>
              </li>
            )} */}
          </ul>

          <ul className="d-flex navbar-nav">
            {isLogged && (
              <>
                {userRole === "USER" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-bookings">
                      My Bookings
                    </Link>
                  </li>
                )}
                {userRole === "ADMIN" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/manage-rooms">
                        Manage Rooms
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/bookings">
                        Manage Bookings
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {!isLogged ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          handleLogout();
                          window.location.href = "/login";
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
