import React from "react";
import "./AdminEnergyCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function EnergyCard(props) {
  return (
    <div className="adminEnergyCard m-1">
      <div className="row">
        <div className="col-4">
          <h6 className="my-2">
            <FontAwesomeIcon icon={faCalendarPlus} />
            &emsp;
            {new Date(props.info.createdAt).toLocaleDateString("en-GB")}
          </h6>
        </div>
        <div className="col-2 d-flex align-items-center">{props.info.type}</div>
        <div className="col-6 align-items-center d-flex justify-content-end">
          <FontAwesomeIcon icon={faRuler} />
          <span className="d-flex align-items-center">
            &emsp;{props.info.measured_value}&ensp;
            {props.type === "water" || props.type === "gas" ? (
              <p className="m-0">
                m<sup>3</sup>
              </p>
            ) : (
              "kWh"
            )}
          </span>
          <button
            type="button"
            className="btn btn-outline-danger ms-4"
            onClick={() => props.handleDelete(props.info.id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </div>
  );
}
