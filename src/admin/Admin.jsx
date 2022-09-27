import { useState, useEffect } from "react";
import Users from "./components/Users";
import Energies from "./components/Energies";

import "./Admin.css";
import { axiosPrivate } from "../api/axios";
// AXIOS SET

const Admin = () => {
  const [newError, setNewError] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [energy, setEnergy] = useState("");

  useEffect(() => {
    axiosPrivate.get("/admin/energies").then((energies) => {
      setEnergy(energies.data.data);
    });
  }, [newMsg]);

  return (
    <section className="adminPage container-fluid container-md">
      <div className="adminMsgBox">
        <h4 className="text-light">
          Messages:{" "}
          {newMsg || newError ? (
            ""
          ) : (
            <p className="bg-secondary p-2 mt-2 rounded">No messages</p>
          )}
        </h4>
        <div
          className={
            newError ? "alert alert-danger" : "alert alert-danger collapse"
          }
          role="alert"
        >
          {newError}
        </div>
        <div
          className={
            newMsg ? "alert alert-success" : "alert alert-success collapse"
          }
          role="alert"
        >
          {newMsg}
        </div>
      </div>
      <div className="adminBox">
        <h3>Users</h3>
        <Users showMsg={setNewMsg} addError={setNewError} />
      </div>
      <div className="adminBox">
        <h3>Products</h3>
      </div>
      <div className="adminBox">
        <h3>Responsibilities</h3>
      </div>
      <div className="adminBox">
        <h3>Events</h3>
      </div>
      <div className="adminBox">
        <h3>Energies</h3>
        <Energies
          energies={energy}
          showMsg={setNewMsg}
          addError={setNewError}
        />
      </div>
    </section>
  );
};

export default Admin;
