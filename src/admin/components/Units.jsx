import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Unit from "./AdminServiceCard";
import "../../Custom.css";

const Services = (props) => {
  const [formData, setFormData] = useState();
  const [unitsData, setUnitsData] = useState();
  const [showUserForm, setShowUserForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  const setVisibility = () => {
    setShowUserForm((prevState) => !prevState);
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const deleteRecord = (id) => {
    axiosPrivate
      .delete(`/admin/unit/${id}`)
      .then(() => {
        props.showMsg(`Unit ID: ${id} deleted succesfully.`);
      })
      .catch((err) => {
        props.addError(`Error occurred while deleting ID: ${id}.`);
      });
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUnits = async () => {
      try {
        const units = await axiosPrivate.get("admin/units");
        isMounted && setUnitsData(units.data.data);
      } catch (err) {
        console.log(err);
        navigate("/home", { state: { from: location }, replace: true });
      }
    };

    getUnits();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate, props.showMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    var data = JSON.stringify(formData);
    console.log(data);
    var config = {
      method: "post",
      url: "/admin/units",
      data: data,
    };

    axiosPrivate(config)
      .then((res) => {
        props.showMsg("Unit created successfully.");
        props.addError("");
        setIsLoading(false);
      })
      .catch(function (error) {
        props.showMsg("Unit creation failed.");
        props.addError(error.message);
        setIsLoading(false);
      });
  };
  return (
    <div className="w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h3>Units</h3>
        {!showUserForm ? (
          <button
            className="btn btn-outline-warning my-2"
            onClick={setVisibility}
          >
            Configure
          </button>
        ) : (
          <button
            className="btn btn-outline-danger my-2"
            onClick={setVisibility}
          >
            Close
          </button>
        )}
      </div>
      <div className={showUserForm ? "formBox" : "formBox hidden"}>
        <form onSubmit={handleSubmit} className="row">
          <div className="col-12 px-5">
            <div class=" mb-3">
              <input
                type="text"
                className="form-control input"
                name="name"
                placeholder="Unit name"
                onChange={handleChange}
              />
            </div>
            <div class=" mb-3">
              <input
                type="number"
                step={0.01}
                className="form-control input"
                name="unit_price"
                placeholder="Unit price"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3">
              <input
                type="text"
                className="form-control input"
                name="unit"
                placeholder="Unit"
                onChange={handleChange}
              />
            </div>
            {isLoading ? (
              <button className="btn btn-primary mt-4 btn-w">
                <span
                  className="spinner-border spinner-border-sm me-4"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : (
              <button className="btn btn-primary mt-4 btn-w">ADD UNIT</button>
            )}
          </div>
        </form>
        <div className="text-light my-2">
          {unitsData?.length > 0 ? (
            unitsData?.map((service) => (
              <Unit info={service} handleDelete={deleteRecord} />
            ))
          ) : (
            <h6 className=" m-2 text-light">There are no services in DB..</h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
