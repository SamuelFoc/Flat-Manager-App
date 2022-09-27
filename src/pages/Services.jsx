import React from "react";
import Service from "../components/ServiceCard";
import "../Custom.css";

const Services = () => {
  return (
    <div className="text-light serviceContainer container-fluid mt-5">
      <div className="row">
        <div className="col-12 pe-5 pe-md-0 col-xxl-6">
          <div>
            <h3 className="m-2 custom-pill-box">Monthly payable services</h3>
          </div>
          <div className="serviceColumn">
            <Service
              info={{ name: "Internet access", price: 600, payday: 14 }}
            />
            <Service info={{ name: "Trash", price: 400, payday: 25 }} />
            <Service info={{ name: "Trash", price: 400, payday: 25 }} />
            <Service info={{ name: "Trash", price: 400, payday: 25 }} />
            <Service info={{ name: "Trash", price: 400, payday: 25 }} />
          </div>
        </div>
        <div className="col-12 pe-5 pe-md-0 col-xxl-6">
          <div>
            <h3 className="m-2 custom-pill-box">Unit prices</h3>
          </div>
          <div className="serviceColumn">
            <Service
              info={{ name: "Electricity", price: 10.35, unit: "kWh" }}
            />
            <Service info={{ name: "Water", price: 10.35, unit: "m3" }} />
            <Service info={{ name: "Gas", price: 10.35, unit: "m3" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
