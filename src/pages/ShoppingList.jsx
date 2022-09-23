import React from "react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import HiddenForm from "../components/HiddenForm";

export default function Home() {
  const [myData, setMyData] = React.useState([]);
  const [isShowedCreate, setIsShowedCreate] = useState(false);
  const [isShowedEdit, setIsShowedEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [newProduct, setNewProduct] = useState({
    name: "",
    owner: "",
    priority: "",
    price: "",
    type: "",
  });

  const handleChange = (event) => {
    setNewProduct((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const formInfo = {
    submit: {
      url: "http://localhost:4000/products/samo.sipikal@gmail.com",
      method: "post",
      data: newProduct,
    },
    inputs: ["name", "owner", "price"],
    dates: [],
    selections: [
      { name: "priority", options: ["LOW", "HIGH", "CRITICAL"] },
      {
        name: "type",
        options: [
          "Kitchen",
          "Bathroom",
          "Bedroom",
          "Toilet",
          "Free Time",
          "Food",
        ],
      },
    ],
    submitName: "CREATE",
  };

  const formEditInfo = {
    submit: {
      url: `http://localhost:4000/products/samo.sipikal@gmail.com/${editId}`,
      method: "put",
      data: newProduct,
    },
    inputs: ["name", "owner", "price"],
    dates: [],
    selections: [
      { name: "priority", options: ["LOW", "HIGH", "CRITICAL"] },
      {
        name: "type",
        options: [
          "Kitchen",
          "Bathroom",
          "Bedroom",
          "Toilet",
          "Free Time",
          "Food",
        ],
      },
    ],
    submitName: "EDIT",
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
      <div className="mainGlass mt-3 py-5">
        {myData.map((product) => (
          <ProductCard
            key={product.id}
            info={product}
            handleEdit={showFormEdit}
          />
        ))}
      </div>
      {isShowedCreate && (
        <HiddenForm
          formInfo={formInfo}
          showForm={showFormCreate}
          handleChange={handleChange}
        />
      )}
      {isShowedEdit && (
        <HiddenForm
          formInfo={formEditInfo}
          showForm={showFormEdit}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}
