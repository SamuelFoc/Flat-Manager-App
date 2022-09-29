import React from "react";
import "./styles/AdminUserCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const UserCard = (props) => {
  return (
    <div className="adminServiceCard medium-text m-1">
      <div className="row align-items-center">
        <div className="col-2">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="col-4 d-flex align-items-center">
          {props?.info?.username}
        </div>
        <div className="col-6 align-items-center d-flex justify-content-end">
          {new Date(props?.info?.createdAt)?.toLocaleDateString("en-GB") +
            ", " +
            new Date(props?.info?.createdAt)?.toLocaleTimeString("en-GB")}
          <button
            type="button"
            className="btn btn-outline-warning ms-4"
            onClick={() => props.showForm(props?.info?.username)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            type="button"
            className="btn btn-outline-danger ms-4"
            onClick={() => props.handleDelete(props?.info?.username)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
