import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faTemperatureThreeQuarters } from "@fortawesome/free-solid-svg-icons";
import { faTemperatureQuarter } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import RespCard from "../components/RespCard";
import HiddenForm from "../components/HiddenForm";

export default function Responsibilities() {
  // TODO: STATES
  const [myData, setMyData] = useState([]);
  const [Id, setId] = useState();
  const [isShowedCreate, setIsShowedCreate] = useState(false);
  const [newResp, setNewResp] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "",
  });
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [whatChanged, setWhatChanged] = useState("");

  // TODO: HANDLERS
  const showFormCreate = () => {
    setIsShowedCreate(!isShowedCreate);
    setId(false);
    setNewResp({});
    setWhatChanged("creation");
  };

  const deleteResp = (id) => {
    axiosPrivate.delete(`/responsibilities/${id}`);
    setId(false);
    setWhatChanged(`${id} deleted`);
  };

  const updateRespStatus = async (id, isDone) => {
    await axiosPrivate.put(
      `/responsibilities/${id}`,
      JSON.stringify({
        done: !isDone,
      })
    );

    setWhatChanged(`${id} updated..${Math.random()}`);
  };

  const handleChange = (event) => {
    setNewResp((prevFormData) => {
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

    const getResps = async () => {
      try {
        const response = await axiosPrivate.get("/responsibilities");
        isMounted && setMyData(response.data.data);
      } catch (err) {
        console.log(err);
        navigate("/home", { state: { from: location }, replace: true });
      }
    };

    getResps();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate, whatChanged]);

  // * DATA HANDLERS
  const low = myData.filter((item) => item.urgent === "LOW");
  const high = myData.filter((item) => item.urgent === "HIGH");
  const critical = myData.filter((item) => item.urgent === "CRITICAL");

  // TODO: INFO OBJECTS
  const formInfo = {
    submit: {
      url: Id ? `/responsibilities/${Id}` : "/responsibilities",
      method: Id ? "put" : "post",
      data: newResp,
    },
    inputs: [{ name: "title" }, { name: "description" }],
    dates: ["deadline"],
    selections: [{ name: "priority", options: ["LOW", "HIGH", "CRITICAL"] }],
    submitName: "CREATE",
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
      <div className="respBox text-light mt-4 pe-5">
        <div className="row d-flex justify-content-center w-100">
          <div className="col-12 col-md-8 col-xl-6 col-xxl-4 p-2">
            <h6 className="ms-2 mb-4">
              Critical priority{" "}
              <FontAwesomeIcon
                icon={faTemperatureArrowUp}
                className="critical-priority"
              />
            </h6>
            <div className="row m-2">
              {critical?.length ? (
                critical.map((resp) => (
                  <RespCard
                    key={resp.id}
                    info={resp}
                    handleEdit={updateRespStatus}
                    handleDelete={deleteResp}
                  />
                ))
              ) : (
                <div className="noData">
                  <span>No critical responsibilities</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-md-8 col-xl-6 col-xxl-4 p-2 ">
            <h6 className="ms-2 mb-4">
              High priority{" "}
              <FontAwesomeIcon
                icon={faTemperatureThreeQuarters}
                className="high-priority"
              />
            </h6>
            <div className="row m-2">
              {high?.length ? (
                high.map((resp) => (
                  <RespCard
                    key={resp.id}
                    info={resp}
                    handleEdit={updateRespStatus}
                    handleDelete={deleteResp}
                  />
                ))
              ) : (
                <div className="noData">
                  <span>No high priority responsibilities</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-md-8 col-xl-6 col-xxl-4 p-2 ">
            <h6 className="ms-2 mb-4">
              Low priority{" "}
              <FontAwesomeIcon
                icon={faTemperatureQuarter}
                className="low-priority"
              />
            </h6>
            <div className="row m-2">
              {low?.length ? (
                low.map((resp) => (
                  <RespCard
                    key={resp.id}
                    info={resp}
                    handleEdit={updateRespStatus}
                    handleDelete={deleteResp}
                  />
                ))
              ) : (
                <div className="noData">
                  <span>No low priority responsibilities</span>
                </div>
              )}
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
          whatChanged={setWhatChanged}
        />
      )}
    </div>
  );
}
