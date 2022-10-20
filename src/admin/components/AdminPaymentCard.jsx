import React from "react";
import "./styles/AdminUserCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const PaymentCard = (props) => {
  return (
    <div className="adminServiceCard medium-text m-1">
      <div className="row align-items-center">
        <div
          className={
            props?.info?.isDefault
              ? "col-2 text-warning"
              : "col-2 text-secondary"
          }
        >
          <FontAwesomeIcon icon={faUser} />
          <span>&ensp;{props?.info?.user}</span>
        </div>
        <div className="col-6 d-flex align-items-center">
          IBAN: {props?.info?.iban}
        </div>
        <div className="col-4 align-items-center d-flex justify-content-end">
          {props?.info?.currency}
          <button
            type="button"
            className="btn btn-outline-warning ms-4"
            onClick={() => props.showForm(props?.info?.user)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            type="button"
            className="btn btn-outline-danger ms-4"
            onClick={() => props.handleDelete(props?.info?.user)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
