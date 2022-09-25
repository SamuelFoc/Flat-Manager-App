import React from "react";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function ProductCard(props) {
  return (
    <div className="productCard p-3 color-light mx-3 my-2 position-relative">
      <span className="corner-position">
        <FontAwesomeIcon
          icon={faPen}
          className="config color-light btn btn-outline-dark"
          onClick={() => props.handleEdit(props.info.id)}
        />
        <FontAwesomeIcon
          icon={faCheck}
          className="config color-light ms-2 btn btn-outline-success"
          onClick={() => props.handleDelete(props.info.id)}
        />
      </span>
      <div className="d-flex">
        <div to="/" className="text-center m-2 me-3">
          <FontAwesomeIcon icon={faTag} className="display-5 color-light" />
        </div>
        <div>
          <div className="productCardInfoBox">
            <h6 className="productCardTitle">
              {props.info.name.toUpperCase()}
            </h6>
            <p className="productCardText">{props.info.type}</p>
            <p className="productCardText">~{props.info.price}CZK</p>
          </div>
        </div>
      </div>
      <div className="p-0 d-flex">
        <strong className="productCardFor me-2">For: </strong>
        <p className="productCardOwner">
          {props.info.ownership === "every"
            ? "Everybody"
            : props.info.userEmail}
        </p>
      </div>
      <div>
        <FontAwesomeIcon icon={faTruckFast} className="fs-6 me-2 color-light" />
        <strong style={{ fontSize: ".85rem" }}>{props.info.urgent}</strong>
      </div>
    </div>
  );
}

export default ProductCard;
