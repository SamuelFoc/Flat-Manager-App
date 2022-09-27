import React from "react";
import "./styles/EnergyCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

export default function EnergyCard(props) {
  return (
    <div className="energyCard m-1">
      <div className="row medium-text">
        <div className="col-4">
          <span>
            <FontAwesomeIcon icon={faCalendarPlus} />
            &emsp;
            {new Date(props.info.createdAt).toLocaleDateString("en-GB", {
              dateStyle: "medium",
            })}
          </span>
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
        </div>
      </div>
    </div>
  );
}
