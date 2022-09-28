import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import User from "./AdminUserCard";
import "../../Custom.css";

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

  const deleteUser = (username) => {
    axiosPrivate
      .delete(`/admin/user/${username}`)
      .then(() => {
        props.showMsg(`User ${username} deleted succesfully.`);
      })
      .catch((err) => {
        props.addError(`Error occurred while deleting ${username}.`);
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
        props.showMsg(`User ${formData?.user} registrated successfully.`);
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
    <div className="w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h3>Users</h3>
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
          <div className="col-6">
            <div class=" mb-3">
              <input
                type="text"
                className="form-control input"
                placeholder="Name"
                name="user"
                onChange={handleChange}
              />
            </div>
            <div class=" mb-3">
              <input
                type="email"
                className="form-control input"
                placeholder="E-mail"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div class=" mb-3">
              <input
                type="password"
                className="form-control input"
                placeholder="Password"
                name="pwd"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            <div class=" mb-3">
              <input
                type="number"
                className="form-control input"
                placeholder="Age"
                name="age"
                onChange={handleChange}
              />
            </div>
            <div class=" mb-3">
              <input
                type="text"
                className="form-control input"
                placeholder="Working at"
                name="work"
                onChange={handleChange}
              />
            </div>
            <div class=" mb-3">
              <input
                type="tel"
                className="form-control input"
                placeholder="Contact"
                name="contact"
                onChange={handleChange}
              />
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
        <div className="text-light my-4">
          {props?.users?.length > 0 ? (
            props?.users?.map((user) => (
              <User info={user} handleDelete={deleteUser} />
            ))
          ) : (
            <h6 className=" m-2 text-light">There are no users in DB..</h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
