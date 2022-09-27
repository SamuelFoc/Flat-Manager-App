import React from "react";
import "./styles/ServiceCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

const ServiceCard = (props) => {
  return (
    <div className="serviceCardBox">
      <h5>{props?.info?.name}</h5>
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon={faMoneyBill} /> &emsp; {props.info.price} CZK{" "}
        {props?.info?.unit ? `/${props.info.unit}` : ""}
      </div>
      {props?.info?.payday ? (
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faCalendarCheck} /> &emsp; Pay by{" "}
          {props?.info?.payday}
          <sup>th</sup>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ServiceCard;
