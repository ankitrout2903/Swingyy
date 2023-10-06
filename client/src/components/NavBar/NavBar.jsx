import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function logout(navigate) {
  localStorage.clear();
  navigate("/login");
}

function NavBar(props) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/home">
          Swingyy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Chat
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacts">
                Friend
              </Link>
            </li>
            <li className="nav-item">
              <Link type="button" className="btn btn-primary bg-black">
                Notifications{" "}
                <span className="badge text-white bg-danger">4</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                type="button"
                className="btn btn-primary position-relative bg-black"
              >
                Inbox
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  99+
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Link>
            </li>
          </div>
          <ul className="navbar-nav ms-auto align-text-top align-items-center">
            <li>
              <p>{props.curUser}</p>
            </li>
            <li className="nav-item ">
              <div className="d-flex">
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-danger" type="submit">
                    Search
                  </button>
                </form>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => logout(navigate)}
                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
