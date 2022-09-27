import { useState, useEffect } from "react";
import Users from "./components/Users";
import Energies from "./components/Energies";
import Units from "./components/Units";

import "./Admin.css";
import { axiosPrivate } from "../api/axios";
import Services from "./components/Services";
// AXIOS SET

const Admin = () => {
  const [newError, setNewError] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [energy, setEnergy] = useState("");
  const [service, setService] = useState("");
  const [unit, setUnit] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    axiosPrivate.get("/admin/energies").then((energies) => {
      setEnergy(energies.data.data);
    });
    axiosPrivate.get("/admin/services").then((services) => {
      setService(services.data.data);
    });
    axiosPrivate.get("/admin/users").then((users) => {
      setUser(users.data.data);
    });
    axiosPrivate.get("/admin/units").then((units) => {
      setUnit(units.data.data);
    });
  }, [newMsg]);

  return (
    <section className="adminPage container-fluid">
      <div className="adminMsgBox">
        <h4 className="text-light">
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
        <Users users={user} showMsg={setNewMsg} addError={setNewError} />
      </div>
      <div className="adminBox">
        <Services
          services={service}
          showMsg={setNewMsg}
          addError={setNewError}
        />
      </div>
      <div className="adminBox">
        <Units units={unit} showMsg={setNewMsg} addError={setNewError} />
      </div>
      <div className="adminBox">
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
