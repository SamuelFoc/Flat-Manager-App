import Room from "../components/Room";
import React from "react";
import "./styles/Rooms.css";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Rooms = () => {
  const axiosPrivate = useAxiosPrivate();
  const [openedRooms, setOpenedRooms] = useState([]);
  const [rooms, setRooms] = useState();
  const [msg, setMsg] = useState({ status: true, message: "Payment summary" });

  const openRoom = (room) => {
    const isAlreadyOpen = openedRooms?.includes(room);
    if (isAlreadyOpen) {
      setOpenedRooms((prevState) => {
        let newState = [...prevState];
        return newState.filter((item) => item !== room);
      });
    } else {
      setOpenedRooms((prevState) => {
        let newState = [...prevState];
        newState.push(room);
        return newState;
      });
    }
  };

  const pay = (room) => {
    var config = {
      method: "put",
      url: `/rooms/${room}`,
      data: JSON.stringify({ paidOn: new Date() }),
    };
    axiosPrivate(config)
      .then((res) => {
        setMsg({
          status: true,
          message: `Payment for ${room} completed.`,
        });
      })
      .catch((err) => {
        setMsg({
          status: false,
          message: `Payment for ${room} denied.`,
        });
      });
  };

  useEffect(() => {
    const getRooms = async () => {
      const result = await axiosPrivate.get("/rooms/");
      setRooms(result.data.data);
    };
    getRooms();
  }, [axiosPrivate, msg]);

  return (
    <section className="roomsMainSection">
      <div className="roomsMainContainer">
        <div className={msg.status ? "roomsMsg-success" : "roomsMsg-denied"}>
          {msg.message}
        </div>
        <div className="roomsSubContainer">
          {rooms?.map((room, i) => (
            <Room
              key={i}
              name={room?.name}
              opened={openedRooms.includes(room?.name)}
              openRoom={openRoom}
              pay={pay}
              msg={msg}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
