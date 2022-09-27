import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import "../styles/Logout.css";

const Logout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("/logout").then(() => {
      setAuth({});
    });
  }, [axiosPrivate, setAuth]);

  return (
    <div className="text-light logoutPage">
      <h1 className="me-2 logout-title">You've been logged out..</h1>
      <FontAwesomeIcon className="mx-2 logout-icon" icon={faArrowTurnUp} />
      <NavLink className="d-flex align-items-center" to="/admin">
        <button className="btn btn-success logout-button">
          Go to Log In..
        </button>
      </NavLink>
    </div>
  );
};

export default Logout;
