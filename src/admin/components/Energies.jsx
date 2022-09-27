import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EnergyCard from "./AdminEnergyCard";
import "../../Custom.css";

const Energy = (props) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const energy = props.energies;
  const axiosPrivate = useAxiosPrivate();

  const setVisibility = () => {
    setShowUserForm((prevState) => !prevState);
  };

  const deleteRecord = (id) => {
    axiosPrivate
      .delete(`/admin/energy/${id}`)
      .then(() => {
        props.showMsg(`Record ID: ${id} deleted succesfully.`);
      })
      .catch((err) => {
        props.addError(`Error occurred while deleting ID: ${id}.`);
      });
  };

  return (
    <div className="w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h3>Energies</h3>
        {!showUserForm ? (
          <button
            className="btn btn-outline-warning my-2"
            onClick={setVisibility}
          >
            Configure
          </button>
        ) : (
          <button
            className="btn btn-outline-danger my-2"
            onClick={setVisibility}
          >
            Close
          </button>
        )}
      </div>
      <div className={showUserForm ? "formBox" : "formBox hidden"}>
        <div className="text-light my-4">
          {energy?.water?.length > 0 ? (
            energy?.water?.map((energy, i) => (
              <EnergyCard
                handleDelete={deleteRecord}
                key={i}
                info={energy}
                type={"water"}
              />
            ))
          ) : (
            <h6>There are no water consumption records..</h6>
          )}
          {energy?.gas?.length > 0 ? (
            energy?.gas?.map((energy, i) => (
              <EnergyCard
                handleDelete={deleteRecord}
                key={i}
                info={energy}
                type={"gas"}
              />
            ))
          ) : (
            <h6>There are no gas consumption records..</h6>
          )}
          {energy?.electricity?.length > 0 ? (
            energy?.electricity?.map((energy, i) => (
              <EnergyCard
                handleDelete={deleteRecord}
                key={i}
                info={energy}
                type={"electricity"}
              />
            ))
          ) : (
            <h6>There are no electricity consumption records..</h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default Energy;
