import { faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "./styles/Room.css";

const Room = (props) => {
  const [room, setRoom] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getRoom = async () => {
      const result = await axiosPrivate.get(`/rooms/${props.name}/`);
      setRoom(result.data);
    };
    getRoom();
  }, []);

  return (
    <div>
      {props.opened ? (
        <div className="openedRoom">
          <h4>Room {props.name}</h4>
          <div className="openedRoomConatainer">
            <div>
              <strong>Num. of accomodated:&ensp;</strong>
              <span>{room?.livings}</span>
            </div>
            <div>
              <strong>Monthly costs:&ensp;</strong>
              {room.units?.map((unit, i) => (
                <div key={i} className="ms-4">
                  <strong>{unit.name}:&ensp;</strong>
                  <span>{unit.price}&ensp;CZK</span>
                </div>
              ))}
            </div>
            <div>
              <strong>Last paid:&ensp;</strong>
              <span>Date</span>
            </div>
            <div>
              <strong>Nearest pay date:&ensp;</strong>
              <span>Date</span>
            </div>
            <div>
              <strong>Rent:&ensp;</strong>
              <span>{room?.cost}&ensp;CZK</span>
            </div>
            <div>
              <img
                src="//upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png"
                alt=""
              />
            </div>
          </div>
          <button
            className="btn btn-outline-warning"
            onClick={() => props.openRoom(props.name)}
          >
            Close Room
          </button>
          <button className="ms-4 btn btn-outline-success">Paid</button>
        </div>
      ) : (
        <div
          className="room display-4"
          onClick={() => props.openRoom(props.name)}
        >
          <FontAwesomeIcon icon={faBed} />
          <h3 className="mt-2">{props.name}</h3>
        </div>
      )}
    </div>
  );
};

export default Room;
