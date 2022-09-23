import React from "react";
import RespCard from "../components/RespCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faTemperatureThreeQuarters } from "@fortawesome/free-solid-svg-icons";
import { faTemperatureQuarter } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import HiddenForm from "../components/HiddenForm";

export default function Home() {
  const [myData, setMyData] = React.useState([]);
  const [isShowedCreate, setIsShowedCreate] = React.useState(false);
  const [newResp, setNewResp] = React.useState({
    title: "",
    description: "",
    deadline: "",
    priority: "",
  });

  const formInfo = {
    submit: {
      url: "http://localhost:4000/responsibilities/samo.sipikal@gmail.com",
      method: "post",
      data: newResp,
    },
    inputs: ["title", "description"],
    dates: ["deadline"],
    selections: [{ name: "priority", options: ["LOW", "HIGH", "CRITICAL"] }],
    submitName: "CREATE",
  };

  React.useEffect(() => {
    fetch("http://localhost:4000/responsibilities/samo.sipikal@gmail.com")
      .then((res) => res.json())
      .then((response) => {
        setMyData(response.data);
      });
  }, []);

  const low = myData.filter((item) => item.urgent === "LOW");
  const high = myData.filter((item) => item.urgent === "HIGH");
  const critical = myData.filter((item) => item.urgent === "CRITICAL");
  const lowResps = low.map((resp) => <RespCard key={resp.id} info={resp} />);
  const highResps = high.map((resp) => <RespCard key={resp.id} info={resp} />);
  const criticalResps = critical.map((resp) => (
    <RespCard key={resp.id} info={resp} />
  ));

  const showFormCreate = () => {
    setIsShowedCreate(!isShowedCreate);
  };

  const handleChange = (event) => {
    setNewResp((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div className="">
      <h3 className="color-light ms-3">
        My Responsibilities{" "}
        <FontAwesomeIcon
          icon={faPlus}
          className="config color-light ms-3 btn-custom"
          onClick={showFormCreate}
        />
      </h3>
      <div className="respBox text-light">
        <div className="row d-flex justify-content-center w-100">
          <div className="col-12 col-md-8 col-xl-6 col-xxl-4 p-2">
            <h3 className="ms-2 mb-4">
              Critical priority{" "}
              <FontAwesomeIcon
                icon={faTemperatureArrowUp}
                className="critical-priority"
              />
            </h3>
            <div className="row m-2">
              {criticalResps ? (
                criticalResps
              ) : (
                <h6>No critical responsibilities</h6>
              )}
            </div>
          </div>
          <div className="col-12 col-md-8 col-xl-6 col-xxl-4 p-2 ">
            <h3 className="ms-2 mb-4">
              High priority{" "}
              <FontAwesomeIcon
                icon={faTemperatureThreeQuarters}
                className="high-priority"
              />
            </h3>
            <div className="row m-2">
              {highResps ? highResps : <h6>No high responsibilities</h6>}
            </div>
          </div>
          <div className="col-12 col-md-8 col-xl-6 col-xxl-4 p-2 ">
            <h3 className="ms-2 mb-4">
              Low priority{" "}
              <FontAwesomeIcon
                icon={faTemperatureQuarter}
                className="low-priority"
              />
            </h3>
            <div className="row m-2">
              {lowResps ? lowResps : <h6>No low responsibilities</h6>}
            </div>
          </div>
        </div>
      </div>

      {/* HIDDEN FORM FOR CREATING NEW RESPS*/}
      {isShowedCreate && (
        <HiddenForm
          formInfo={formInfo}
          showForm={showFormCreate}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}
