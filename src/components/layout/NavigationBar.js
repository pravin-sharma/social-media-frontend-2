import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import profileContext from "../../context/profile/profileContext";
import postContext from "../../context/post/postContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../search/SearchBar";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const NavigationBar = ({ title, logo }) => {
  const { logout, isAuthenticated, user } = useContext(AuthContext);
  const { clearPosts } = useContext(postContext);
  const { clearAllProfile } = useContext(profileContext);
  const { setAlert } = useContext(AlertContext);

  const onLogout = () => {
    logout();
    clearPosts();
    clearAllProfile();

    setAlert("Logged Out Successfully", "warning");
  };

  const AuthLink = (
    <div className="d-flex justify-content-center align-items-center">

      {/* User profile Pic */}
      {user?.role!=='admin' && <NavLink
        to={`/profile/${user?._id}`}
        className={({ isActive }) =>
          isActive
            ? "border border-1 border-success rounded-circle me-3"
            : " me-3"
        }
      >
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip>{user?.name}</Tooltip>}
        >
          <img
            src={user?.profilePicUrl}
            alt=""
            className="rounded-circle"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
            }}
          />
        </OverlayTrigger>
      </NavLink>}

      <a onClick={onLogout} href="#!" className="btn btn-outline-danger">
        Logout
      </a>
    </div>
  );

  const guestLink = (
    <div className="d-flex justify-content-center align-items-center">
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? "btn me-4 btn-light" : " btn me-4 btn-outline-light"
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive ? "btn me-4 btn-light" : " btn me-4 btn-outline-light"
        }
      >
        Register
      </NavLink>
    </div>
  );

  return (
    <nav className="navbar navbar-dark  navbar-expand-sm bg-dark">
      <div className="container justify-content-sm-between">
        <NavLink
          className="navbar-brand text-light d-flex align-items-center justify-content-between mb-2 mb-md-0 me-5"
          to="/home"
        >
          <img
            src={logo}
            alt="Logo"
            width="24"
            height="24"
            className="d-inline-block me-2"
          />
          {title}
        </NavLink>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        {/* <div className="collapse navbar-collapse" id="navbarTogglerDemo02"> */}
        {isAuthenticated && user?.role!=='admin' && <SearchBar />}
        {isAuthenticated && user?.role==='admin' && <div className="text-light fw-bold fs-4">Admin Dashboard</div>}
        {!isAuthenticated && guestLink}
        {isAuthenticated && AuthLink}
        {/* </div> */}
      </div>
    </nav>
  );
};

NavigationBar.propTypes = {
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};

NavigationBar.defaultProps = {
  title: "JellUp",
  logo: "/logo.png",
};

export default NavigationBar;
