import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./Custom.css";

const Users = (props) => {
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
      url: "/admin/register",
      data: data,
    };

    axiosPrivate(config)
      .then((res) => {
        props.showMsg("User registration successfull.");
        props.addError("");
        setIsLoading(false);
      })
      .catch(function (error) {
        props.showMsg("User registration failed.");
        props.addError(error.message);
        setIsLoading(false);
      });
  };
  return (
    <div className="text-end">
      {!showUserForm ? (
        <button
          className="btn btn-outline-success my-2"
          onClick={setVisibility}
        >
          Add User
        </button>
      ) : (
        <button className="btn btn-outline-danger my-2" onClick={setVisibility}>
          Close
        </button>
      )}
      <div className={showUserForm ? "formBox" : "formBox hidden"}>
        <form onSubmit={handleSubmit} className="row">
          <div className="col-6">
            <div class="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput1"
                placeholder="Joe"
                name="user"
                onChange={handleChange}
              />
              <label htmlFor="floatingInput1">Username</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput2"
                placeholder="name@example.com"
                name="email"
                onChange={handleChange}
              />
              <label htmlFor="floatingInput2">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingInput3"
                placeholder="Axy#321Al"
                name="pwd"
                onChange={handleChange}
              />
              <label htmlFor="floatingInput3">Password</label>
            </div>
          </div>
          <div className="col-6">
            <div class="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInput4"
                placeholder="21"
                name="age"
                onChange={handleChange}
              />
              <label htmlFor="floatingInput4">Age</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput5"
                placeholder="Company a.s."
                name="work"
                onChange={handleChange}
              />
              <label htmlFor="floatingInput5">Work</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput6"
                placeholder="Room 1"
                name="room"
                onChange={handleChange}
              />
              <label htmlFor="floatingInput6">Room</label>
            </div>
          </div>
          <div className="form-check">
            <label htmlFor="isAdmin" className="form-check-label text-light">
              is Admin ?
            </label>
            <input
              id="isAdmin"
              className="form-check-input my-2"
              onChange={handleChange}
              type="checkbox"
              name="isAdmin"
            />
          </div>
          <div className="row d-flex justify-content-end">
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
              <button className="btn btn-primary mt-4 btn-w">REGISTER</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Users;
