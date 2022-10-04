import BarChart from "../charts/BarChart";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const AvgExps = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState();
  const [elecAvgExps, setElecAvgExps] = useState();
  const [gasAvgExps, setGasAvgExps] = useState();
  const [watAvgExps, setWatAvgExps] = useState();
  const axiosPrivate = useAxiosPrivate();

  const createConstArray = (length, value) => {
    let array = [];
    for (let i = 0; i < length; i++) {
      array.push(value);
    }
    return array;
  };

  useEffect(() => {
    setLoading(true);
    axiosPrivate
      .get("/statistics/expenses")
      .then((res) => {
        setGasAvgExps({
          labels: res.data?.gas?.labels,
          data: res.data?.gas?.data,
        });

        setWatAvgExps({
          labels: res.data?.water?.labels,
          data: res.data?.water?.data,
        });

        setElecAvgExps({
          labels: res.data?.electricity?.labels,
          data: res.data?.electricity?.data,
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));

    axiosPrivate
      .get("/services")
      .then((res) => {
        setServices({
          electricity: res?.data?.data.filter(
            (item) => item.name.toLowerCase() === "electricity"
          ),
          water: res?.data?.data.filter(
            (item) => item.name.toLowerCase() === "water"
          ),
          gas: res?.data?.data.filter(
            (item) => item.name.toLowerCase() === "gas"
          ),
        });
      })
      .catch((err) => console.log(err));
  }, [axiosPrivate]);

  const elecConst = createConstArray(
    elecAvgExps?.data?.length,
    services?.electricity[0]?.monthly_price / 30
  );
  const watConst = createConstArray(
    watAvgExps?.data?.length,
    services?.water[0]?.monthly_price / 30
  );
  const gasConst = createConstArray(
    gasAvgExps?.data?.length,
    services?.gas[0]?.monthly_price / 30
  );

  const gasDataAvgExps = {
    labels: gasAvgExps?.labels,
    datasets: [
      {
        label: "AVG Gas expenses CZK/day",
        data: gasAvgExps?.data,
        backgroundColor: "#26D2A6",
        borderColor: "#26D2A6",
        borderWidth: 2,
      },
      {
        label: "Payed",
        data: gasConst,
        backgroundColor: "#E53232",
        borderColor: "#E53232",
        borderWidth: 2,
      },
    ],
  };
  const waterDataAvgExps = {
    labels: watAvgExps?.labels,
    datasets: [
      {
        label: "AVG Water expenses CZK/day",
        data: watAvgExps?.data,
        backgroundColor: "#2680D2",
        borderColor: "#black",
        borderWidth: 2,
      },
      {
        label: "Payed",
        data: watConst,
        backgroundColor: "#E53232",
        borderColor: "#black",
        borderWidth: 2,
      },
    ],
  };
  const elecDataAvgExps = {
    labels: elecAvgExps?.labels,
    datasets: [
      {
        label: "AVG Electricity expenses CZK/day",
        data: elecAvgExps?.data,
        backgroundColor: "#C5D226",
        borderColor: "#C5D226",
        borderWidth: 2,
      },
      {
        label: "Payed",
        data: elecConst,
        backgroundColor: "#E53232",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="my-4">
      <h3>Predictions</h3>
      {loading ? (
        <h6 className="fw-light">
          Data not available, please check if all unit prices are defined
          correctly.
        </h6>
      ) : (
        <div className="chartContainer">
          {gasAvgExps?.data?.length > 0 ? (
            <BarChart chartData={gasDataAvgExps} />
          ) : (
            ""
          )}
          {watAvgExps?.data?.length > 0 ? (
            <BarChart chartData={waterDataAvgExps} />
          ) : (
            ""
          )}
          {elecAvgExps?.data?.length > 0 ? (
            <BarChart chartData={elecDataAvgExps} />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default AvgExps;
