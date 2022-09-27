import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "../../Custom.css";

const Services = (props) => {
  const [formData, setFormData] = useState();
  const [showUserForm, setShowUserForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

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
            className="btn btn-outline-success my-2"
            onClick={setVisibility}
          >
            Add Service
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
      </div>
    </div>
  );
};

export default Services;
