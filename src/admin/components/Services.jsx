import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ServiceCard from "./AdminServiceCard";
import "../../Custom.css";

const Services = (props) => {
  const [formData, setFormData] = useState();
  const [services, setServices] = useState();
  const [showUserForm, setShowUserForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const setVisibility = () => {
    setShowUserForm((prevState) => !prevState);
  };

  const deleteRecord = (id) => {
    axiosPrivate
      .delete(`/admin/service/${id}`)
      .then(() => {
        props.showMsg(`Record ID: ${id} deleted succesfully.`);
      })
      .catch((err) => {
        props.addError(`Error occurred while deleting ID: ${id}.`);
      });
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getServices = async () => {
      try {
        const units = await axiosPrivate.get("admin/services");
        isMounted && setServices(units.data.data);
      } catch (err) {
        console.log(err);
        navigate("/home", { state: { from: location }, replace: true });
      }
    };

    getServices();

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
      url: "/admin/services",
      data: data,
    };

    axiosPrivate(config)
      .then((res) => {
        props.showMsg("Service created successfully.");
        props.addError("");
        setIsLoading(false);
      })
      .catch(function (error) {
        props.showMsg("Service creation failed.");
        props.addError(error.message);
        setIsLoading(false);
      });
  };
  return (
    <div className="w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h3>Services</h3>
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
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div class=" mb-3">
              <input
                type="number"
                className="form-control input"
                name="monthly_price"
                placeholder="Monthly price"
                onChange={handleChange}
              />
            </div>
            <div class=" mb-3">
              <input
                type="number"
                className="form-control input"
                name="pay_day"
                placeholder="Payment day"
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
              <button className="btn btn-primary mt-4 btn-w">
                ADD SERVICE
              </button>
            )}
          </div>
        </form>
        <div className="text-light my-2">
          {services?.length > 0 ? (
            services?.map((service) => (
              <ServiceCard info={service} handleDelete={deleteRecord} />
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
