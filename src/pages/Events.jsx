import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/Events.css";

const Events = () => {
  // TODO: STATES

  // TODO: EFFECTS
  useEffect(() => {
    const getData = async () => {};

    getData();
  }, []);

  return (
    <div className="text-light">
      <h1>Events</h1>
    </div>
  );
};

export default Events;
