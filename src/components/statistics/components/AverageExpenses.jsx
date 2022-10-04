import LineChart from "../charts/LineChart";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const AvgExps = () => {
  const [loading, setLoading] = useState(false);
  const [elecAvgExps, setElecAvgExps] = useState();
  const [gasAvgExps, setGasAvgExps] = useState();
  const [watAvgExps, setWatAvgExps] = useState();
  const axiosPrivate = useAxiosPrivate();

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
  }, [axiosPrivate]);

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
    ],
  };
  const waterDataAvgExps = {
    labels: watAvgExps?.labels,
    datasets: [
      {
        label: "AVG Water expenses CZK/day",
        data: watAvgExps?.data,
        backgroundColor: "#2680D2",
        borderColor: "#2680D2",
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
    ],
  };

  return (
    <div className="my-4">
      <h3>Average expenses</h3>
      {loading ? (
        <h6 className="fw-light">
          Data not available, please check if all unit prices are defined
          correctly.
        </h6>
      ) : (
        <div className="chartContainer">
          {gasAvgExps?.data?.length > 0 ? (
            <LineChart chartData={gasDataAvgExps} />
          ) : (
            ""
          )}
          {watAvgExps?.data?.length > 0 ? (
            <LineChart chartData={waterDataAvgExps} />
          ) : (
            ""
          )}
          {elecAvgExps?.data?.length > 0 ? (
            <LineChart chartData={elecDataAvgExps} />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default AvgExps;
