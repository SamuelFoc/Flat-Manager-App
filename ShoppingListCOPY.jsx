import React from "react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import HiddenForm from "../components/HiddenForm";
import qs from "qs";

export default function Home() {
  const [myData, setMyData] = React.useState([]);
  const [isShowedCreate, setIsShowedCreate] = useState(false);
  const [isShowedEdit, setIsShowedEdit] = useState(false);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState(false);
  const [priority, setPriority] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [editId, setEditId] = useState();

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/products/${"samo.sipikal@gmail.com"}/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  };

  let handleCreate = async (e) => {
    e.preventDefault();

    var data = qs.stringify({
      name: name,
      ownership: owner,
      urgent: priority,
      price: price,
      type: type,
    });

    var config = {
      method: "post",
      url: "http://localhost:4000/products/samo.sipikal@gmail.com",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    Axios(config)
      .then((res) => {
        showFormCreate();
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let handleEdit = async (e) => {
    e.preventDefault();

    var data = qs.stringify({
      name: name,
      ownership: owner,
      urgent: priority,
      price: price,
      type: type,
    });

    var config = {
      method: "put",
      url: `http://localhost:4000/products/samo.sipikal@gmail.com/${editId}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    Axios(config)
      .then((res) => {
        showFormEdit();
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const showFormCreate = () => {
    setIsShowedCreate(!isShowedCreate);
  };

  const showFormEdit = (id) => {
    setIsShowedEdit(!isShowedEdit);
    setEditId(id);
  };

  React.useEffect(() => {
    fetch(`http://localhost:4000/products/${"samo.sipikal@gmail.com"}`)
      .then((res) => res.json())
      .then((response) => {
        setMyData(response.data);
      });
  }, []);

  return (
    <div>
      <h3 className="color-light ms-3">
        Shopping List
        <FontAwesomeIcon
          icon={faPlus}
          className="config color-light ms-3 btn-custom"
          onClick={showFormCreate}
        />
      </h3>
      <div className="usersBox mt-3 py-5">
        {myData.map((product) => (
          <ProductCard
            key={product.id}
            info={product}
            handleDelete={handleDelete}
            handleEdit={showFormEdit}
          />
        ))}
      </div>
      {/* EDITING */}
      {isShowedEdit && (
        <div className="afterElementForm">
          <form onSubmit={handleEdit}>
            <input
              className="form-control my-2"
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Product name"
            />
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input my-2"
                onClick={(e) => setOwner(!owner)}
                name="owner"
                checked={owner}
                id="owner"
                placeholder="Owner email"
              />
              <label className="form-check-label text-light" htmlFor="owner">
                Is this product just for you?
              </label>
            </div>
            <input
              className="form-control my-2"
              onChange={(e) => setPriority(e.target.value)}
              name="urgent"
              type="text"
              placeholder="Priority"
            />
            <input
              className="form-control my-2"
              onChange={(e) => setPrice(e.target.value)}
              name="price"
              type="number"
              placeholder="Price c.c.a"
            />
            <select
              className="form-select"
              name="type"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" selected disabled>
                Select type
              </option>
              <option onChange={(e) => setType(e.target.value)} value="kitchen">
                Kitchen
              </option>
              <option
                onChange={(e) => setType(e.target.value)}
                value="bathroom"
              >
                Bathroom
              </option>
              <option
                onChange={(e) => setType(e.target.value)}
                value="freetime"
              >
                FreeTime
              </option>
              <option onChange={(e) => setType(e.target.value)} value="toilet">
                Toilet
              </option>
              <option
                onChange={(e) => setType(e.target.value)}
                value="personal"
              >
                Personal
              </option>
              <option onChange={(e) => setType(e.target.value)} value="food">
                Food
              </option>
            </select>
            <div>
              <button className="btn btn-primary m-4 px-4" type="submit">
                EDIT
              </button>
              <button
                className="btn btn-danger m-4 px-4"
                onClick={showFormEdit}
              >
                BACK
              </button>
            </div>
          </form>
        </div>
      )}
      {isShowedCreate && (
        <HiddenForm
          formInfo={formInfo}
          showForm={showFormCreate}
          handleChange={handleChange}
        />
      )}
      {/* CREATION */}
      {/* {isShowedCreate && (
        <div className="afterElementForm">
          <form onSubmit={handleCreate}>
            <input
              className="form-control my-2"
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Product name"
            />
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input my-2"
                onClick={(e) => setOwner(!owner)}
                name="owner"
                checked={owner}
                id="owner"
                placeholder="Owner email"
              />
              <label className="form-check-label text-light" for="owner">
                Is this product just for you?
              </label>
            </div>
            <input
              className="form-control my-2"
              onChange={(e) => setPriority(e.target.value)}
              name="urgent"
              type="text"
              placeholder="Priority"
            />
            <input
              className="form-control my-2"
              onChange={(e) => setPrice(e.target.value)}
              name="price"
              type="number"
              placeholder="Price c.c.a"
            />
            <select
              className="form-select"
              name="type"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" selected disabled>
                Select type
              </option>
              <option onChange={(e) => setType(e.target.value)} value="kitchen">
                Kitchen
              </option>
              <option
                onChange={(e) => setType(e.target.value)}
                value="bathroom"
              >
                Bathroom
              </option>
              <option
                onChange={(e) => setType(e.target.value)}
                value="freetime"
              >
                FreeTime
              </option>
              <option onChange={(e) => setType(e.target.value)} value="toilet">
                Toilet
              </option>
              <option
                onChange={(e) => setType(e.target.value)}
                value="personal"
              >
                Personal
              </option>
              <option onChange={(e) => setType(e.target.value)} value="food">
                Food
              </option>
            </select>
            <div>
              <button className="btn btn-success m-4 px-4" type="submit">
                CREATE
              </button>
              <button
                className="btn btn-danger m-4 px-4"
                onClick={showFormCreate}
              >
                BACK
              </button>
            </div>
          </form>
        </div>
      )} */}
    </div>
  );
}
