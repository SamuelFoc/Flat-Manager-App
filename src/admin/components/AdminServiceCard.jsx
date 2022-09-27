import React from "react";
import "./styles/AdminServiceCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ServiceCard = (props) => {
  return (
    <div className="adminServiceCard medium-text m-1">
      <div className="row align-items-center">
        <div className="col-4">
          <span className="my-2">
            <FontAwesomeIcon icon={faCalendarCheck} />
            &emsp;
            {new Date(props.info.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>
        <div className="col-2 d-flex align-items-center">{props.info.name}</div>
        <div className="col-6 align-items-center d-flex justify-content-end">
          <FontAwesomeIcon icon={faMoneyBill} />
          <span className="d-flex align-items-center">
            &emsp;{props.info.unit_price}&ensp;{`CZK/${props.info.unit}`}
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
};

export default ServiceCard;
