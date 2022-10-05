import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Summary = () => {
  const [loading, setLoading] = useState(false);
  const [gas, setGas] = useState();
  const [water, setWater] = useState();
  const [elec, setElec] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setLoading(true);
    axiosPrivate
      .get("/statistics/summary")
      .then((res) => {
        setGas(res.data?.gas_summary);
        setWater(res.data?.water_summary);
        setElec(res.data?.electricity_summary);

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [axiosPrivate]);

  return (
    <div className="my-4 chartBox">
      <h3 className="chartTitle">Summary</h3>
      {false ? (
        <h6 className="fw-light">
          Data not available, please check if all unit prices are defined
          correctly.
        </h6>
      ) : (
        <div className="row mt-4 p-3">
          <div className="col-6">
            <h6>Electricity</h6>
            <div className="ps-2">
              <strong>Date:&ensp;</strong>
              <span>
                From&ensp;{elec?.from}&ensp;to&ensp;{elec?.to}
              </span>
            </div>
            <div className="ps-2">
              <strong>Days:&ensp;</strong>
              <span>{elec?.days}</span>
            </div>
            <div className="ps-2">
              <strong>Overall cons. :&ensp;</strong>
              <span>
                {elec?.real_consumption}&ensp;{elec?.unit}
              </span>
            </div>
            <div className="ps-2">
              <strong>Paid:&ensp;</strong>
              <span>
                {elec?.predictedPrice}&ensp;{elec?.price_currency}
              </span>
            </div>
            <div className="ps-2">
              <strong>Overpayments:&ensp;</strong>
              <span>
                {elec?.overpayments}&ensp;{elec?.price_currency}
              </span>
            </div>
            <div className="ps-2">
              <strong>Arrears:&ensp;</strong>
              <span>
                {elec?.arrears}&ensp;{elec?.price_currency}
              </span>
            </div>
          </div>

          <div className="col-6">
            <h6>Electricity</h6>
            <div className="ps-2">
              <strong>Date:&ensp;</strong>
              <span>
                From&ensp;{water?.from}&ensp;to&ensp;{water?.to}
              </span>
            </div>
            <div className="ps-2">
              <strong>Days:&ensp;</strong>
              <span>{water?.days}</span>
            </div>
            <div className="ps-2">
              <strong>Overall cons. :&ensp;</strong>
              <span>
                {water?.real_consumption}&ensp;{water?.unit}
              </span>
            </div>
            <div className="ps-2">
              <strong>Paid:&ensp;</strong>
              <span>
                {water?.predictedPrice}&ensp;{water?.price_currency}
              </span>
            </div>
            <div className="ps-2">
              <strong>Overpayments:&ensp;</strong>
              <span>
                {water?.overpayments}&ensp;{water?.price_currency}
              </span>
            </div>
            <div className="ps-2">
              <strong>Arrears:&ensp;</strong>
              <span>
                {water?.arrears}&ensp;{water?.price_currency}
              </span>
            </div>
          </div>

          <div className="col-6 mt-4">
            <h6>Gas</h6>
            <div className="ps-2">
              <strong>Date:&ensp;</strong>
              <span>
                From&ensp;{gas?.from}&ensp;to&ensp;{gas?.to}
              </span>
            </div>
            <div className="ps-2">
              <strong>Days:&ensp;</strong>
              <span>{gas?.days}</span>
            </div>
            <div className="ps-2">
              <strong>Overall cons. :&ensp;</strong>
              <span>
                {gas?.real_consumption}&ensp;{gas?.unit}
              </span>
            </div>
            <div className="ps-2">
              <strong>Paid:&ensp;</strong>
              <span>
                {gas?.predictedPrice}&ensp;{gas?.price_currency}
              </span>
            </div>
            <div className="ps-2">
              <strong>Overpayments:&ensp;</strong>
              <span>
                {gas?.overpayments}&ensp;{gas?.price_currency}
              </span>
            </div>
            <div className="ps-2">
              <strong>Arrears:&ensp;</strong>
              <span>
                {gas?.arrears}&ensp;{gas?.price_currency}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
