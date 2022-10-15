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

  useEffect(() => {
    const getRooms = async () => {
      const result = await axiosPrivate.get("/rooms/");
      setRooms(result.data.data);
    };
    getRooms();
  }, [axiosPrivate]);

  return (
    <section className="roomsMainSection">
      <div className="roomsMainContainer">
        <div className="roomsSubContainer">
          {rooms?.map((room, i) => (
            <Room
              key={i}
              name={room?.name}
              opened={openedRooms.includes(room?.name)}
              openRoom={openRoom}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
