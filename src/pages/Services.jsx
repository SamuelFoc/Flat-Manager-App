import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Service from "../components/ServiceCard";
import "../Custom.css";

const Services = () => {
  // TODO: STATES
  const [serviceData, setServiceData] = useState();
  const [unitsData, setUnitsData] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: EFFECTS
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const services = await axiosPrivate.get("/services");
        const units = await axiosPrivate.get("admin/units");
        isMounted && setServiceData(services.data.data);
        setUnitsData(units.data.data);
      } catch (err) {
        console.log(err);
        navigate("/home", { state: { from: location }, replace: true });
      }
    };

    getData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  return (
    <div className="text-light serviceContainer container-fluid mt-5">
      <div className="row">
        <div className="col-12 pe-5 pe-md-0 col-xxl-6">
          <div>
            <h3 className="m-2 custom-pill-box">Monthly payable services</h3>
          </div>
          <div className="serviceColumn">
            {serviceData?.length > 0 ? (
              serviceData?.map((service) => <Service info={service} />)
            ) : (
              <h6>There are no services in DB..</h6>
            )}
          </div>
        </div>
        <div className="col-12 pe-5 pe-md-0 col-xxl-6">
          <div>
            <h3 className="m-2 custom-pill-box">Unit prices</h3>
          </div>
          <div className="serviceColumn">
            {unitsData?.length > 0 ? (
              unitsData?.map((service) => <Service info={service} />)
            ) : (
              <h6>There are no services in DB..</h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
