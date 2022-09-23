import React from "react";
import "./RespCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import qs from "qs";
import Axios from "axios";

function RespCard(props) {
  const handleIsDone = (id) => {
    var data = qs.stringify({
      done: !props.info.done,
    });

    var config = {
      method: "put",
      url: `http://localhost:4000/responsibilities/samo.sipikal@gmail.com/${id}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    Axios(config)
      .catch(function (error) {
        console.log(error);
      })
      .then(() => {
        window.location.reload();
      });
  };

  const handleDelete = (id) => {
    Axios.delete(
      `http://localhost:4000/responsibilities/samo.sipikal@gmail.com/${id}`
    ).then(() => {
      window.location.reload();
    });
  };

  const checkClass = (data) => {
    let myClass;

    if (data === "CRITICAL") {
      myClass = "-critical";
    } else if (data === "HIGH") {
      myClass = "-high";
    } else if (data === "LOW") {
      myClass = "-low";
    } else {
      myClass = "";
    }

    return myClass;
  };

  return (
    <div className="respCard m-1">
      <div className="row">
        <div className={"col-6 respTitle" + checkClass(props.info.urgent)}>
          <h6 className="my-2">{props.info.title}</h6>
        </div>
        <div className="col-6 d-flex justify-content-end">
          {props.info.done ? (
            <button className="btn btn-outline-warning">
              <FontAwesomeIcon
                icon={faRepeat}
                className="fs-6"
                onClick={() => {
                  handleIsDone(props.info.id);
                }}
              />
            </button>
          ) : (
            <button className="btn btn-outline-success">
              <FontAwesomeIcon
                icon={faCheck}
                className="fs-6"
                onClick={() => {
                  handleIsDone(props.info.id);
                }}
              />
            </button>
          )}
          <button type="button" className="btn btn-dark">
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => handleDelete(props.info.id)}
            />
          </button>
        </div>
      </div>
      <div className="row d-flex align-items-center">
        <div className="col-8 respDescription text-start">
          {props.info.description}
        </div>
        <div className={"col-2 respDate" + checkClass(props.info.urgent)}>
          {new Date(props.info.deadline).toLocaleDateString()}
        </div>
        <div className="col-2 text-center">
          <FontAwesomeIcon
            icon={props.info.done ? faCheck : faXmark}
            className={
              props.info.done ? "respDoneIcon-check" : "respDoneIcon-cross"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default RespCard;
