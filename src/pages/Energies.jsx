import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import { faPlug } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import "./Energies.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import EnergyCard from "../components/EnergyCard";
import HiddenForm from "../components/HiddenForm";
import Statistics from "../components/Statistics";

export default function Energies() {
  // TODO: STATES
  const [energyData, setEnergyData] = useState();
  const [newRecord, setNewRecord] = useState();
  const [isShowedCreate, setIsShowedCreate] = useState();
  const [whatChanged, setWhatChanged] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: HANDLERS
  const showFormCreate = () => {
    setIsShowedCreate(!isShowedCreate);
    setWhatChanged("creation");
  };

  const handleChange = (event) => {
    setNewRecord((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  // TODO: EFFECTS
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEnergies = async () => {
      try {
        const response = await axiosPrivate.get("/energies");
        isMounted && setEnergyData(response.data.data);
      } catch (err) {
        console.log(err);
        navigate("/home", { state: { from: location }, replace: true });
      }
    };

    getEnergies();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate, whatChanged]);

  // TODO: INFO OBJECTS
  const formInfo = {
    submit: {
      url: "/energies",
      method: "post",
      data: newRecord,
    },
    inputs: ["measured"],
    dates: ["date"],
    selections: [{ name: "type", options: ["Electricity", "Gas", "Water"] }],
    submitName: "CREATE RECORD",
  };

  return (
    <div className="">
      <h3 className="color-light ms-3">
        Energy Records{" "}
        <FontAwesomeIcon
          icon={faPlus}
          className="config color-light ms-3 btn-custom"
          onClick={showFormCreate}
        />
      </h3>
      <div className="energyBox flex-column text-light">
        <div className="row d-flex justify-content-center w-100">
          <div className="col-12 col-md-8 col-xl-6 col-xxl-4 p-2">
            <h3 className="ms-2 mb-4">
              Water consumption{" "}
              <FontAwesomeIcon icon={faDroplet} className="low-priority" />
            </h3>
            <div className="row m-2">
              {energyData?.water?.length > 0 ? (
                energyData?.water?.map((record) => (
                  <EnergyCard type="water" info={record} />
                ))
              ) : (
                <h6>There are no records..</h6>
              )}
            </div>
          </div>
          <div className="col-12 col-md-8 col-xl-6 col-xxl-4 p-2 ">
            <h3 className="ms-2 mb-4">
              Gas consumption{" "}
              <FontAwesomeIcon
                icon={faFireFlameCurved}
                className="high-priority"
              />
            </h3>
            <div className="row m-2">
              {energyData?.gas?.length > 0 ? (
                energyData?.gas?.map((record) => (
                  <EnergyCard type="gas" info={record} />
                ))
              ) : (
                <h6>There are no records..</h6>
              )}
            </div>
          </div>
          <div className="col-12 col-md-8 col-xl-6 col-xxl-4 p-2 ">
            <h3 className="ms-2 mb-4">
              Electricity consumption{" "}
              <FontAwesomeIcon icon={faPlug} className="critical-priority" />
            </h3>
            <div className="row m-2">
              {energyData?.electricity?.length > 0 ? (
                energyData?.electricity?.map((record) => (
                  <EnergyCard info={record} type="electricity" />
                ))
              ) : (
                <h6>There are no records..</h6>
              )}
            </div>
          </div>
        </div>
        <div className="row w-100 mt-4">
          <h3 className="mb-4">
            Consumption Statistics{" "}
            <FontAwesomeIcon icon={faChartLine} className="critical-priority" />
            <div className="chartHolder d-flex justify-content-center py-4">
              <Statistics data={energyData} />
            </div>
          </h3>
        </div>
      </div>

      {/* HIDDEN FORM FOR CREATING NEW RESPS*/}
      {isShowedCreate && (
        <HiddenForm
          formInfo={formInfo}
          showForm={showFormCreate}
          handleChange={handleChange}
          whatChanged={setWhatChanged}
        />
      )}
    </div>
  );
}